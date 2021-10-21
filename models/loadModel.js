const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loadSchema = new Schema(
  {
    created_by: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    status: {
      type: String,
      enum: ['NEW', 'POSTED', 'ASSIGNED', 'SHIPPED'],
      default: 'NEW',
      required: true,
    },
    state: {
      type: String,
      enum: ['En route to Pick Up', 'Arrived to Pick Up', 'En route to delivery', 'Arrived to delivery'],
      default: 'En route to Pick Up',
    },
    name: {
      type: String,
      required: true,
    },
    payload: {
      type: Number,
      required: true,
    },
    pickup_address: {
      type: String,
      required: true,
    },
    delivery_address: {
      type: String,
      required: true,
    },
    dimensions: {
      width: {
        type: Number,
        required: true,
      },
      length: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
    },
    logs: {
      type: Array,
      message: String,
      time: Date,
      default: {
        message: 'Load assigned to driver',
        time: new Date(Date.now()),
      },
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    versionKey: false,
  }
);

const Load = mongoose.model('Load', loadSchema);
module.exports = Load;
