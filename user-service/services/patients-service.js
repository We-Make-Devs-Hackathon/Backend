const Patients = require("../model/patient");
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

async function postPatient(req) {
  try {
    const Patient = req.body;
    const password = passwordUtil.cryptPassword(Patient.password);
    Patient.password = password;
    const newPatient = new Patients(Patient);
    const result = await newPatient.save();
    return {
      _id: newPatient._id,
      message: "Patient profile created successfully",
      result: result,
    };
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_CREDENTIALS;
  }
}

async function getPatientById(id) {
  try {
    const Patient = await Patients.find({ patientId: id });
    return Patient;
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_CREDENTIALS;
  }
}

async function getPatientByHospitalId(id) {
  try {
    const Patient = await Patients.find({ hospitalId: id });
    return Patient;
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_ID;
  }
}

async function updatePatientDetails(req) {
  try {
    const Patient = req.body;
    const prevData = await Patients.findOne({ patientId: req.body.patientId, hospitalId: req.body.hospitalId });
    const _id = prevData._id.toString();
    await Patients.findByIdAndUpdate(_id, {$set: Patient});
    return {
      _id: _id,
      message: "Patient profile updated successfully",
    };
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_CREDENTIALS;
  }
}

async function deletePatient(req) {
  try {
    const Patient = req.body;  
    const prevData = await Patients.findOne({ patientId: req.body.patientId, hospitalId: req.body.hospitalId });
    const _id = prevData._id.toString();
    await Patients.findByIdAndDelete(_id);
    return {
      _id: _id,
      message: "Patient profile deleted successfully",
    };
  } catch (err) {
    logger.error(err);
    return ErrorCodes.INVALID_CREDENTIALS;
  }
}


module.exports = {
  postPatient,
  getPatientById,
  getPatientByHospitalId,
  updatePatientDetails,
  deletePatient
};
