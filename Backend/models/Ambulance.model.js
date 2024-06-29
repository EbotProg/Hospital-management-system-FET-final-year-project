const mongoose = require("mongoose");

const ambulanceSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },

  charges: {
    type: Number,
    required: true,
  },

  ambulanceID: {
    type: Number,
    required: true,
  },

  ambulanceDriver: {
    type: String,
    required: true,
  },

  number: {
    type: Number,
    required: true,
  },

  timeStamp: {
    type: String,
    default: new Date()
  }


});

const AmbulanceModel = mongoose.model("ambulance", ambulanceSchema);

module.exports = { AmbulanceModel };
