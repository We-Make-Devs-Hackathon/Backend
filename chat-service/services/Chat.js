const StreamChat = require("stream-chat").StreamChat;


const serverClient = StreamChat.getInstance(
  "pfcg3zjxem73",
  "ve7k8p4z3uvqbru57ppz6svepgx3jdxng59fqnsh942qzj4ns48eqhmnze38xbmx"
);

async function createChannel(id,user1Id,user2Id) {
  const channel = serverClient.channel("messaging", id, {
    created_by_id: "john",
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
