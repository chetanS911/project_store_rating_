const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAllStores, rateStore } = require('../controllers/storeController');

router.use(protect);

router.get('/', getAllStores);
router.post('/:id/rate', rateStore);

module.exports = router;