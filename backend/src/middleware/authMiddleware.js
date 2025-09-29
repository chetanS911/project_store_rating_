const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      
      token = req.headers.authorization.split(' ')[1];

      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

     
      req.user = { id: decoded.id, role: decoded.role };

     
      return next();

    } catch (error) {
      console.error('token verification failed:', error);
      
      return res.status(401).json({ message: 'not authorized' });
    }
  }

  
  if (!token) {
    return res.status(401).json({ message: 'not authorized no token provided.' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'User role not authorized to access this route' });
    }
    next();
  };
};