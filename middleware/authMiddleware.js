const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(400).json({ message: 'User not authorized' });
    }

    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;

    next();
  } catch (e) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = authMiddleware;
