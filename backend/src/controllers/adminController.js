const { User, Store, Rating } = require('../models');
const bcrypt = require('bcryptjs');

exports.getDashboardStats = async (req, res) => {
  try {
    
    const [userCount, storeCount, ratingCount] = await Promise.all([
      User.count(),
      Store.count(),
      Rating.count()
    ]);

    res.status(200).json({
      users: userCount,
      stores: storeCount,
      ratings: ratingCount,
    });
  } catch (error) {
    console.error('Get Stats Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  try {
    
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(409).json({ message: 'User already exit with this mail' });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: role || 'NORMAL_USER', 
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error('Create User Error:', error);
    
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(e => e.message);
      return res.status(400).json({ message: messages });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.createStore = async (req, res) => {
    const { name, email, address, ownerId } = req.body;
  
    try {
      
      const storeExists = await Store.findOne({ where: { email } });
      if (storeExists) {
        return res.status(409).json({ message: 'Store with this email already exists' });
      }
  
      
      if (ownerId) {
        const owner = await User.findOne({ where: { id: ownerId } });
        if (!owner || owner.role !== 'STORE_OWNER') {
          return res.status(400).json({ message: 'Invalid owner ID or user is not a Store Owner' });
        }
      }
      
      const store = await Store.create({ name, email, address, ownerId });
      res.status(201).json(store);
  
    } catch (error) {
      console.error('create store Error:', error);
      res.status(500).json({ message: 'internal server error' });
    }
  };
  

  exports.getUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'address', 'role'] 
      });
      res.status(200).json(users);
    } catch (error) {
      console.error('get users error:', error);
      res.status(500).json({ message: 'internal server error' });
    }
  };
  
  
  exports.getStores = async (req, res) => {
    try {
      const stores = await Store.findAll();
      res.status(200).json(stores);
    } catch (error) {
      console.error('get Stores Error:', error);
      res.status(500).json({ message: 'internal server error' });
    }
  };