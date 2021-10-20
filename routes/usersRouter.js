const Router = require('express');
const router = new Router();
const usersController = require('../controllers/usersController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/me', authMiddleware, usersController.getProfileInfo);
router.delete('/me', authMiddleware, usersController.deleteProfile);
router.patch('/me/password', authMiddleware, usersController.changePassword);

module.exports = router;
