const jwt = require("jsonwebtoken");

const ErrorCodes = require("../model/base-response").ErrorCodes;
JWT_SECRET = process.env.JWT_SECRET;

const verify = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    const data = jwt.verify(token, JWT_SECRET);
    if (data.role == "admin") req.hospitalId = data.hospitalId;
    else throw ErrorCodes.INVALID_TOKEN;
  } catch (error) {
    return ErrorCodes.INVALID_TOKEN;
  }

  next();
};

module.exports = verify;
