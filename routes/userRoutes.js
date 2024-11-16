const express = require('express');
const { uploadAssignment } = require('../controllers/userController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/upload', verifyToken, verifyRole('User'), uploadAssignment);

module.exports = router;
