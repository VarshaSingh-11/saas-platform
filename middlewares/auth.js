const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ status: false, error: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }

        req.user = user;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ status: false, error: 'Invalid token' });
        }

        return res.status(500).json({ status: false, error: 'Internal server error' });
    }
};