const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const secret = process.env.SECRET;

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error' });
      }

      const { email, password, role } = req.body;
      const newUser = await User.findOne({ email });

      if (newUser) {
        return res.status(400).json({ message: 'User with this name has already registered' });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({ email, password: hashPassword, role });

      await user.save();
      return res.status(200).json({ message: 'Profile created successfully' });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: `User ${email} not found` });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ id: user._id, email: user.email }, secret);
      return res.status(200).json({ jwt_token: token });
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new authController();
