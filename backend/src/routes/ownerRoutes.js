const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getOwnerDashboard } = require('../controllers/ownerController');

router.use(protect);
router.use(authorize('STORE_OWNER'));

router.get('/dashboard', getOwnerDashboard);

module.exports = router;