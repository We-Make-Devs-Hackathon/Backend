const Staffs = require("../model/staff");
const { ErrorCodes } = require("../model/base-response");

const constants = require("../util/constants");
const passwordUtil = require("../util/password-util");
const sender = require("../queue/sender");
const logger = require("../util/logger");

// async function changePassword(req) {
//     const userId = req.header('user.id');
//     const body = req.body;
//     const adminUser = await AdminUser.findById(userId);
//     if(!adminUser) {
//         throw ErrorCodes.INVALID_ID;
//     }
//     if(!passwordUtil.comparePassword(body.oldPassword, adminUser.password)) {
//         throw ErrorCodes.INVALID_CREDENTIALS;
//     }
//     const password = passwordUtil.cryptPassword(body.newPassword);
//     await AdminUser.findByIdAndUpdate(userId, { $set: { password } });
//     const data = {
//         _id: userId,
//         password
//     };
//     await sender.emit(req, 'admin-user-update', data, constants.SERVICES.iam);
// }

async function postStaff(req) {
  try {
    const staff = req.body;
    console.log(staff)
    const password = passwordUtil.cryptPassword(staff.password);
    staff.password = password;
    const newStaff = new Staffs(staff);
    const result = await newStaff.save();
    return {
      _id: newStaff._id,
      message: "Staff profile created successfully",
      result: result,
    };
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_CREDENTIALS;
  }
}

async function getStaffById(id) {
  try {
    const staff = await Staffs.find({ staffId: id });
    return staff;
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_CREDENTIALS;
  }
}

async function getStaffByHospitalId(id) {
  try {
    const staff = await Staffs.find({ hospitalId: id });
    return staff;
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_ID;
  }
}

async function updateStaffDetails(req) {
  try {
    const staff = req.body;
    const prevData = await Staffs.findOne({ staffId: req.body.staffId, hospitalId: req.body.hospitalId });
    const _id = prevData._id.toString();
    const result = await Staffs.findByIdAndUpdate(_id, {$set: staff});
    return {
      _id: _id,
      message: "Staff profile updated successfully",
    };
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_CREDENTIALS;
  }
}

async function deleteStaff(req) {
  try {
    const staff = req.body;  
    const prevData = await Staffs.findOne({ staffId: req.body.staffId, hospitalId: req.body.hospitalId });
    const _id = prevData._id.toString();
    await Staffs.findByIdAndDelete(_id);
    return {
      _id: _id,
      message: "Staff profile deleted successfully",
    };
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_CREDENTIALS;
  }
}


module.exports = {
  postStaff,
  getStaffById,
  getStaffByHospitalId,
  updateStaffDetails,
  deleteStaff
};
