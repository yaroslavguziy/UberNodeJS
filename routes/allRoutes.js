const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const driverMiddleware = require('../middleware/driverMiddleware');
const loadMiddleware = require('../middleware/loadMiddleware');
const authRouter = require('./authRouter');
const usersRouter = require('./usersRouter');
const trucksRouter = require('./trucksRouter');
const loadsRouter = require('./loadsRouter');

const router = new express.Router();

router.use('/api', authRouter);
router.use('/api/users', authMiddleware, usersRouter);
router.use('/api/trucks', [authMiddleware, driverMiddleware], trucksRouter);
router.use('/api/loads', [authMiddleware, loadMiddleware], loadsRouter);

module.exports = router;
