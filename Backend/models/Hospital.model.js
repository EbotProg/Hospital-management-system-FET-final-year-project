const mongoose = require("mongoose");

const hospitalSchema = mongoose.Schema({
  docNumbers: {
    type: Number,
  },

  patientNumbers: {
    type: Number,
  },

  nurseNumbers: {
    type: Number,
  },

  ambulanceNumbers: {
    type: Number,
  },

  roomsNumbers: {
    type: Number,
  },

  bedNumbers: {
    type: Number,
  },

  appointmentNumbers: {
    type: Number,
  },

  reportsNumbers: {
    type: Number,
  },

  wardNumbers: {
    type: Number
    
  },

  name: {
    type: String
  },

  location: {
    type: String
  },

  type: {
    type: String
  },

  abbrev: {
    type: String
  }

});

const HospitalModel = mongoose.model("hospital", hospitalSchema);

module.exports = { HospitalModel };
