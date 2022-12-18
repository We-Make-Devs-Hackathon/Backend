const ChatClients = require("../model/chatClients");
const { ErrorCodes } = require("../model/base-response");
const csv = require("csvtojson");
const constants = require("../util/constants");
const passwordUtil = require("../util/password-util");
const sender = require("../queue/sender");
const logger = require("../util/logger");

const {createChannel} = require("./Chat");

async function postChatClients(data) {
  try {
    const client = new ChatClients(data);
    await client.save();
  } catch (error) {
    logger.error(error);
  }
}

async function createChatChannel(data) {
  try {
    await createChannel(data.user1Id+data.user2Id,data.user1Id,data.user2Id);
    let client = await ChatClients.findOne({ id: data.user1Id });
    let _id = client._id.toString();
    if (client) {
        client.channelIds.push(data.user1Id+data.user2Id);
        await ChatClients.findByIdAndUpdate(_id, { $set: client});
    }
    client = await ChatClients.findOne({ id: data.user2Id });
    _id = client._id.toString();
    if (client) {
        client.channelIds.push(data.user1Id+data.user2Id);
        await ChatClients.findByIdAndUpdate(_id, { $set: client});
    }
    return {
        message: "Channel created",
    }
  } catch (error) {
    logger.error(error);
    return ErrorCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = {
    postChatClients,
    createChatChannel
}