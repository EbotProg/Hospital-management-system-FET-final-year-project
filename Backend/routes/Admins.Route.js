const express = require("express");
const { AdminModel } = require("../models/Admin.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { NurseModel } = require("../models/Nurse.model");
const { DoctorModel } = require("../models/Doctor.model");
const { PatientModel } = require("../models/Patient.model");
const bcrypt = require('bcryptjs');
const {generateUserId, generatePassword } = require("../controllers/generatePasswordAndID")
const { findHospitalByName } = require("../controllers/modelControllers/hospital.controller")



const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).send(admins);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const payload = {...req.body}
  try {
    console.log('body', payload)
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      return res.send({
        error: "Admin already exists",
      });
    }
    
   
    
    // let hospitalAbbrev;

    // if(payload.hospitalName) {
    //   const hospital = await findHospitalByName(payload.hospitalName)

    //   if(hospital) {
    //     hospitalAbbrev = hospital.abbrev
    //   }else {
    //     hospitalAbbrev = "WASPITAL"
    //   }

    // }else {
    //   hospitalAbbrev = "WASPITAL"
    // }
    
    const userId = generateUserId("Adm")
    const password = generatePassword(12)

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, async function(err, hash) {
          // Store hash in your password DB.
          console.log("passwordhash", hash)
          let value = new AdminModel(payload);
          value.password = hash;
          value.adminID = userId
          await value.save();
          const data = await AdminModel.findOne({ email });
          data.password = password;
          return res.send({ data, message: "Registered" });
      });
  });
  } catch (error) {
    console.log("err", error)
    res.send({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { adminID, password } = req.body;
  try {
    console.log("admin login==== body", req.body)
    console.log('key', process.env.key)
    const admin = await AdminModel.findOne({ adminID });

    if (admin) {

      bcrypt.compare(password, admin.password).then((val) => {
        // res === true
      console.log('passwordIsCorrect', val);
      if(val == true) {
        const token = jwt.sign({ foo: "bar" }, process.env.key, {
          expiresIn: "24h",
        });
        res.send({ message: "Successful", user: admin, token: token });
      }else {
        res.send({ message: "Wrong credentials" });

      }
    });

      
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log({ message: "Error" });
    console.log(error);
  }
});

router.patch("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  const payload = req.body;
  try {
    const admin = await AdminModel.findByIdAndUpdate({ _id: id }, payload);
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  try {
    const admin = await AdminModel.findByIdAndDelete({ _id: id });
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

router.post("/password", (req, res) => {
  const { email, userId, password, patientId } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'digitalwaspital@gmail.com',
      pass: 'pnkbfjddzymtzfev'
    },
  });

  const mailOptions = {
    from: "DigitalWaspital<digitalwaspital@gmail.com>",
    to: email,
    subject: userId? "Account ID and Password": "Patient ID",
    text: userId? `This is your User Id : ${userId} and  Password : ${password} .`: `Hello, we added you to our patient database\nThis is your id : ${patientId}. You can provide this to the staff in order to get your information faster. Thank you`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send(error);
    }
    return res.send("Password reset email sent");
  });
});

router.post("/forgot", async (req, res) => {
  const { email, type } = req.body;
  let user;
  let userId;
  let password;

  if (type == "nurse") {
    user = await NurseModel.find({ email });
    userId = user[0]?.nurseID;
    password = user[0]?.password;
  }
  if (type == "patient") {
    user = await PatientModel.find({ email });
    userId = user[0]?.nurseID;
    password = user[0]?.password;
  }

  if (type == "admin") {
    user = await AdminModel.find({ email });
    userId = user[0]?.adminID;
    password = user[0]?.password;
  }

  if (type == "doctor") {
    user = await DoctorModel.find({ email });
    userId = user[0]?.docID;
    password = user[0]?.password;
  }

  if (!user) {
    return res.send({ message: "User not found" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'digitalwaspital@gmail.com',
      pass: 'pnkbfjddzymtzfev'
    },
  });

  const mailOptions = {
    from: "DW<digitalwaspital@gmail.com>",
    to: email,
    subject: "Account ID and Password",
    text: `This is your User Id : ${userId} and  Password : ${password} .`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send(error);
    }
    return res.send("Password reset email sent");
  });
});

module.exports = router;
