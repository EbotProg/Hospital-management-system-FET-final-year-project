const mongoose = require("mongoose");

const prescriptionSchema = mongoose.Schema({
  doc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor"
  },

  nurse_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nurse"
  },

  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
    required: true
  },

  // hospital: {
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   address: {
  //     street: {
  //       type: String,
  //       required: true,
  //     },
  //     city: {
  //       type: String,
  //       required: true,
  //     },
  //     state: {
  //       type: String,
  //       required: true,
  //     },
  //     pincode: {
  //       type: Number,
  //       required: true,
  //     },
  //   },
  //   phone: {
  //     type: Number,
  //     required: true,
  //     minlength: 11,
  //   },
  // },

  medicines: [
    {
      medicineName: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true
      },
      duration: {
        type: String,
        required: true
      }
    }
    
    // diagnosis: {
    //   type: String,
    // },
    
    // type: {
    //   type: String,
    //   required: true,
    // },
    // dosage: {
    //   quantity: {
    //     type: Number,
    //     required: true,
    //   },
    //   duration: {
    //     type: Number,
    //     required: true,
    //   },
    // },
  ],

  // advice: {
  //   type: String,
  // },

  // total: {
  //   type: Number,
  //   required: true,
  // },

  

  timeStamp: {
    type: String,
    default: new Date()
  }
});

const PrescriptionModel = mongoose.model("prescription", prescriptionSchema);

module.exports = { PrescriptionModel, prescriptionSchema };
