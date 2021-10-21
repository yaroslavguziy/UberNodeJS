const Router = require('express');
const router = new Router();

const LoadsController = require('../controllers/loadsController');
const authMiddleware = require('../middleware/authMiddleware');
const driverMiddleware = require('../middleware/driverMiddleware');
const loadMiddleware = require('../middleware/loadMiddleware');

router.post('', [authMiddleware, loadMiddleware], LoadsController.addLoad);
router.post('/:id/post', [authMiddleware, loadMiddleware], LoadsController.addLoadById);
router.get('/:id', [authMiddleware, loadMiddleware], LoadsController.getLoadById);
router.get('', [authMiddleware, loadMiddleware], LoadsController.getLoads);
router.put('/:id', [authMiddleware, loadMiddleware], LoadsController.updateLoadById);
router.delete('/:id', [authMiddleware, loadMiddleware], LoadsController.deleteLoadById);
router.get('/active', [authMiddleware, driverMiddleware], LoadsController.getActiveLoadersByDriver);
router.get('/:id/shipping_info', [authMiddleware, loadMiddleware], LoadsController.getShippingInfoById);
router.patch('/active/state', [authMiddleware, driverMiddleware], LoadsController.updateState);

module.exports = router;
