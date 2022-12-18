const mongoose = require('mongoose');

const ActuatorSchema = mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('hospital_iam_actuator', ActuatorSchema);
