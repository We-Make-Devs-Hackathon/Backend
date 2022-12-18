const express = require("express");
const { body } = require("express-validator");
const asyncHandler = require("../util/async-handler");
const router = express.Router();

const { ValidationMessages } = require("../model/base-response");

const adminService = require("../services/hospital-service");

router.post("/searchedHospitals", asyncHandler(async (req) => {
  return adminService.getSearchedHospitals(req);
}));


router.post(
  "/change-password",
  [
    body("oldPassword").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("newPassword").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req) => {
    return adminService.changePassword(req);
  })
);

router.get(
  "/test",
  asyncHandler(async (req, res) => {
    return "Welcome to Admins Route";
  })
);

module.exports = router;
