const User = require('../models/userModel');
const Truck = require('../models/truckModel');
const Load = require('../models/loadModel');
const { loadValidation } = require('../validation/load');

const truckDimensions = [
  { type: 'SPRINTER', dimensions: { length: 300, width: 250, height: 170 }, payload: 1700 },
  { type: 'SMALL STRAIGHT', dimensions: { length: 500, width: 250, height: 170 }, payload: 2500 },
  { type: 'LARGE STRAIGHT', dimensions: { length: 700, width: 350, height: 200 }, payload: 4000 },
];

class loadsController {
  async addLoad(req, res) {
    try {
      const { error } = loadValidation(req.body);
      const { name, payload, pickup_address, delivery_address, dimensions } = req.body;
      if (error) {
        return res.status(400).json({ message: 'Invalid input data' });
      } else {
        const load = new Load({
          created_by: req.user.id,
          name: name,
          payload: payload,
          pickup_address: pickup_address,
          delivery_address: delivery_address,
          dimensions: dimensions,
        });
        await load.save();
        res.status(200).json({ message: 'Load created successfully' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getLoads(req, res) {
    res.status(200).json({
      data: [1, 2, 3],
    });
  }
}

module.exports = new loadsController();
