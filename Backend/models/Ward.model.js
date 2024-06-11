const mongoose = require("mongoose");

const wardSchema = mongoose.Schema({
  wardName: {
    type: String,
    required: true,
  },

  hosptialID: {
    type: Number
  },

  
});

const wardModel = mongoose.model("ward", wardSchema);

module.exports = { wardModel };
