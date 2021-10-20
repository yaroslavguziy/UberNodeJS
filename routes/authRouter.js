const Router = require('express');
const router = new Router();
const authController = require('../controllers/AuthController');
const { check } = require('express-validator');
// const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/auth/register',
  [
    check('email', 'Username can not be empty').notEmpty(),
    check('password', 'Password must be greater than 4 and led than 10 symbols').isLength({ min: 4, max: 10 }),
  ],
  authController.registration
);
router.post('/auth/login', authController.login);

module.exports = router;
