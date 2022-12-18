const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    patientId: {
        type: String,
    },
    doctorId: {
        type: String,
    },
    hospitalid: {
        type: String,
    },
    appointmentId: {
        type: String,
    },
    doctorName: {
        type: String,
    },
    patientName: {
        type: String,
    },
    hospitalName: {
        type: String,
    },
    appointmentDate: {
        type: String,
    },
    appointmentTime: {
        type: String,
    },
    appointmentStatus: {
        type: String,
    },
    appointmentType: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('hospital_appointment', AppointmentSchema);