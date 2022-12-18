const mongoose = require('mongoose');

const ChatClientSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    role: {
        type: String,
    },
    channelIds: {
        type: Array,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('hospital_chat_client', ChatClientSchema);
