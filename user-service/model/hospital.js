const mongoose = require("mongoose");

const HospitalSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    hospitalid: {
      type: String,
    },
    state: {
      type: String,
    },
    district: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
    },
    street: {
        type: String,
    },
    landmark: {
        type: String,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("hospitals", HospitalSchema);
