const mongoose = require("mongoose");

const patientConsultationInformationSchema = mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient"
  },

  doc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor"
  },

  nurse_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nurse"
  },

  prescription_id: {
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

  dateTime: {
    type: String
  },

  timeStamp: {
    type: String,
    default: new Date()
  }

});

const PatientConsultationInformationModel = mongoose.model("patientConsultationInformation", patientConsultationInformationSchema);

module.exports = { PatientConsultationInformationModel };
