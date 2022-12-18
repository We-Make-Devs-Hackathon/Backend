const express = require('express');
const { body } = require('express-validator');
const asyncHandler = require('../util/async-handler');
const router = express.Router();

const { ValidationMessages } = require('../model/base-response');

const userService = require('../services/user-service');

router.post('/change-password', [
  body('oldPassword').notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
  body('newPassword').notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
], asyncHandler(async (req) => {
  return userService.changePassword(req);
}));

router.get('/test', asyncHandler(async (req,res) => {
  // req.log(`landed on test api: ${JSON.stringify(req.body)}`);
  // res.send('OK');
  // return {
  //   bar: 'foo'
  // };
  return "Hello World";
}));

module.exports = router;
