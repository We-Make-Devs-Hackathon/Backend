const express = require("express");
const { body } = require("express-validator");
const asyncHandler = require("../util/async-handler");
const router = express.Router();

const { ValidationMessages } = require("../model/base-response");

const chatService = require("../services/chat-service");

router.post(
    "/createChannel",
    [
        body("user1Id").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
        body("user2Id").notEmpty().withMessage(ValidationMessages.NOT_EMPTY),
    ],
    asyncHandler(async (req, res) => {
        chatService.createChatChannel(req.body);
    })
);

module.exports = router;