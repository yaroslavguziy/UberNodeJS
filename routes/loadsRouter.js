const Router = require('express');
const router = new Router();

const loadMiddleware = require('../middleware/loadMiddleware');
const loadsController = require('../controllers/loadsController');

router.post('', loadsController.addLoad);
// router.get('/loads/:id', getLoad);
// router.put('/loads/:id', updateLoad);
// router.post('/loads/:id/post', postLoad);
router.get('', loadsController.getLoads);
// router.delete('/loads/:id', deleteLoad);
// router.get('/loads/:id/shipping_info', getLoadShippingInfo);

module.exports = router;
