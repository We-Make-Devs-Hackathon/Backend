const express = require('express');
const asyncHandler = require('../util/async-handler');
const router = express.Router();

router.get('/', asyncHandler(async () => {
  return 'IAM API';
}));

module.exports = router;

