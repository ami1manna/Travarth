import express from 'express';
import crypto from 'crypto';
import User from '../models/UserModel.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { email, username, password , role} = req.body;
    console.log('[DEBUG] Register attempt:', { email, username, passwordLength: password?.length });
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('[DEBUG] Registration failed: User already exists with email:', email);
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Store password as plain text (no hashing)
        const user = new User({ email, username, password });
        const token = crypto.randomBytes(32).toString('hex');
        user.tokens.push(token);
        await user.save();
        
        console.log('[DEBUG] User registered successfully:', { userId: user._id, email, username });
        res.status(201).json({ message: 'User registered', token });
    } catch (err) {
        console.error('[DEBUG] Registration error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Login and generate PAT
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('[DEBUG] Login attempt:', { email, passwordReceived: !!password });
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('[DEBUG] Login failed: No user found with email:', email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        console.log('[DEBUG] User found:', { 
            userId: user._id, 
            email: user.email,
            storedPassword: user.password,
            passwordMatch: password === user.password
        });
        
        // Direct password comparison (plain text)
        const isMatch = password === user.password;
        
        if (!isMatch) {
            console.log('[DEBUG] Login failed: Password mismatch for user:', user.email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const token = crypto.randomBytes(32).toString('hex');
        console.log('[DEBUG] Generated token:', token.substring(0, 10) + '...');
        user.tokens.push(token);
        await user.save();
        
        console.log('[DEBUG] Login successful for user:', user.email);
        res.json({ token });
    } catch (err) {
        console.error('[DEBUG] Login error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Protected route
router.get('/profile', authenticate, async (req, res) => {
    console.log('[DEBUG] Profile accessed by user:', req.user.email);
    res.json({ message: `Hello ${req.user.username}`, user: req.user });
});

// Logout (revoke token)
router.post('/logout', authenticate, async (req, res) => {
    console.log('[DEBUG] Logout attempt for user:', req.user.email);
    try {
        const tokensBefore = req.user.tokens.length;
        req.user.tokens = req.user.tokens.filter(t => t !== req.token);
        const tokensAfter = req.user.tokens.length;
        
        await req.user.save();
        console.log('[DEBUG] Logout successful. Tokens removed:', tokensBefore - tokensAfter);
        res.json({ message: 'Logged out' });
    } catch (err) {
        console.error('[DEBUG] Logout error:', err);
        res.status(500).json({ error: err.message });
    }
});

export default router;