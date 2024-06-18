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
  },

  isAvailable: {
    type: Boolean,
    default: false,
    required: true,
  }

  
});

const RoomModel = mongoose.model("room", roomSchema);

module.exports = { RoomModel };
