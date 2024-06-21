const express = require("express");
const { AdmissionReportModel } = require("../models/AdmissionReport.model");
const { updatePayload } = require("../controllers/modelControllers/admissionReport.controller")
const { findPatientByPatientID, assignPatientToWardRoomBed } = require("../controllers/modelControllers/patient.controller")
const { findNurseByNurseID } = require("../controllers/modelControllers/nurse.controller")
const { findWardByName } = require("../controllers/modelControllers/ward.controller")
const { findRoomByRoomNumberAndWardID, updateAvailabilityOfRoom } = require("../controllers/modelControllers/room.controller")
const { findBedByBedNumberRoomIDAndWardID } = require("../controllers/modelControllers/bed.controller")
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


        updatePayload(payload, bed, room, ward, patient, nurse);
        const admissionRep = new AdmissionReportModel(payload)
        await admissionRep.save()
        await assignPatientToWardRoomBed(patient, bed, room, ward)
        await updateAvailabilityOfRoom(room)
        return res.status(200).send({message: "patient admitted"})
    }catch(err) {
        console.log(err);
        res.send({ error: "Internal Server Error"})
    }
  })

  

  module.exports = router;