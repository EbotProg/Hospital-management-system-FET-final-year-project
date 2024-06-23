const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "patient",
  },

  patientID: {
    type: String,
    required: true,
  },


  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  mobile: {
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
    required: true
  },
 
  lastVisitDate: {
    type: String,
  },


  address: {
    type: String,
  },

  image: {
    type: String,
  },

  previousDisease: {
    type: String,
  },
  
  currentDisease: {
    type: String,
  },

  details: {
    type: String,
  },

  admitted: {
    type: Boolean,
    default: false,
  },

  dateTime: {
    type: String,
  },

  docID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
  },

  nurseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nurse",
  },

  bedID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bed",
  },
  roomID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room",
  },

  wardID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ward",
  },

  currentAdmissionReportID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admissionReport",
  },

  currentDischargeReportID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admissionReport",
  }

  ,

  timeStamp: {
    type: String,
    default: new Date()
  }

});

const PatientModel = mongoose.model("patient", patientSchema);

module.exports = { PatientModel };
