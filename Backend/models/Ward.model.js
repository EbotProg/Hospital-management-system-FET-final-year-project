const mongoose = require("mongoose");

const wardSchema = mongoose.Schema({
  wardName: {
    type: String,
    required: true,
  },

  hosptialID: {
    type: Number,
    ref: "hospital"
  },

  timeStamp: {
    type: String,
    default: new Date()
  }

  
});

const WardModel = mongoose.model("ward", wardSchema);

module.exports = { WardModel };
