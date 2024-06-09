const mongoose = require("mongoose");

const dischargeReportSchema = mongoose.Schema({
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

const DischargeReportModel = mongoose.model("dischargeReport", dischargeReportSchema);

module.exports = { AdmissionReportModel };
