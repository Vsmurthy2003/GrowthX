const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

exports.verifyRole = (role) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);
            if (user.role !== role) {
                return res.status(403).json({ message: `Access denied. Requires ${role} role.` });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: 'Error checking role.' });
        }
    };
};
