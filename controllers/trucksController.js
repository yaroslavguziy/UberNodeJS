const Truck = require('../models/truckModel');
const Mongoose = require('mongoose');
const ObjectId = Mongoose.Types.ObjectId;
const truckTypes = ['SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT'];

class TrucksController {
  async getUsersTrucks(req, res) {
    try {
      if (!req.user.id) {
        return res.status(400).json({ message: 'Invalid id' });
      }

      const trucksInfo = await Truck.find({ created_by: req.user.id });
      const trucks = trucksInfo.map(truck => ({
        _id: truck._id,
        created_by: req.user.id,
        assigned_to: truck.assigned_to,
        type: truck.type,
        status: truck.status,
        created_date: truck.createdAt,
      }));

      res.status(200).json({ trucks: trucks });
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async addTruck(req, res) {
    try {
      const { type } = req.body;

      if (!truckTypes.includes(type)) {
        return res.status(400).json({ message: 'Invalid truck type' });
      }

      const truck = new Truck({
        created_by: new ObjectId(req.user.id),
        type: type,
        createdDate: new Date().toISOString(),
      });

      await truck.save();
      res.status(200).json({ message: 'Truck created successfully' });
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUsersTruckById(req, res) {
    try {
      if (!req.user.id) {
        return res.status(400).json({ message: 'Invalid id' });
      }

      const truck = await Truck.findOne({ created_by: req.user.id, _id: req.params.id });
      res.status(200).json({
        truck: {
          _id: truck._id,
          created_by: req.user.id,
          assigned_to: truck.assigned_to,
          type: truck.type,
          status: truck.status,
          created_date: truck.createdAt,
        },
      });
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateUsersTruckById(req, res) {
    try {
      const id = req.params.id;
      let type;

      if (!id) {
        res.status(400).json({ message: 'Invalid id' });
      }

      if (truckTypes.includes(req.body.type)) {
        type = req.body.type;
      } else {
        res.status(400).json({ message: 'Invalid truck type' });
      }

      const truck = await Truck.findOne({ _id: id });

      if (!truck) {
        res.status(400).json({ message: 'Invalid id' });
      }

      console.log('truck.type', typeof truck.type);
      truck.type = type;
      await truck.save();
      res.status(200).json({ message: 'Truck details changed successfully' });
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteUsersTruckById(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        res.status(400).json({ message: 'Invalid id' });
      }

      const truck = await Truck.deleteOne({ _id: id });

      if (truck.deletedCount === 0) {
        res.status(400).json({ message: 'No truck with such id' });
      }

      res.status(200).json({ message: 'Truck deleted successfully' });
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  async assignTruck(req, res) {
    try {
      const id = req.params.id;
      const userId = req.user.id;

      if (!id || !userId) {
        res.status(400).json({ message: 'Invalid id' });
      }

      const isAssignedTruck = await Truck.findOne({ assigned_to: userId });

      if (isAssignedTruck) {
        res.status(400).json({ message: 'This driver has assigner truck' });
      }

      const truck = await Truck.findOne({ _id: id });
      truck.assigned_to = new ObjectId(userId);
      await truck.save();
      res.status(200).json({ message: 'Truck assigned successfully' });
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new TrucksController();
