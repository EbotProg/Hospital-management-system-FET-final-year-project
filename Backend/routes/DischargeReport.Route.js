const express = require("express");
const { DischargeReportModel } = require("../models/DischargeReport.model");
const { updatePayload, addDischargeReportIdToAdmissionReport } = require("../controllers/modelControllers/admissionReport.controller")
const { 
  findPatientByPatientID, 
  assignPatientToWardRoomBed, 
  checkIfPatientIsFoundInWard,
  checkIfPatientIsFoundOnBed,
  checkIfPatientIsFoundInRoom,
  removePatientFromWardRoomBed
 } = require("../controllers/modelControllers/patient.controller")
const { findNurseByNurseID } = require("../controllers/modelControllers/nurse.controller")
const { findWardByName } = require("../controllers/modelControllers/ward.controller")
const { findRoomByRoomNumberAndWardID, updateAvailabilityOfRoom } = require("../controllers/modelControllers/room.controller")
const { findBedByBedNumberRoomIDAndWardID } = require("../controllers/modelControllers/bed.controller")
const router = express.Router();


router.get("/", async (req, res) => {
    try {
      const dischargeReports = await DischargeReportModel.find().populate([
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
      res.status(200).send(dischargeReports);
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
        }else if(patient && !patient.admitted) {
            return res.send({ error: "patient already discharged"})
        }

        const nurse = await findNurseByNurseID(payload.nurseID);
        if(!nurse) {
            return res.send({ error: "Invalid nurse ID"})
        }

        const ward = await findWardByName(payload.wardName)
        if(!ward){
            return res.send({ error: "ward not found"})
        }else if(ward) {
            const patientIsFoundInWard = checkIfPatientIsFoundInWard(patient, ward._id)
             console.log("patient, wardId", patient, ward._id)
            if(!patientIsFoundInWard) {
              return res.send({error: "patient not found in ward"})
            }
        }

        const room = await findRoomByRoomNumberAndWardID(payload.roomNumber, ward._id)
        if(!room) {
            return res.send({error: "room not found"})
        }else if(room) {
            const patientIsFoundInRoom = checkIfPatientIsFoundInRoom(patient, room._id)
            if(!patientIsFoundInRoom) {
              return res.send({error: "patient not found in room"})

            }
        }

        const bed = await findBedByBedNumberRoomIDAndWardID(payload.bedNumber, room._id, ward._id);
        if(!bed) {
            return res.send({error: "bed not found"})
        }else if(bed) {
          const patientIsFoundOnBed = checkIfPatientIsFoundOnBed(patient, bed._id)
          if(!patientIsFoundOnBed) {
            return res.send({error: "patient not found on bed"})

          }

        }

        
        updatePayload(payload, bed, room, ward, patient, nurse);
        const dischargeRep = new DischargeReportModel(payload)
        await dischargeRep.save()
        await addDischargeReportIdToAdmissionReport(dischargeRep._id)
        await removePatientFromWardRoomBed(patient, bed, dischargeRep)
        await updateAvailabilityOfRoom(room)
        return res.status(200).send({message: "patient discharged"})
    }catch(err) {
        console.log(err);
        res.send({ error: "Internal Server Error"})
    }
  })

  

  module.exports = router;