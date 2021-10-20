const Router = require('express');
const router = new Router();

const driverMiddleware = require('../middleware/driverMiddleware');
const trucksController = require('../controllers/trucksController');

router.get('', trucksController.getUsersTrucks);
router.post('', trucksController.addTruck);
router.get('/:id', trucksController.getUsersTruckById);
router.put('/:id', trucksController.updateUsersTruckById);
router.delete('/:id', trucksController.deleteUsersTruckById);
router.post('/:id/assign', trucksController.assignTruck);

module.exports = router;
