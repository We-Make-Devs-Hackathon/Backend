const AdminUser = require('../model/consultancy-doctor');
const { ErrorCodes } = require('../model/base-response');

const StreamChat = require("stream-chat").StreamChat;


const amqp = require('amqplib/callback_api');
const jwtService = require('./jwt-service');
const { comparePassword, cryptPassword } = require('../util/password-util');
const constants = require('../util/constants');
const requestTemplate = require('../util/request-template');
const logger = require('../util/logger');

async function adminLogin(body) {
    const adminUser = await AdminUser.findOne({ [body.email.includes('@') ? 'email' : 'username']: body.email });
    if (!adminUser || !comparePassword(body.password, adminUser.password)) {
        throw ErrorCodes.INVALID_CREDENTIALS;
    }
    const token = await jwtService.generateToken({ id: adminUser.userid, email: body.email, type: 'admin' });
    return { token, type: 'Bearer',email:body.email, role: adminUser.role || 'SubAdmin', permissions: adminUser.permissions, username: adminUser.username, userid: adminUser.userid, streamToken: adminUser.streamToken };
}

async function refreshToken(authHeader) {
    try {
        const token = authHeader.substr('Bearer '.length);
        return { token: await jwtService.refreshToken(token), type: 'Bearer' };
    } catch (error) {
        throw ErrorCodes.UNAUTHORIZED;
    }
}

async function logoutAdminUser(req) {
    // Sample inter-microservice communication 
    const payload = {
        foo: 'bar',
    };
    const response = await requestTemplate.post(req, constants.SERVICES.user, '/v1/user/test', payload);
    return response.data;
}

async function createTokens(user, serverClient) {
    console.log(user)
    const token = serverClient.createToken(user.id);
    await serverClient.upsertUsers([user]).then(() => {
        console.log('User created');
    });
    return token;
  }

async function adminSignUp(req)
{
    try {
        let user = req.body;
        user.password = cryptPassword(user.password);
        user.userid = user.username.split(" ")[0]+user.email.split('@')[0];
        let userChat = {
            id: user.userid,
            name: user.username,
            image: `https://getstream.io/random_svg/?id=broken-waterfall-5&amp;name=${user.username.split(" ")[0]}+${user.username.split(" ")[1]}`,
            role: 'admin',
            };
        const serverClient = StreamChat.getInstance(
            process.env.STREAM_API_KEY,
            process.env.STREAM_API_SECRET
            );
        user.streamToken = await createTokens(userChat,serverClient);
        amqp.connect('amqp://localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                var queue = 'stream';
                userChat.channelIds = [];
                var msg = userChat;
                channel.assertQueue(queue, {
                    durable: false
                });
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
            });
            setTimeout(function() {
                connection.close();
            }, 1000);
        });
        const adminUser = new AdminUser(user);
        await adminUser.save();
        return { message: 'User created successfully' };
    } catch (error) {
        logger.error(error);
        throw ErrorCodes.INVALID_CREDENTIALS;
    }
}

module.exports = {
    adminLogin,
    refreshToken,
    logoutAdminUser,
    adminSignUp,
};
