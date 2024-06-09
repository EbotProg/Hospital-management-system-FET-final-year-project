const mongoose = require("mongoose");

const labReportSchema = mongoose.Schema({
  docID: {
    type: Number
  },
  patientID: {
    type: Number
  },
  haemoglobin: {
    type: Number
  },

  redBloodCellCount: {
    type: Number,
  },
  
  whiteBloodCellCount: {
    type: Number,
  },

  thrombocytes: {
    type: Number,
  },

  glucose: {
    type: Number,
  },


  sodium: {
    type: Number,
  },

  potassium: {
    type: Number,
  },

  timeStamp: {
    type: String,
  }
});

const LabReportModel = mongoose.model("labReport", labReportSchema);

module.exports = { LabReportModel };
