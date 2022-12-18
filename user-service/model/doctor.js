const mongoose = require("mongoose");

const DoctorsSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
  },
  gender: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  speciality: {
    type: String,
  },
  address: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  dateOfJoining: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  hospitalId: {
    type: String,
  },
  doctorId: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Doctors", DoctorsSchema);
