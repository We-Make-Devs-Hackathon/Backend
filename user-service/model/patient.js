const mongoose = require("mongoose");

const DoctorsSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  fullName: {
    type: String,
  },
  guardianName: {
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
  type: {
    type: String,
  },
  address: {
    type: String,
  },
  age: {
    type: Number,
  },
  dateOfBirth: {
    type: String,
  },
  dateOfRegistration: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  hospitalId: {
    type: String,
  },
  patientId: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Patients", DoctorsSchema);
