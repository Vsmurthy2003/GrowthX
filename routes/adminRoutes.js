const express = require('express');
const {
    viewAssignments,
    acceptAssignment,
    rejectAssignment
} = require('../controllers/adminController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/assignments', verifyToken, verifyRole('Admin'), viewAssignments);

router.post('/assignments/:id/accept', verifyToken, verifyRole('Admin'), acceptAssignment);

router.post('/assignments/:id/reject', verifyToken, verifyRole('Admin'), rejectAssignment);

module.exports = router;
