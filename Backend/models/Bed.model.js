const mongoose = require("mongoose");

const bedSchema = mongoose.Schema({
  bedNumber: {
    type: Number,
    required: true,
  },

  // roomNumber: {
  //   type: Number,
  //   required: true,
  // },

  // occupied: {
  //   type: String,
  // },

  // patientID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "patient",
  // },

   wardID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ward",
  },

   roomID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room",
  },


  isAvailable: {
    type: Boolean,
    default: true,
  }
});

const BedModel = mongoose.model("bed", bedSchema);

module.exports = { BedModel };
