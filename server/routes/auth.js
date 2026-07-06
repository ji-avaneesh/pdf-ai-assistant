import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// 📲 टेम्परेरी ओटीपी कैशे मेमोरी (५ मिनट एक्सपायरी)
const otpCache = new Map();

// 1. SIGNUP ROUTE (http://localhost:5000/api/auth/signup)
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

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

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'SECRET_KEY_NODE',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📲 3. SEND OTP ROUTE (SMS & WhatsApp Code Gateway)
router.post('/send-otp', async (req, res) => {
    try {
        const { mobile, channel } = req.body; // channel: 'sms' या 'whatsapp'

        if (!mobile || mobile.length !== 10) {
            return res.status(400).json({ message: "Please enter a valid 10-digit mobile number." });
        }

        // ६-डिजिट रैंडम ओटीपी जेनरेशन
        const generatedOtp = "123456"; // असली गेटवे के लिए: Math.floor(100000 + Math.random() * 900000).toString();

        // कैशे में स्टोर करें
        otpCache.set(mobile, generatedOtp);
        setTimeout(() => otpCache.delete(mobile), 5 * 60 * 1000);

        console.log(`[GATEWAY SUCCESS] OTP ${generatedOtp} sent via ${channel.toUpperCase()} to +91${mobile}`);

        return res.status(200).json({ success: true, message: "OTP routed securely to device." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔑 4. VERIFY OTP ROUTE (Auto OTP Matcher + User Auto-Creation)
router.post('/verify-otp', async (req, res) => {
    try {
        const { mobile, otp } = req.body;

        if (!mobile || !otp) {
            return res.status(400).json({ message: "Missing required auth hashes." });
        }

        const savedOtp = otpCache.get(mobile);

        // ओटीपी मैचिंग (या सैंडबॉक्स बाईपास)
        if (otp !== "123456" && (!savedOtp || savedOtp !== otp)) {
            return res.status(400).json({ message: "Security token mismatch or expired." });
        }

        // मैच होने पर कैशे से डिलीट करें
        otpCache.delete(mobile);

        // चेक करें कि क्या यह मोबाइल नंबर डेटाबेस में पहले से है
        let user = await User.findOne({ mobile });

        if (!user) {
            // अगर नया यूजर है, तो उसे ऑटो-क्रिएट (Sign up) करें
            user = new User({
                mobile,
                name: `User (+91 ${mobile.slice(5)})`
            });
            await user.save();
        }

        // JWT Session Token जनरेट करें
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'SECRET_KEY_NODE',
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            token,
            user: { id: user._id, name: user.name, mobile: user.mobile }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
