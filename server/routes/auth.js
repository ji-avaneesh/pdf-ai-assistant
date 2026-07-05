import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// 1. SIGNUP ROUTE (http://localhost:5000/api/auth/signup)
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // चेक करें कि यूजर पहले से तो नहीं है
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email!" });
        }

        // पासवर्ड को एन्क्रिप्ट (Hash) करें
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // नया यूजर डेटाबेस में सेव करें
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully! Now you can login." });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. LOGIN ROUTE (http://localhost:5000/api/auth/login)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // यूजर को ईमेल से ढूंढें
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        // पासवर्ड मैच करके देखें
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        // JWT Token जनरेट करें ताकि फ्रंटेंड यूजर को पहचान सके
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' } // 7 दिन तक लॉगिन रहेगा
        );

        // 🛠️ FIXED: 'res.stadtus' की स्पेलिंग को सही करके 'res.status' कर दिया है
        res.status(200).json({
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
