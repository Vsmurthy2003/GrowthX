const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword, "  register Hashed Passwords");
        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Save user to database
        await user.save();

        // Create JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return success response with token
        res.status(201).json({ message: 'User registered successfully.', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials.');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
