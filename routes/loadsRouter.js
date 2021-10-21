const Router = require('express');
const router = new Router();

const LoadsController = require('../controllers/loadsController');

router.post('', LoadsController.addLoad);
// router.get('/loads/:id', getLoad);
// router.put('/loads/:id', updateLoad);
router.post('/:id/post', LoadsController.addLoadById);
router.get('', LoadsController.getLoads);
// router.delete('/loads/:id', deleteLoad);
// router.get('/loads/:id/shipping_info', getLoadShippingInfo);

module.exports = router;
