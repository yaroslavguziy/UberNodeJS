const Router = require('express');
const router = new Router();

const TrucksController = require('../controllers/trucksController');

router.get('', TrucksController.getUsersTrucks);
router.post('', TrucksController.addTruck);
router.get('/:id', TrucksController.getUsersTruckById);
router.put('/:id', TrucksController.updateUsersTruckById);
router.delete('/:id', TrucksController.deleteUsersTruckById);
router.post('/:id/assign', TrucksController.assignTruck);

module.exports = router;
