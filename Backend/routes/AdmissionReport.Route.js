const express = require("express");
const { AdmissionReportModel } = require("../models/AdmissionReport.model");
const { updatePayload, findAdmissionReportById, findAndUpdatePreviousAdmissionRepByPatientId } = require("../controllers/modelControllers/admissionReport.controller")
const { findPatientByPatientID, assignPatientToWardRoomBed } = require("../controllers/modelControllers/patient.controller")
const { findNurseByNurseID } = require("../controllers/modelControllers/nurse.controller")
const { findWardByName } = require("../controllers/modelControllers/ward.controller")
const { findRoomByRoomNumberAndWardID, updateAvailabilityOfRoom } = require("../controllers/modelControllers/room.controller")
const { findBedByBedNumberRoomIDAndWardID } = require("../controllers/modelControllers/bed.controller")
const { findSingleHistoryWithinGivenDates } = require("../controllers/modelControllers/medHistory.controller")
const { PatientMedicalHistoryModel } = require("../models/PatientMedicalHistory.model")

const router = express.Router();


router.get("/", async (req, res) => {
    try {
      const admissionReports = await AdmissionReportModel.find().populate([
        {
          path: "wardID",
        },
        {
          path: "roomID",
        },
        {
          path: "bedID",
        },
        {
          path: "patientID",
        },
        {
          path: "nurseID",
        },
      ]);
      res.status(200).send(admissionReports);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "Internal Server Error" });
    }
  });


  router.post('/add', async (req, res) =>{
    try{

        let payload = { ... req.body }

        const patient = await findPatientByPatientID(payload.patientID);
        if(!patient) {
            return res.send({ error: "patient not found"})
        }else if(patient && patient.admitted) {
            return res.send({ error: "patient already admitted"})
        }

        const nurse = await findNurseByNurseID(payload.nurseID);
        if(!nurse) {
            return res.send({ error: "Invalid nurse ID"})
        }

        const ward = await findWardByName(payload.wardName)
        if(!ward){
            return res.send({ error: "ward not found"})
        }

        const room = await findRoomByRoomNumberAndWardID(payload.roomNumber, ward._id)
        if(!room) {
            return res.send({error: "room not found"})
        }else if(room && !room.isAvailable) {
            return res.send({error: "room not available"})
        }

        const bed = await findBedByBedNumberRoomIDAndWardID(payload.bedNumber, room._id, ward._id);
        if(!bed) {
            return res.send({error: "bed not found"})
        }else if(bed && !bed.isAvailable) {
            return res.send({error: "bed not available"})

        }

        await findAndUpdatePreviousAdmissionRepByPatientId(patient._id)
        updatePayload(payload, bed, room, ward, patient, nurse);
        const admissionRep = new AdmissionReportModel(payload)
        await admissionRep.save()
        await assignPatientToWardRoomBed(patient, bed, room, ward, admissionRep)
        await updateAvailabilityOfRoom(room)
  
        ///////////
        const date = new Date(payload.dateTime);
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
            history.dateTime = payload.dateTime
        }
        
        history.admissionRep_id = admissionRep?._id;
        await history.save();
        console.log("updated history", history)
        ////////////////

        return res.status(200).send({message: "patient admitted"})
    }catch(err) {
        console.log(err);
        res.send({ error: "Internal Server Error"})
    }
  })

  router.get("/:id", async (req, res)=> {
    try{
  
      const id = req.params.id;
  console.log('id', id)
      const admissionReport = await findAdmissionReportById(id);
      console.log('admissionReport', admissionReport);
      if(!admissionReport) {
        res.send({ error: "admissionReport not found"});
      }
      res.send({ message: "admissionReport found", admissionReport});
  
    }catch(err) {
      console.log(err);
      res.send({ error: "Internal Server Error"})
    }
  })

  

  module.exports = router;