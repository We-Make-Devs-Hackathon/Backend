const express = require("express");
const { body } = require("express-validator");
const asyncHandler = require("../util/async-handler");
const router = express.Router();

const { ValidationMessages } = require("../model/base-response");

const staffService = require("../services/staff-service");

router.post(
  "/getStaffByHospitalId",
  [
    body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req, res) => {
    return staffService.getStaffByHospitalId(req.body.hospitalId);
  })
);

router.get(
  "/:staffid",
  asyncHandler(async (req, res) => {
    return staffService.getStaffById(req.params.staffid);
  })
);

router.post(
  "/addStaff",
  [
    body("firstName").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("lastName").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("email").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("password").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("gender").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("phoneNumber").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("designation").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("address").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("dateOfBirth").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("dateOfJoining").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("profileImage").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("staffId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req, res) => {
    return staffService.postStaff(req);
  })
);

router.post(
  "/updateStaff",
  [
    body("firstName").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("lastName").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("email").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("gender").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("phoneNumber").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("designation").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("address").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("dateOfBirth").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("dateOfJoining").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("profileImage").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("staffId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req, res) => {
    return staffService.updateStaffDetails(req);
  })
);

router.post(
  "/deleteStaff",
  [
    body("hospitalId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("staffId").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req, res) => {
    return staffService.deleteStaff(req);
  })
);

router.post(
  "/change-password",
  [
    body("oldPassword").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("newPassword").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req) => {
    return staffService.changePassword(req);
  })
);

router.get(
  "/test",
  asyncHandler(async (req, res) => {
    return "Welcome to Staff Route";
  })
);

module.exports = router;