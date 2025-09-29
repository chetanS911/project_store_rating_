const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

const { 
  getDashboardStats, 
  createUser, 
  createStore, 
  getUsers, 
  getStores 
} = require('../controllers/adminController');

router.use(protect);
router.use(authorize('SYSTEM_ADMIN'));

router.get('/stats', getDashboardStats);

router.post('/users', createUser);
router.get('/users', getUsers);


router.post('/stores', createStore);
router.get('/stores', getStores);

module.exports = router;