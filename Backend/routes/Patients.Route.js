const express = require("express");
const { PatientModel } = require("../models/Patient.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { ReportModel } = require("../models/Report.model");
const bcrypt = require('bcryptjs');
const { generateUserId } = require("../controllers/generatePasswordAndID")
const { findPatientByID } = require("../controllers/modelControllers/patient.controller")

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const patients = await PatientModel.find();
    res.status(200).send({ patients });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// This register route will be used when adding a patient via patient or doctor or admin
router.post("/add", async (req, res) => {
  const { email } = req.body;
  try {
    let patient = await PatientModel.findOne({ email });
    if (patient) {
      return res.send({
        error: "Patient already exists"
      });
    }

    const patientId = generateUserId("Pt")
    const payload = { ...req.body }
    payload.patientID = patientId;
    patient = new PatientModel(payload)
    await patient.save();
    res.status(200).send({ message: "Patient Added", patient})
    

    
  } catch (error) {
    console.log(error)
    res.send({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res)=> {
  try{

    const id = req.params.id;
console.log('id', id)
    const patient = await findPatientByID(id);
    console.log('patient', patient);
    if(!patient) {
      res.send({ error: "patient not found"});
    }
    res.send({ message: "patient found", patient});

  }catch(err) {
    console.log(err);
    res.send({ error: "Internal Server Error"})
  }
})

// // This register route will be used when adding a patient via patient or doctor or admin
// router.post("/register", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const patient = await PatientModel.findOne({ email });
//     if (patient) {
//       return res.send({
//         message: "Patient already exists",
//         id: patient.patientID,
//       });
//     }

//     bcrypt.genSalt(10, function(err, salt) {
//       bcrypt.hash(req.body.password, salt, async function(err, hash) {
//           // Store hash in your password DB.
//           console.log("passwordhash", hash)
//           const newPatient = new PatientModel(req.body);
//           newPatient.password = hash;
//           await newPatient.save();
//           res.send({ id: newPatient.patientID });
//       });
//   });

    
//   } catch (error) {
//     res.send({ error });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { patientID, password } = req.body;
//   try {
//     const patient = await PatientModel.findOnpmne({ patientID });

//     if (patient) {

//       bcrypt.compare(password, patient.password).then(async (val) => {
//         // res === true
//       console.log('passwordIsCorrect', val);
//       if(val == true) {

//         const token = jwt.sign({ foo: "bar" }, process.env.key, {
//           expiresIn: "24h",
//         });
//         let email = patient.email;
//         let report = await ReportModel.find({ email });
//         res.send({
//           message: "Login Successful.",
//           user: patient,
//           token: token,
//           report,
//         });

//       }else {
//         res.send({ message: "Wrong credentials, Please try again." });

//       }
//     });

      
//     } else {
//       res.send({ message: "Wrong credentials, Please try again." });
//     }
//   } catch (error) {
//     console.log({ message: "Error occurred, unable to Login." });
//     console.log(error);
//   }
// });

// Only Admin should be able to update or delete patient
router.patch("/:patientId", async (req, res) => {
  const id = req.params.patientId;
  const payload = req.body;
  try {
    const patient = await PatientModel.findByIdAndUpdate({ _id: id }, payload);
    if (!patient) {
      res.status(404).send({ error: `Patient not found` });
    }
    res.status(200).send({ message: "Patient Updated"});
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Internal Server Error" });
  }
});

router.delete("/:patientId", async (req, res) => {
  const id = req.params.patientId;
  try {
    const patient = await PatientModel.findByIdAndDelete({ _id: id });
    if (!patient) {
      res.status(404).send({ error : `Patient not found` });
    }
    res.status(200).send({ message: "Patient deleted"});
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
