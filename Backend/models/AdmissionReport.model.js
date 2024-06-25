const mongoose = require("mongoose");

const admissionReportSchema = mongoose.Schema({
  // docID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "doctor"
  // },
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient'
  },
  nurseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'nurse'
  },
  wardID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ward",
    required: true,
  },

  roomID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room",
    required: true,
  },



  bedID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bed",
    required: true,
  },

  dateTime: {
    type: String,
    default: new Date()
  },

  timeStamp: {
    type: String,
    default: new Date()
  },

  isCurrent: {
    type: Boolean,
    default: true
  },

  dischargeReportID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dischargeReport"
  },

  disease: {
    type: String,
    required: true
  },
});

const AdmissionReportModel = mongoose.model("admissionReport", admissionReportSchema);

module.exports = { AdmissionReportModel };
