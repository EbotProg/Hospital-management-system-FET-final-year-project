const express = require("express");
const { PatientMedicalHistoryModel } = require("../models/PatientMedicalHistory.model")
const { findPatientByPatientID } = require("../controllers/modelControllers/patient.controller")
const { findHistoryWithinGivenDates } = require("../controllers/modelControllers/medHistory.controller")
const { getHeaders, getRows } = require("../controllers/modelControllers/medHistory.controller")
const { generateReportPdf } = require("../controllers/generateReport")
const path = require("path")

const router = express.Router();


router.get("/", async (req, res) => {
  try{

    const medicalHistory = await PatientMedicalHistoryModel.find()
    .populate("patient_id")
    .populate("prescription_id")
    .populate("consultation_id")
    .populate("admissionRep_id")
    .populate("dischargeRep_id")
    .populate("labReport_id")

    res.send({
      message: "fetched medical history",
      medicalHistory
    })

  }catch(err) {
    console.log(err);
    res.send({ error: "Internal Server Error"})
  }
})

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


  router.post("/downloadRep", async (req, res)=> {
    try{

        const payload = { ...req.body }
        console.log("payload", payload);
        const patient = await findPatientByPatientID(payload.patientID)
        if(!patient) {
            return res.send({ error: "patient not found"})
        }

        const hospital = {
            name: "Buea General Hospital",
            address: "Buea"
          }
        const headers = getHeaders();
        const medHistory = await findHistoryWithinGivenDates(patient._id, payload.startDate, payload.endDate)

        const rows = getRows(medHistory);

        const pdfName = await generateReportPdf(headers, rows, patient, hospital, payload.startDate, payload.endDate)

        // const filePath = `${__dirname}/../pdfs/${pdfName}.pdf`;
const filePath = `${path.join(__dirname, `/../pdfs/${pdfName}.pdf`)}`       
 console.log("filepath", filePath);
//  setTimeout(()=> {
res.download(filePath, (err) => {
            if (err) {
              console.error(err);
              return res.send({ error: 'Error downloading file' });
            } else {
                // return res.send({ message: "Pdf Downloaded"});
                console.log("pdf downloaded")
                
            }
          });
//  }, 5000)
        



// res.end();
    }catch(err){
        console.log(err);
        res.send({
            error: "Internal Server Error"
        })
    }
  })


  module.exports = router;