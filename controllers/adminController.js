const Assignment = require('../models/Assignment');

// View all assignments tagged to the admin
exports.viewAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ adminId: req.user.id });
        res.status(200).json(assignments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Accept an assignment
exports.acceptAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        console.log(assignment);
        // Ensure the assignment is tagged to the admin
        if (!assignment || assignment.adminId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied or assignment not found.' });
        }

        assignment.status = 'accepted';
        await assignment.save();
        res.status(200).json({ message: 'Assignment accepted successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Reject an assignment
exports.rejectAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);

        // Ensure the assignment is tagged to the admin
        if (!assignment || assignment.adminId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied or assignment not found.' });
        }

        assignment.status = 'rejected';
        await assignment.save();
        res.status(200).json({ message: 'Assignment rejected successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
