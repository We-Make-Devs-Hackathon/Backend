const express = require("express");
const { body, header } = require("express-validator");
const asyncHandler = require("../util/async-handler");
const router = express.Router();

const { ValidationMessages } = require("../model/base-response");

const authService = require("../services/hospital-auth-service");

router.post(
  "/hospital/login",
  [
    body("email").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("password").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req) => {
    return authService.adminLogin(req.body);
  })
);

router.get(
  "/refresh-token",
  [
    header("Authorization")
      .notEmpty()
      .withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req) => {
    return authService.refreshToken(req.header("Authorization"));
  })
);

router.get(
  "/hospital/logout",
  asyncHandler(async (req) => {
    return authService.logoutAdminUser(req);
  })
);

router.post(
  "/hospital/signup",
  [
    body("email").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("password").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("username").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("state").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("district").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("city").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    body("pincode").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  ],
  asyncHandler(async (req) => {
    return authService.adminSignUp(req);
  })
);

module.exports = router;
