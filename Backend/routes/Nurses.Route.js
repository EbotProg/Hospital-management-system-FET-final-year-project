const express = require("express");
const { NurseModel } = require("../models/Nurse.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { generateReportPdf } = require("../controllers/generateReport")

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const nurses = await NurseModel.find();
    res.status(200).send(nurses);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});


router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const nurse = await NurseModel.findOne({ email });
    if (nurse) {
      return res.send({
        message: "Nurse already exists",
      });
    }
    

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, async function(err, hash) {
          // Store hash in your password DB.
          console.log("passwordhash", hash)
          let value = new NurseModel(req.body);
          value.password = hash;
          await value.save();
          const data = await NurseModel.findOne({ email });
          return res.send({ data, message: "Registered" });
      });
  });

  } catch (error) {
    res.send({ message: "error" });
  }
});


router.post("/login", async (req, res) => {
  const { nurseID, password } = req.body;
  try {
    console.log('req.body', req.body)
    const nurse = await NurseModel.findOne({ nurseID });

    

    if (nurse) {

      bcrypt.compare(password, nurse.password).then((val) => {
        // res === true
      console.log('passwordIsCorrect', val);
      if(val == true) {
        const token = jwt.sign({ foo: "bar" }, process.env.key, {
          expiresIn: "24h",
        });
        res.send({ message: "Successful", user: nurse, token: token });
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

router.patch("/:nurseId", async (req, res) => {
  const id = req.params.nurseId;
  const payload = req.body;
  try {
    await NurseModel.findByIdAndUpdate({ _id: id }, payload);
    const nurse = await NurseModel.findById(id);
    if (!nurse) {
      return res.status(404).send({ message: `Nurse with id ${id} not found` });
    }
    res.status(200).send({ message: `Nurse Updated`, user: nurse });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:nurseId", async (req, res) => {
  const id = req.params.nurseId;
  try {
    const nurse = await NurseModel.findByIdAndDelete({ _id: id });
    if (!nurse) {
      res.status(404).send({ msg: `Nurse with id ${id} not found` });
    }
    res.status(200).send(`Nurse with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});


router.post("/generatePdf", async (req, res) => {

  try{
    const headers = ["Field1", "Field2", "Field3", "Field4", "Field5", "Field6", "Field7", "Field8", "Field9", "Field10"]
    const rows = [
      ["value1", "value2", "Field3", "value4", "value5", "value6", "value7", "value8", "value9", "value10"],
      ["value1", "value2", "Field3", "value4", "value5", "value6", "value7", "value8", "value9", "value10"],
      ["value1", "value2", "Field3", "value4", "value5", "value6", "value7", "value8", "value9", "value10"],
      ["value1", "value2", "Field3", "value4", "value5", "value6", "value7", "value8", "value9", "value10"],
      ["value1", "value2", "Field3", "value4", "value5", "value6", "value7", "value8", "value9", "value10"]
    ]
    const patient = {
      name: "Achale Ebot",
      address: "Bokwai"
    }

    const hospital = {
      name: "Buea General Hospital",
      address: "Buea"
    }

    const startDate = new Date("2024-01-01");
    const endDate = new Date();
    generateReportPdf(headers, rows, patient, hospital, startDate, endDate)
    res.end();
  }catch(err) {
    console.log(err)
    res.status(400).send({ error: "Something went wrong, unable to generatePdf"})
  }
})

module.exports = router;
