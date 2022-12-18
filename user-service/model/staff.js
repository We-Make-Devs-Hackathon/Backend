const mongoose = require("mongoose");

const StaffsSchema = mongoose.Schema({
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
  designation: {
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
  staffId: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Staffs", StaffsSchema);
