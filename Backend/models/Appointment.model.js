const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  // userType: {
  //   type: String,
  //   default: "patient",
  // },

  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nurse",
    required: true
  },

  reason: {
    type: String,
    required: true
  },

  appointmentWith: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor"
  },

  startDateTime: {
    type: String,
    required: true
  },

  endDateTime: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  appointmentStatus: {
    type: String,
    default: "Scheduled"
  },

  timeStamp: {
    type: String,
    default: new Date()
  }

  /******************
  /////////////////////other appointment statuses used here
  /****************
   * Scheduled*: This is the foundation, indicating an appointment exists in the system.
   * Checked In: This signifies the patient's arrival, potentially triggering automated updates for providers or follow-up messages for late arrivals.
   * In Progress*: This indicates the consultation is underway, preventing double-booking or interruptions for the provider.
   * Completed*: This confirms the consultation is finished, allowing for documentation completion and potential scheduling of follow-up appointments.
   * Cancelled*: This captures a terminated appointment, aiding in understanding cancellation patterns and informing future scheduling strategies.



   */

  //////


  // patientName: {
  //   type: String,
  // },

  // mobile: {
  //   type: Number,
  // },
  
  // email: {
  //   type: String,
  // },

  // address: {
  //   type: String,
  // },

  // disease: {
  //   type: String,
  // },

  // department: {
  //   type: String,
  // },

  // time: {
  //   type: String,
  // },

  // date: {
  //   type: String,
  // },

  // age: {
  //   type: Number,
  //   required: true,
  // },

  // gender: {
  //   type: String,
  //   required: true,
  // },
});

const AppointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = { AppointmentModel };
