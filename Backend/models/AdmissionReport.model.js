const mongoose = require("mongoose");

const admissionReportSchema = mongoose.Schema({
  docID: {
    type: Number
  },
  patientID: {
    type: Number
  },
  nurseID: {
    type: Number
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
 
  timeStamp: {
    type: String,
  }
});

const AdmissionReportModel = mongoose.model("admissionReport", admissionReportSchema);

module.exports = { AdmissionReportModel };
