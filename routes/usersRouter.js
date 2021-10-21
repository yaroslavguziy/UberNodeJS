const Router = require('express');
const router = new Router();
const UsersController = require('../controllers/UsersController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/me', authMiddleware, UsersController.getProfileInfo);
router.delete('/me', authMiddleware, UsersController.deleteProfile);
router.patch('/me/password', authMiddleware, UsersController.changePassword);

module.exports = router;
