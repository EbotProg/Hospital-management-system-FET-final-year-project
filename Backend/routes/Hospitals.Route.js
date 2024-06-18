const express = require("express");
const { AdminModel } = require("../models/Admin.model");
const { AmbulanceModel } = require("../models/Ambulance.model");
const { AppointmentModel } = require("../models/Appointment.model");
const { BedModel } = require("../models/Bed.model");
const { DoctorModel } = require("../models/Doctor.model");
const { NurseModel } = require("../models/Nurse.model");
const { PatientModel } = require("../models/Patient.model");
const { ReportModel } = require("../models/Report.model");
const { WardModel } = require("../models/Ward.model");
const { getAllWardStats } = require("../controllers/modelControllers/hospital.controller")

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // let admins = await AdminModel.find();
    // let patients = await PatientModel.find();
    // let ambulances = await AmbulanceModel.find();
    // let nurses = await NurseModel.find();
    // let beds = await BedModel.find();
    // let reports = await ReportModel.find();
    // let appointments = await AppointmentModel.find();
    // let doctors = await DoctorModel.find();
    // let data = {
    //   admin: admins.length,
    //   patient: patients.length,
    //   ambulance: ambulances.length,
    //   nurse: nurses.length,
    //   bed: beds.length,
    //   report: reports.length,
    //   doctor: doctors.length,
    //   appointment: appointments.length,
    // };

    let admin = await AdminModel.countDocuments();
    let patient = await PatientModel.countDocuments();
    let ambulance = await AmbulanceModel.countDocuments();
    let nurse = await NurseModel.countDocuments();
    let bed = await BedModel.countDocuments();
    let report = await ReportModel.countDocuments();
    let appointment = await AppointmentModel.countDocuments();
    let doctor = await DoctorModel.countDocuments();
    let ward = await WardModel.countDocuments()
    let wardStats = await getAllWardStats()
    let data = {
      admin,
      patient,
      ambulance,
      nurse,
      bed,
      report,
      doctor,
      appointment,
      ward,
      wardStats
    };

    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

module.exports = router;
