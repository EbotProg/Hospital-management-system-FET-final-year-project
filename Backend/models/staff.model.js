const mongoose = require("mongoose");

const staffSchema = mongoose.Schema({
  staffType: {
    type: String
  },

  staffID: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
  },

  phoneNumber: {
    type: Number,
    minlength: 10,
  },

  email: {
    type: String,
  },

  age: {
    type: Number,
  },

  gender: {
    type: String,
  },

  bloodGroup: {
    type: String,
  },

  DOB: {
    type: String,
  },

  education: {
    type: String,
  },

  image: {
    type: String,
  },

  isAvailable: {
    type: String,
  },

  timeStamp: {
    type : String
  }

});

const staffModel = mongoose.model("staff", staffSchema);

module.exports = { staffModel };
