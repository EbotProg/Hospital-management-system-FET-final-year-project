const express = require("express");
const { PatientConsultationInformationModel } = require("../models/PatientConsultationInformation.model");
const { findDoctorByDocID } = require("../controllers/modelControllers/doctor.controller")
const { findNurseByNurseID } = require("../controllers/modelControllers/nurse.controller")
const { findPatientByPatientID } = require("../controllers/modelControllers/patient.controller")
const { createPrescription } = require("../controllers/modelControllers/prescription.controller")
const { PatientMedicalHistoryModel } = require("../models/PatientMedicalHistory.model")

const router = express.Router();


router.get("/", async (req, res) => {
    try {
      const consultations = await PatientConsultationInformationModel.find()
      res.status(200).send(consultations);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "Internal Server Error" });
    }
  });


  router.post("/add", async (req, res)=> {
    try{

        const payload = { ...req.body };
        console.log("add consultation route", payload)
        let doctor, nurse;
        if(payload.docID) {//check if doctor exist

            doctor = await findDoctorByDocID(payload.docID);
            if(!doctor) {
                return res.status(404).send({error: "doctor not found"})
            }

        }else{//check if nurse exist

            nurse = await findNurseByNurseID(payload.nurseID);
            if(!nurse) {
                return res.status(404).send({error: "nurse not found"})
            }

        }

        const patient = await findPatientByPatientID(payload.patientID);
        if(!patient) {
           return res.status(404).send({error: "patient not found"})
        }

       console.log("doctor, nurse, patient", doctor, nurse, patient)
        const prescription = await createPrescription(doctor?._id, nurse?._id, patient?._id, payload.medicines);

        delete payload.docID;
        delete payload.nurseID;
        delete payload.patientID;
        delete payload.medicines;
        
        payload.patient_id = patient._id || null;
        payload.doc_id = doctor?._id || null;
        payload.nurse_id = nurse._id || null;
        payload.prescription_id = prescription?.id

        const consultation = await PatientConsultationInformationModel.create(payload)
        console.log("consultation ==== ", consultation);

        delete payload.extrainfo;
        delete payload.disease;
        delete payload.temperature;
        delete payload.weight;
        delete payload.bloodPressure;
        delete payload.glucose;
        delete payload.dateTime;
        

        payload.consultation_id = consultation._id;
        const medHistory = await PatientMedicalHistoryModel.create(payload)
        console.log("medHistory", medHistory);
        res.status(200).send({ message: "patient consulted successfully", consultation})
    }catch(err) {
        console.log(err);
        res.status(400).send({error: "Internal Server Error"})
    }
  })


  module.exports = router