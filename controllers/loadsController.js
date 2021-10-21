const Truck = require('../models/truckModel');
const Load = require('../models/loadModel');

class LoadsController {
  async addLoad(req, res) {
    try {
      const { id } = req.user;
      const loadInfo = req.body;

      if (!loadInfo) {
        return res.status(400).json({ message: 'Add load body' });
      }

      const newLoad = new Load({
        ...loadInfo,
        created_by: id,
      });

      await newLoad.save();

      return res.status(200).json({ message: 'Load created successfully' });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  async getLoads(req, res) {
    try {
      const limit = parseInt(req.query.limit || '0');
      const offset = parseInt(req.query.offset || '0');

      const loads = await Load.find({ userId: req.user.userId }).select('-__v').skip(offset).limit(limit);

      return res.status(200).json({
        loads: loads,
      });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  async addLoadById(req, res) {
    try {
      const id = req.params.id;
      const load = await Load.findOne({ _id: id });
      if (!load) {
        return res.status(400).json({ message: 'No load found' });
      }

      await load.updateOne({
        $set: {
          status: 'POSTED',
        },
      });

      const trucks = await Truck.find({
        status: 'IS',
        assigned_to: { $ne: null },
      });

      const truck = trucks?.find(truck => checkTruckLoad(truck, load));

      if (!truck) {
        await load.updateOne({
          $set: {
            status: 'NEW',
          },
        });
        return res.status(400).json({ message: 'No truck found' });
      }

      await truck.updateOne({
        $set: {
          status: 'OL',
        },
      });

      const driverId = truck.assigned_to;

      await load.updateOne({
        $set: {
          status: 'ASSIGNED',
          state: 'En route to Pick Up',
          assigned_to: driverId,
        },
        $push: {
          logs: {
            message: `Load assigned to driver with id ${driverId}`,
            time: new Date(Date.now()),
          },
        },
      });

      res.status(200).json({
        message: 'Load posted successfully',
        driver_found: true,
      });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}

module.exports = new LoadsController();
