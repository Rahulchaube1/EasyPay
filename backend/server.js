const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://localhost:27017/easype_local_cloud';

// Middleware
app.use(express.json({ limit: '50mb' })); // Support large payloads for "Cloud" usage
app.use(cors());

// Database Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Ultra-Powerful Local Cloud Backend Connected'))
    .catch(err => console.error('❌ Cloud Connection Error:', err));

// Routes

// Signup
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists in Cloud' });
        }

        const newUser = new User({ name, email, phone, password });
        await newUser.save();

        res.status(201).json({
            message: 'Secure Cloud Account Created',
            user: newUser,
            storage: '40GB Allocated'
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Cloud Error' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const user = await User.findOne({
            $or: [{ email: identifier }, { phone: identifier }]
        });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        res.json({
            message: 'Login Successful',
            user,
            cloudStatus: 'Active',
            storageUsed: user.cloudStorageUsed
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Cloud Error' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Strong Real-Time Backend running on port ${PORT}`);
});
