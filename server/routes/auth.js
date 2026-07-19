import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

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


// 🌐 5. GOOGLE OAUTH 2.0 VERIFICATION GATEWAY
router.post('/google', async (req, res) => {
    try {
        const { token, mockEmail, mockName } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Verification token is required!" });
        }

        let email = "";
        let name = "";

        // Sandbox check
        if (token === "sandbox-token-bypass") {
            email = mockEmail || "sandbox@pdfaiassistant.com";
            name = mockName || "SANDBOX_USER";
            console.log(`[GOOGLE BYPASS] Authenticated mock user: ${email}`);
        } else {
            // Verify token against Google's tokeninfo API
            const tokenInfoUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
            const response = await fetch(tokenInfoUrl);
            const payload = await response.json();

            if (payload.error_description) {
                console.error("🚨 Google Token Validation Error:", payload.error_description);
                return res.status(400).json({ message: `Google Sign-in failed: ${payload.error_description}` });
            }

            email = payload.email;
            name = payload.name;
            console.log(`[GOOGLE SUCCESS] Verified identity: ${email}`);
        }

        if (!email) {
            return res.status(400).json({ message: "Unable to retrieve email from Google." });
        }

        // Find or create user
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                email,
                name: name || email.split('@')[0]
            });
            await user.save();
        }

        // Issue JWT token
        const sessionToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'SECRET_KEY_NODE',
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            token: sessionToken,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        console.error("🚨 Google Authentication Router Error:", error);
        res.status(500).json({ error: "Failed to process Google sign-in." });
    }
});

export default router;
