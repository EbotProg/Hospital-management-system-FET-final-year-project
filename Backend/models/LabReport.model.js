const mongoose = require("mongoose");

const labReportSchema = mongoose.Schema({
  doc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor"
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient"
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


  dateTime: {
    type: String
  },

  timeStamp: {
    type: String,
    default: new Date()
  }
});

const LabReportModel = mongoose.model("labReport", labReportSchema);

module.exports = { LabReportModel };
