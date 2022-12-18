const express = require('express');
const { body, header } = require('express-validator');
const asyncHandler = require('../util/async-handler');
const router = express.Router();

const { ValidationMessages } = require('../model/base-response');

const authService = require('../services/consultancy-service');

router.post('/consultant/login', [
  body('email').notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  body('password').notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
], asyncHandler(async (req) => {
  return authService.adminLogin(req.body);
}));

router.get('/refresh-token', [
  header('Authorization').notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
], asyncHandler(async (req) => {
  return authService.refreshToken(req.header('Authorization'));
}));

router.get('/consultant/logout', asyncHandler(async (req) => {
  return authService.logoutAdminUser(req);
}));

router.post('/consultant/signup', [
  body('email').notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  body('password').notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  body('username').notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
], asyncHandler(async (req) => {
  return authService.adminSignUp(req);
}));

module.exports = router;
