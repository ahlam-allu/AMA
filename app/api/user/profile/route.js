import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const getUserIdFromToken = async (req) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload.id;
    } catch (error) {
        return null;
    }
};

export async function GET(req) {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken(req);

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await User.findById(userId).select('-password -verifyToken -verifyTokenExpiry');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Profile fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken(req);

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { age, phone, image } = await req.json();

        // Basic validation
        if (!age || !phone) {
            return NextResponse.json({ error: 'Age and phone are required' }, { status: 400 });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { age, phone, image },
            { new: true, runValidators: true }
        ).select('-password -verifyToken -verifyTokenExpiry');

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.error('Profile update error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
