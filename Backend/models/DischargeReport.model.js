const mongoose = require("mongoose");

const dischargeReportSchema = mongoose.Schema({
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

  disease: String,

  details: String,



  bedID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bed",
    required: true,
  },

  timeStamp: {
    type: String,
    default: new Date()
  }
});

const DischargeReportModel = mongoose.model("dischargeReport", dischargeReportSchema);

module.exports = { DischargeReportModel };
