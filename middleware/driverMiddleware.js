const User = require('../models/userModel');

const driverMiddleware = async (req, res, next) => {
  const user = await User.findById({ _id: req.user.id });
  if (!user) {
    return res.status(400).json({ message: 'Incorrect user' });
  }
  if (user.role !== 'DRIVER') {
    return res.status(400).json({ message: 'You are not a driver' });
  }
  next();
};

module.exports = driverMiddleware;
