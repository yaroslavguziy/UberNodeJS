const Truck = require('../models/truckModel');
const Load = require('../models/loadModel');
const { checkTruckLoad } = require('../helpers/truckInfo');

const changeState = state => {
  switch (state) {
    case 'En route to Pick Up':
      return 'Arrived to Pick Up';
    case 'Arrived to Pick Up':
      return 'En route to delivery';

    case 'En route to delivery':
      return 'Arrived to delivery';

    default:
      throw Error('Error');
  }
};
class LoadsController {
  async addLoad(req, res) {
    try {
      console.log(req.user);
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

  async getLoadById(req, res) {
    try {
      const id = req.params.id;

      const load = await Load.findOne({ _id: id });
      if (load) {
        res.status(200).json({ load });
      } else {
        res.status(400).json({ message: 'Not found' });
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  async deleteLoadById(req, res) {
    try {
      const id = req.params.id;

      await Load.findByIdAndRemove({ _id: id });

      res.status(200).json({ message: 'Load deleted successfully' });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  async updateLoadById(req, res) {
    try {
      const { id: userId } = req.user;
      const id = req.params.id;
      const newLoad = req.body;

      await Load.findOneAndUpdate({ _id: id, userId }, { type: newLoad });

      res.status(200).json({ message: 'Load  details changed successfully' });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  async getActiveLoadersByDriver(req, res) {
    try {
      console.log(req.user);
      const { id: userId } = req.user;
      const load = await Load.findOne({
        assigned_to: userId,
        status: 'ASSIGNED',
      });
      if (!load) {
        return res.status(400).send({ message: 'Active loads were not found' });
      }
      res.status(200).send({ load });
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  }

  async getShippingInfoById(req, res) {
    try {
      const { id: userId } = req.user;
      const id = req.params.id;
      const load = await Load.findOne({
        _id: id,
        created_by: userId,
      }).select('-__v');
      if (!load) {
        res.status(400).send({ message: 'Not found' });
      }

      const truck = await Truck.findOne({
        assigned_to: load.assigned_to,
      }).select('-__v');

      if (!truck) {
        res.status(400).send({ message: 'Not found' });
      }

      res.status(200).send({ load, truck });
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  }

  async updateState(req, res) {
    try {
      const { id: userId } = req.user;

      const load = await Load.findOne({
        assigned_to: userId,
        status: 'ASSIGNED',
      });

      if (!load) {
        return res.status(400).send({ message: 'Not found' });
      }

      const nowState = load.state;

      if (nowState === 'Arrived to delivery') {
        return res.status(400).send({ message: 'DELIVERY IS DONE' });
      }

      const newState = changeState(load.state);

      await Load.findOneAndUpdate(
        {
          assigned_to: userId,
        },
        { $set: { state: newState } }
      );

      if (newState === 'Arrived to delivery') {
        await Load.findOneAndUpdate(
          {
            assigned_to: userId,
          },
          { $set: { status: 'SHIPPED' } }
        );
        await Truck.findOneAndUpdate(
          {
            assigned_to: userId,
          },
          { $set: { status: 'IS' } }
        );
      }

      res.status(200).send({ message: `Load state changed to ${newState}` });
    } catch {
      res.status(400).send({ message: e.message });
    }
  }
}

module.exports = new LoadsController();
