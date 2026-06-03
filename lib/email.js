import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // You might want to make this configurable or use a general SMTP setup
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const sendVerificationEmail = async (email, token) => {
    // Determine base URL based on environment or hardcode for now
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const verifyUrl = `${baseUrl}/api/auth/verify?token=${token}`;

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: 'Verify your AMA Weather Account',
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Welcome to AMA Weather!</h2>
                <p>Please confirm your email address to verify your account.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verifyUrl}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
                </div>
                <p>Or click this link: <a href="${verifyUrl}">${verifyUrl}</a></p>
                <p>This link will expire in 24 hours.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to', email);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
