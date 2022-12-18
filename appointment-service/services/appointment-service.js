const Appointments = require("../model/appointment");
const { ErrorCodes } = require("../model/base-response");
const constants = require("../util/constants");
const passwordUtil = require("../util/password-util");
const sender = require("../queue/sender");
const logger = require("../util/logger");

async function createAppointment(appointment) {
    try {
        appointment.appointmentId = body.patientId + body.doctorId + body.hospitalId + body.appointmentDate + body.appointmentTime;
        const newAppointment = new Appointments(req.body);
        await newAppointment.save();
        res.status(201).send(newAppointment);
    } catch (error) {
        logger.error(error);
        res.status(400).send
            ({
                code: ErrorCodes.INVALID_CREDENTIALS,
                message: error.message
            });
    }
}

async function getAppointmentByDoctorId(appointment) {
    try {
        const appointments = await Appointments.find({ doctorId: appointment.doctorId, hospitalId: appointment.hospitalId });
        res.status(201).send(appointments);
    } catch (error) {
        logger.error(error);
        res.status(400).send
            ({
                code: ErrorCodes.INVALID_CREDENTIALS,
                message: error.message
            });
    }
}

async function getAppointmentByPatientId(appointment) {
    try {
        const appointments = await Appointments.find({ patientId: appointment.patientId, hospitalId: appointment.hospitalId });
        res.status(201).send(appointments);
    } catch (error) {
        logger.error(error);
        res.status(400).send
            ({
                code: ErrorCodes.INVALID_CREDENTIALS,
                message: error.message
            });
    }
}

module.exports = {
    createAppointment,
    getAppointmentByDoctorId,
    getAppointmentByPatientId
};