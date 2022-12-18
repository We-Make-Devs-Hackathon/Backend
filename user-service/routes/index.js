const express = require('express');
const asyncHandler = require('../util/async-handler');
const router = express.Router();

router.get('/', asyncHandler(async () => {
  return 'USER API';
}));

module.exports = router;

