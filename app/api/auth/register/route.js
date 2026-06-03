import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(req) {
    try {
        await dbConnect();
        const { username, password, email, age, phone, image } = await req.json();

        if (!username || !password || !email || !age || !phone) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Username or specific email already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification token
        const verifyToken = crypto.randomUUID();
        const verifyTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        const user = await User.create({
            username,
            password: hashedPassword,
            email,
            age,
            phone,
            image,
            verifyToken,
            verifyTokenExpiry
        });

        // Send verification email
        await sendVerificationEmail(email, verifyToken);

        return NextResponse.json(
            { message: 'Registration successful. Please check your email to verify your account.', userId: user._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
