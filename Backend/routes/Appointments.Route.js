const express = require("express");
const { AppointmentModel } = require("../models/Appointment.model");
const { findPatientByPatientID } = require("../controllers/modelControllers/patient.controller")
const { findNurseByNurseID } = require("../controllers/modelControllers/nurse.controller")
const { findDoctorByDocID } = require("../controllers/modelControllers/doctor.controller")
const { checkIfDoctorWillBeAvailableDuringPeriod } = require("../controllers/modelControllers/appointment.controller")


const router = express.Router();

router.get("/", async (req, res) => {
  // let query = req.query;
  try {
    // const appointments = await AppointmentModel.find(query);
    const appointments = await AppointmentModel.find().populate([
            {
              path: "patientID",
            },
            {
              path: "appointmentWith",
            },
            {
              path: "createdBy",
            },
          ]);
    res.status(200).send(appointments);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/create", async (req, res) => {
  const payload = { ...req.body };
  try {

    const patient = await findPatientByPatientID(payload.patientID)
    if(!patient) {
      return res.send({error: "patient not found"})
    }

    const nurse = await findNurseByNurseID(payload.createdBy)
    if(!nurse) {
      return res.send({error: "invalid nurse ID"})
    }

    const doctor = await findDoctorByDocID(payload.appointmentWith)
    if(!doctor) {
      return res.send({error: "invalid doctor ID"})
    }

    const isDocAvailable = await checkIfDoctorWillBeAvailableDuringPeriod(payload.startDateTime, payload.endDateTime, doctor._id)
    if(!isDocAvailable) {
      return res.send({ error: "Doctor won't be available during this period"})
    }

    payload.patientID = patient._id;
    payload.createdBy = nurse._id;
    payload.appointmentWith = doctor._id;

    const appointment = new AppointmentModel(payload);
    await appointment.save();
    res.send({message: "Appointment Booked"});
  } catch (error) {
    res.send(error);
  }
  
});

router.patch("/:appointmentId", async (req, res) => {
  const id = req.params.appointmentId;
  const payload = req.body;
  try {
    const appointment = await AppointmentModel.findByIdAndUpdate(
      { _id: id },
      payload
    );
    if (!appointment) {
      res.status(404).send({ msg: `Appointment with id ${id} not found` });
    }
    res.status(200).send(`Appointment with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:appointmentId", async (req, res) => {
  const id = req.params.appointmentId;
  try {
    const appointment = await AppointmentModel.findByIdAndDelete({ _id: id });
    if (!appointment) {
      res.status(404).send({ msg: `Appointment with id ${id} not found` });
    }
    res.status(200).send(`Appointment with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
