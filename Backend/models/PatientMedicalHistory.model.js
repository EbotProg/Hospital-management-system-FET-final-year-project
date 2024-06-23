const mongoose = require("mongoose");

const patientMedicalHistorySchema = mongoose.Schema({
  patient_id: {
     type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
    required: true
  },

  prescription_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "prescription"
  },

  doc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
  },

  nurse_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nurse",
  },


  timeStamp: {
    type: String,
    default: new Date()
  },

  consultation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patientConsultationInformation"
  }

  
});

const PatientMedicalHistoryModel = mongoose.model("patientMedicalHistory", patientMedicalHistorySchema);

module.exports = { PatientMedicalHistoryModel };
