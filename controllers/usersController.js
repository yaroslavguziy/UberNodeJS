const User = require('../models/userModel');
const bcrypt = require('bcrypt');

class UsersController {
  async getProfileInfo(req, res) {
    try {
      const user = await User.findOne({
        email: req.user.email,
      });

      if (!user) {
        res.status(400).json({ message: 'No user' });
        return;
      }

      res.status(200).json({
        user: {
          _id: user._id,
          role: user.role,
          email: user.email,
          createdDate: user.createdAt,
        },
      });
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  async deleteProfile(req, res) {
    try {
      User.findOneAndRemove({ _id: req.user.id }, err => {
        if (err) {
          res.status(400).json({ message: 'Can not delete' });
          return;
        }

        res.status(200).json({ message: 'Profile deleted successfully' });
      });
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  async changePassword(req, res) {
    try {
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      const user = await User.findOne({
        email: req.user.email,
      });

      if (!user) {
        res.status(400).json({ message: 'User not found' });
        return;
      }

      const passwordEqual = await bcrypt.compare(oldPassword, user.password);

      if (!passwordEqual) {
        res.status(400).json({ message: 'Incorrect password' });
        return;
      }

      user.password = await bcrypt.hash(newPassword, 7);
      await user.save();
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Password changed successfully' });
  }
}

module.exports = new UsersController();
