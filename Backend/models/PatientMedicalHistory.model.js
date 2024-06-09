const mongoose = require("mongoose");

const patientMedicalHistorySchema = mongoose.Schema({
  patientID: {
    type: Number,
    required: true,
  },

  prescriptionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "prescription"
  },

  docID: {
    type: Number,
  },

  nurseID: {
    type: Number,
  },

  timeStamp: {
    type: String
  },

  consultationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patientConsultationInformation"
  }

  
});

const PatientMedicalHistoryModel = mongoose.model("patientMedicalHistory", patientMedicalHistorySchema);

module.exports = { PatientMedicalHistoryModel };
