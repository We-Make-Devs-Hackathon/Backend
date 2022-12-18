const StreamChat = require("stream-chat").StreamChat;


const serverClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

async function createChannel(id,user1Id,user2Id) {
  const channel = serverClient.channel("messaging", id, {
    created_by_id: user1Id,
  });
  await channel.create().then(
    console.log("channel created")
  );
  await channel.addMembers([user1Id,user2Id]);
  // return result;
}
module.exports = {
    createChannel
}
