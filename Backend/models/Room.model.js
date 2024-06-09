const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true,
  },

  wardID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ward",
    required: true,
  }

  
});

const roomModel = mongoose.model("room", roomSchema);

module.exports = { roomModel };
