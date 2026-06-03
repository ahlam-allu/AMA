import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        maxlength: [60, 'Username cannot be more than 60 characters'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    age: {
        type: Number,
        required: [true, 'Please provide your age'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
    },
    image: {
        type: String, // Base64 string
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    favorites: {
        type: [String], // Array of location strings or IDs
        default: [],
    },
    settings: {
        theme: {
            type: String,
            default: 'system', // 'light', 'dark', 'system'
        },
        defaultLocation: {
            type: String,
            default: 'Colombo, Sri Lanka'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
