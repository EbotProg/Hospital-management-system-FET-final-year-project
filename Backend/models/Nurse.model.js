const mongoose = require("mongoose");

const nurseSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "nurse",
  },

  nurseID: {
    type: String,
    required: true,
  },

  nurseName: {
    type: String,
  },

  mobile: {
    type: Number,
    minlength: 10,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
    required: true,
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

  address: {
    type: String,
  },

  education: {
    type: String,
  },

  image: {
    type: String,
    default:
      "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  },

  details: {
    type: String,
  },

  wardID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ward'
  },

  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'hospital'
  }

});

const NurseModel = mongoose.model("nurse", nurseSchema);

module.exports = { NurseModel };
