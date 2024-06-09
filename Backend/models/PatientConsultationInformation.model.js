const mongoose = require("mongoose");

const patientConsultationInformationSchema = mongoose.Schema({
  patientID: {
    type: Number
  },

  docID: {
    type: Number
  },

  nurseID: {
    type: Number
  },

  prescriptionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "prescription"
  },

  extrainfo: {
    type: String,
  },

  disease: {
    type: String,
  },

  temperature: {
    type: Number,
  },

  weight: {
    type: Number,
  },

  bloodPressure: {
    type: Number,
  },

  glucose: {
    type: Number,
  },

  timeStamp: {
    type: String,
  },

});

const patientConsultationInformationModel = mongoose.model("patientConsultationInformation", patientConsultationInformationSchema);

module.exports = { patientConsultationInformationModel };
