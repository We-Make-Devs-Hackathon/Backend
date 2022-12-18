const Doctors = require("../model/doctor");
const { ErrorCodes } = require("../model/base-response");
const csv = require("csvtojson");
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

async function postDoctor(req) {
  try {
    const doctor = req.body;
    const password = passwordUtil.cryptPassword(doctor.password);
    doctor.password = password;
    const newDoctor = new Doctors(doctor);
    const result = await newDoctor.save();
    return {
      _id: newDoctor._id,
      message: "Doctor profile created successfully",
      result: result,
    };
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_CREDENTIALS;
  }
}

async function getDoctorById(id) {
  try {
    const doctor = await Doctors.find({ doctorId: id });
    return doctor;
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_CREDENTIALS;
  }
}

async function getDoctorByHospitalId(id) {
  try {
    const doctor = await Doctors.find({ hospitalId: id });
    return doctor;
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_ID;
  }
}

async function updateDoctorDetails(req) {
  try {
    const doctor = req.body;
    const prevData = await Doctors.findOne({ doctorId: req.body.doctorId, hospitalId: req.body.hospitalId });
    const _id = prevData._id.toString();
    await Doctors.findByIdAndUpdate(_id, {$set: doctor});
    return {
      _id: _id,
      message: "Doctor profile updated successfully",
    };
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_CREDENTIALS;
  }
}

async function deleteDoctor(req) {
  try {
    const doctor = req.body;  
    const prevData = await Doctors.findOne({ doctorId: req.body.doctorId, hospitalId: req.body.hospitalId });
    const _id = prevData._id.toString();
    await Doctors.findByIdAndDelete(_id);
    return {
      _id: _id,
      message: "Doctor profile deleted successfully",
    };
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_CREDENTIALS;
  }
}

async function uploadCSV(req) {
  try {
    const csvData = req.files[0].buffer.toString();
    const jsonobj = await csv().fromString(csvData);
    const result = await Doctors.insertMany(jsonobj);

    return {
      message: "Doctor profile created successfully",
      result: result,
    };
    
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_CREDENTIALS;
  }
}

module.exports = {
  postDoctor,
  getDoctorById,
  getDoctorByHospitalId,
  updateDoctorDetails,
  deleteDoctor,
  uploadCSV,
};
