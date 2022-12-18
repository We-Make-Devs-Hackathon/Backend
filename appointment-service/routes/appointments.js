const express = require("express");
const { body } = require("express-validator");
const asyncHandler = require("../util/async-handler");
const router = express.Router();

const { ValidationMessages } = require("../model/base-response");

const appointmentService = require("../services/appointment-service");

// Get Appointment by DoctorId
router.post(
  "/DoctorAppointments",
  [
    body("doctorId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req, res) => {
    return appointmentService.getAppointmentByDoctorId(req.body);
  })
);

//get appointment by patientId
router.post(
    "/PatientAppointments",
    [
        body("patientId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
        body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    ],
    asyncHandler(async (req, res) => {
        return appointmentService.getAppointmentByPatientId(req.body);
    }
));

//create appointment
router.post(
    "/createAppointment",
    [
        body("patientId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
        body("doctorId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
        body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
        body("appointmentDate").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
        body("appointmentTime").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
        body("appointmentType").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    ],
    asyncHandler(async (req, res) => {
        return appointmentService.createAppointment(req.body);
    }
));

module.exports = router;