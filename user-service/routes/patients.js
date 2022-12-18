const express = require("express");
const { body } = require("express-validator");
const asyncHandler = require("../util/async-handler");
const router = express.Router();

const { ValidationMessages } = require("../model/base-response");

const patientService = require("../services/patients-service");

router.post(
  "/getPatientByHospitalId",
  [
    body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req, res) => {
    return patientService.getPatientByHospitalId(req.body.hospitalId);
  })
);

router.get(
  "/:patientid",
  asyncHandler(async (req, res) => {
    return patientService.getPatientById(req.params.patientid);
  })
);

router.post(
  "/addPatient",
  [
    body("fullName").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("guardianName").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("email").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("password").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("gender").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("age").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("phoneNumber").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("type").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("address").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("dateOfBirth").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("dateOfRegistration").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("profileImage").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("patientId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req, res) => {
    return patientService.postPatient(req);
  })
);

router.post(
  "/updatePatient",
  [
    body("fullName").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("guardianName").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("email").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("gender").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("age").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("phoneNumber").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("type").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("address").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("dateOfBirth").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("dateOfRegistration").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("profileImage").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("patientId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req, res) => {
    return patientService.updatePatientDetails(req);
  })
);

router.post(
  "/deletePatient",
  [
    body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("patientId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req, res) => {
    return patientService.deletePatient(req);
  })
);

router.post(
  "/change-password",
  [
    body("oldPassword").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("newPassword").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req) => {
    return patientService.changePassword(req);
  })
);

router.get(
  "/test",
  asyncHandler(async (req, res) => {
    return "Welcome to Patients Route";
  })
);

module.exports = router;
