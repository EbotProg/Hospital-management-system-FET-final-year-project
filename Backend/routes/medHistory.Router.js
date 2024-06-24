const express = require("express");
const { PatientMedicalHistoryModel } = require("../models/PatientMedicalHistory.model")
const { findPatientByPatientID } = require("../controllers/modelControllers/patient.controller")
const { findHistoryWithinGivenDates } = require("../controllers/modelControllers/medHistory.controller")

const router = express.Router();


router.post("/search", async (req, res) => {
    try {
        const payload = { ...req.body }
        console.log("payload", payload);
        const patient = await findPatientByPatientID(payload.patientID)
        if(!patient) {
            return res.send({ error: "patient not found"})
        }
    //  console.log("patient_id, startdate, endDate", patient._id, payload.startDate, payload.endDate)
    //   const medHistory = await PatientMedicalHistoryModel.find({
    //     patient_id: patient._id,
    //     // timeStamp: { 
    //     //     $gte: new Date(payload.startDate),
    //     //     $lte: new Date(payload.endDate)
    //     // }
    //   }).populate([
    //           {
    //             path: "patient_id",
    //           },
    //           {
    //             path: "prescription_id",
    //           },
    //           {
    //             path: "doc_id",
    //           },
    //           {
    //             path: "nurse_id",
    //           },
    //           {
    //             path: "consultation_id",
    //           },
    //         ]);
    const medHistory = await findHistoryWithinGivenDates(patient._id, payload.startDate, payload.endDate)
            if(medHistory.length === 0) {
                return res.send({ message: "No data found"})
            }else {
                return res.status(200).send({message: "Fetched data", medHistory});

            }
    } catch (error) {
      console.log(error);
      res.send({ error: "Internal Server Error" });
    }
  });


  module.exports = router;