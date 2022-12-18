const jwt = require('jsonwebtoken');
const { ErrorCodes } = require('../model/base-response');
const ms = require('ms');

async function generateToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRY || '10h' });
}

async function refreshToken(token) {
    const payload = jwt.decode(token);
    const refreshValidityExpiresAt = payload.iat * 1000 + ms(process.env.REFRESH_TOKEN || '10h');
    if (refreshValidityExpiresAt < Date.now()) {
        throw ErrorCodes.REFRESH_VALIDITY_EXPIRED;
    }
    delete payload.iat;
    delete payload.exp;
    return generateToken(payload);
}

module.exports = {
    generateToken,
    refreshToken,
};
