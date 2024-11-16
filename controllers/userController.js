const Assignment = require('../models/Assignment');

exports.uploadAssignment = async (req, res) => {
    const { task, adminId } = req.body;
    try {
        const assignment = new Assignment({
            userId: req.user.id,
            task,
            adminId,
        });
        await assignment.save();
        res.status(201).json({ message: 'Assignment uploaded successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
