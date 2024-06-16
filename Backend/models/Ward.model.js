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

  
});

const WardModel = mongoose.model("ward", wardSchema);

module.exports = { WardModel };
