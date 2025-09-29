const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { updatePassword } = require('../controllers/userController');

router.get('/profile', protect, (req, res) => {
    res.status(200).json({
        message: 'have a access a protected route',
        user: req.user
    });
});

router.get('/admin-area', protect, authorize('SYSTEM_ADMIN'), (req, res) => {
    res.status(200).json({
        message: `welcome admin you have access to secret area`,
        user: req.user
    });
});

router.put('/password', protect, updatePassword);


module.exports = router;