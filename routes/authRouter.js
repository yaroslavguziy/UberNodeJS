const Router = require('express');
const router = new Router();
const AuthController = require('../controllers/authController');

router.post('/register', AuthController.registration);
router.post('/login', AuthController.login);
router.post('/forgot_password', AuthController.forgotPassword);

module.exports = router;
