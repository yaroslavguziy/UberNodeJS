const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const truckSchema = new Schema({
    created_by: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    assigned_to: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "IS",
        required: true
    }
}, {timestamps: {
        createdAt: true,
        updatedAt: false,
    },
    versionKey: false})

const Truck = mongoose.model('Truck', truckSchema);
module.exports = Truck
