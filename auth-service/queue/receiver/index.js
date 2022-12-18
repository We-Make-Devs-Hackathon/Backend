const express = require('express');
const asyncHandler = require('../../util/async-handler');
const router = express.Router();

/**
 *  This callback requires `./processors/${req.body.type}.js` in order to execute the event.
 */
router.post('/', asyncHandler(async req => {
    req.log('EventReceived', req.body.type, JSON.stringify(req.body.body));
    req.body.log = req.log;
    req.body.error = req.error;
    return await require(`./processors/${req.body.type}`)(req.body);
}));

module.exports = router;
