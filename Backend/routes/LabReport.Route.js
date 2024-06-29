const express = require("express");
const { LabReportModel } = require("../models/LabReport.model")
const { PatientMedicalHistoryModel } = require("../models/PatientMedicalHistory.model")
const { findPatientByPatientID } = require("../controllers/modelControllers/patient.controller")
const { findDoctorByDocID } = require("../controllers/modelControllers/doctor.controller")
const { findSingleHistoryWithinGivenDates } = require("../controllers/modelControllers/medHistory.controller")

const router = express.Router();


router.get("/", async (req, res)=>{
    try{

        const labReports = await LabReportModel.find().populate([
            {
                path: "doc_id",
            },
            {
                path: "patient_id",
            },
        ])
        res.send({ message: "Lab Reports Fetched", labReports})



    }catch(err) {
        console.log(err);
        res.send({ error: "Internal Server Error"})
    }
})

router.post("/add", async (req, res)=>{
    try{
        const payload = { ...req.body };
        const { patientID, docID, dateTime } = payload;

        const patient = await findPatientByPatientID(patientID)
        if(!patient) {
            return res.send({ error: "patient not found"});
        }

        const doctor = await findDoctorByDocID(docID)
        if(!doctor) {
            return res.send({ error: "doctor not found"})
        }

        delete payload.patientID;
        delete payload.docID;

        payload.patient_id = patient?._id;
        payload.doc_id = doctor?._id;
        const labReport = await LabReportModel.create({... payload})

        const date = new Date(dateTime);
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        console.log("startDate", startDate)

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999)
        console.log("endDate", endDate);

        let history = await findSingleHistoryWithinGivenDates(patient._id, startDate, endDate)
        if(!history) {
            console.log("no history")
            history = new PatientMedicalHistoryModel();
            history.patient_id = patient._id;
            history.dateTime = new Date(dateTime);
        }
        
        history.labReport_id = labReport?._id;
        
        await history.save();
        console.log("updated history", history)
        res.send({ message: "Lab Report Created"})

    }catch(err) {
        console.log(err)
        res.send({ error: "Internal Server Error"})
    }
})

module.exports = router;