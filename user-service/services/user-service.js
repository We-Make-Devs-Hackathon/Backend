const AdminUser = require('../model/admin-user');
const { ErrorCodes } = require('../model/base-response');

const constants = require('../util/constants');
const passwordUtil = require('../util/password-util');
const sender = require('../queue/sender');


async function changePassword(req) {
    const userId = req.header('user.id');
    const body = req.body;
    const adminUser = await AdminUser.findById(userId);
    if(!adminUser) {
        throw ErrorCodes.INVALID_ID;
    }
    if(!passwordUtil.comparePassword(body.oldPassword, adminUser.password)) {
        throw ErrorCodes.INVALID_CREDENTIALS;
    }
    const password = passwordUtil.cryptPassword(body.newPassword);
    await AdminUser.findByIdAndUpdate(userId, { $set: { password } });
    const data = {
        _id: userId,
        password
    };
    await sender.emit(req, 'admin-user-update', data, constants.SERVICES.iam);
}

module.exports = {
    changePassword,
};
