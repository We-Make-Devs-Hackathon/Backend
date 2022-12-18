const AdminUser = require('../model/hospital-user');
const { ErrorCodes } = require('../model/base-response');

//rabbitmq import
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
    const token = await jwtService.generateToken({ hospitalid: adminUser.hospitalid, email: body.email });
    return { token, type: 'Bearer',email:body.email };
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

async function adminSignUp(req)
{
    try {
        let user = req.body;
        user.password = cryptPassword(user.password);
        user.hospitalid = user.username+user.email.split('@')[0];
        const adminUser = new AdminUser(user);
        await adminUser.save();
        //rabbitmq connection
        amqp.connect('amqp://localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                var queue = 'hospital';
                var msg = user;
                channel.assertQueue(queue, {
                    durable: false
                });
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
                console.log(" [x] Sent %s", msg);
            });
            setTimeout(function() {
                connection.close();
            }, 1000);
        });
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
