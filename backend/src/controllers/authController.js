const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const {name, email, password, address} = req.body;
    try{
        if(!name || !email || !password|| !address ){
            return res.status(400).json({message: 'All fields are required'});
        }
        const existingUser = await User.findOne({where: {email: email} });
        if(existingUser) {
            return res.status(409).json({message: 'Email is already in use'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role: 'NORMAL_USER'
        });
        res.status(201).json({
            message: 'User created successfully!',
            user:{
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.log('Signup Error:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  console.log('\n--- LOGIN ATTEMPT ---');
  console.log(`Attempting login for email: ${email}`);

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ where: { email: email } });
    
    if (!user) {
      console.log('DEBUG: User not found in database.');
      console.log('--- LOGIN FAILED ---\n');
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
    console.log(`DEBUG: User found. ID: ${user.id}, Role: ${user.role}`);
    console.log('DEBUG: Stored password hash:', user.password);
    console.log('DEBUG: Comparing passwords...');

    const isMatch = await bcrypt.compare(password, user.password);
    
    console.log(`DEBUG: Password comparison result (isMatch): ${isMatch}`);

    if (!isMatch) {
      console.log('DEBUG: Passwords do not match.');
      console.log('--- LOGIN FAILED ---\n');
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    console.log('DEBUG: Passwords match! Generating token...');
    console.log('--- LOGIN SUCCESS ---\n');
    
    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Logged in successfully!',
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};