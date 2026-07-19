import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        // Default name placeholder for new registrations
        default: "Active Cloud Node"
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        // sparse: true allows null/undefined values to bypass the unique constraint
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        // Password is optional to support Google OAuth login flows
    },
    mobile: {
        type: String,
        trim: true,
        unique: true,
        sparse: true // Keep index sparse to support optional mobile attributes
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
