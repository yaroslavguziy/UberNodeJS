const User = require('../models/userModel');

const loadMiddleware = async (req, res, next) => {
  const user = await User.findById({ _id: req.user.id });

  if (!user) {
    return res.status(400).json({ message: 'Incorrect user' });
  }
  console.log(user.role);
  if (user.role !== 'SHIPPER') {
    return res.status(400).json({ message: 'You are not a shipper' });
  }

  next();
};

module.exports = loadMiddleware;
