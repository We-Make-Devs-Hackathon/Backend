const express = require("express");
const { body } = require("express-validator");
const asyncHandler = require("../util/async-handler");
const router = express.Router();

const { ValidationMessages } = require("../model/base-response");

const doctorService = require("../services/doctor-service");

// Get Doctor by hospital id
router.post(
  "/hospitalDoctors",
  [
    body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req, res) => {
    return doctorService.getDoctorByHospitalId(req.body.hospitalId);
  })
);


// Get Doctor by Doctor id
router.get(
  "/:docid",
  asyncHandler(async (req, res) => {
    return doctorService.getDoctorById(req.params.docid);
  })
);


// Add New Doctor
router.post(
  "/addDoctor",
  [
    body("firstName").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("lastName").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("email").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("password").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("gender").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("phoneNumber").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("speciality").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("address").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("dateOfBirth").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("dateOfJoining").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("profileImage").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("doctorId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req, res) => {
    return doctorService.postDoctor(req);
  })
);


// Update Doctor
router.post(
  "/updateDoctor",
  [
    body("firstName").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("lastName").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("email").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("gender").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("phoneNumber").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("speciality").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("address").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("dateOfBirth").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("dateOfJoining").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("profileImage").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("doctorId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req, res) => {
    return doctorService.updateDoctorDetails(req);
  })
);


// Delete Doctor
router.post(
  "/deleteDoctor",
  [
    body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("doctorId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req, res) => {
    return doctorService.deleteDoctor(req);
  })
);

router.post("/uploadCSV", asyncHandler(async (req, res) => {
  return doctorService.uploadCSV(req);
}));

// Change Doctor Password
router.post(
  "/change-password",
  [
    body("oldPassword").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("newPassword").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req) => {
    return doctorService.changePassword(req);
  })
);


// Test Route
router.get(
  "/test",
  asyncHandler(async (req, res) => {
    return {result:`Welcome to Doctors Route`};
  })
);

module.exports = router;
