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
      default: 'NEW',
    },
    state: {
      type: String,
      default: '',
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
    logs: [
      {
        message: {
          type: String,
          default: '',
        },
        time: {
          type: Date,
          default: '',
        },
        _id: false,
      },
    ],
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
