import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.SESSION_SECRET || 'default_secret');

export async function POST(req) {
    try {
        await dbConnect();
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create JWT
        const token = await new SignJWT({ userId: user._id, username: user.username })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(JWT_SECRET);

        const response = NextResponse.json(
            { message: 'Login successful' },
            { status: 200 }
        );

        // Set HTTP-only cookie
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
