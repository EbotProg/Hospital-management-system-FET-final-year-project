const express = require("express");
const { NurseModel } = require("../models/Nurse.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { generateReportPdf } = require("../controllers/generateReport")
const { findWardByName } = require("../controllers/modelControllers/ward.controller")
const { getAllNursesInParticularOrder } = require("../controllers/modelControllers/nurse.controller")
const {generateUserId, generatePassword } = require("../controllers/generatePasswordAndID")
const nodemailer = require("nodemailer");


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const nurses = await NurseModel.find().populate("wardID");
    res.status(200).send(nurses);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});


router.get('/findNursesInWard/:wardId', async (req, res)=> {
  try{

    const { wardId } = req.params
    const nurses = await getAllNursesInParticularOrder(wardId);
    res.send({ message: "fetched ward nurses", nurses});

  }catch(err) {
    console.log(err);
    res.send({ error: "Internal Server Error"})
  }
})


router.post("/register", async (req, res) => {
  let successMsg = ''
  const { email } = req.body;
  const payload = {...req.body}
  try {
    const nurse = await NurseModel.findOne({ email });
    if (nurse) {
      return res.send({
        message: "Nurse already exists",
      });
    }

    /****check ward */
//if the change made is a ward 
if(payload.wardName) {
  console.log('payload has ward info')

  const ward = await findWardByName(payload.wardName)
  if(!ward) {
    console.log('no ward was found with the name given')

    return  res.send({ message: "ward not found"})
  }else {
    console.log('deleted wardName property from payload')

    delete payload.wardName
    payload.wardID = ward._id;
    console.log('patch doctor: payload', payload)

  }
}
    /*************** */
    
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
    
    const userId = generateUserId("Nrs")
    const password = generatePassword(12)

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, async function(err, hash) {
          // Store hash in your password DB.
          console.log("passwordhash", hash)
          let value = new NurseModel(payload);
          value.password = hash;
          value.nurseID = userId
          await value.save();
          const data = await NurseModel.findOne({ email });

            /////////////////////////////////send email
            // const transporter = nodemailer.createTransport({
            //   service: "gmail",
            //   auth: {
            //     user: 'digitalwaspital@gmail.com',
            //     pass: 'pnkbfjddzymtzfev'
            //   },
            // });
          
            // const mailOptions = {
            //   from: "DW<digitalwaspital@gmail.com>",
            //   to: email,
            //   subject: "Account ID and Password",
            //   text: `This is your User Id : ${userId} and  Password : ${password} .`,
            // };
          
            // transporter.sendMail(mailOptions, (error, info) => {
            //   if (error) {
            //     return  res.send({ message: "could not send email"})
            //   }
            //   //  res.send({message: "An email has been sent to the nurse"});
            //   // successMsg = successMsg + "Account Details sent"
            //   console.log("info", info)
            // });
            /////////////////////////////////////////////
            data.password = password;
            data.nurseID = userId;
            return res.send({ data, message: "Registered" });
      });
  });

  } catch (error) {
    res.send({ message: "Internal server error" });
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
  const payload = {...req.body};
  try {

    //if the change made is a ward 
    if(payload.wardName) {
      console.log('payload has ward info')

      const ward = await findWardByName(payload.wardName)
      if(!ward) {
        console.log('no ward was found with the name given')

        return  res.status(404).send({ error: "ward not found"})
      }else {
        console.log('deleted wardName property from payload')

        delete payload.wardName
        payload.wardID = ward._id;
        console.log('patch doctor: payload', payload)

      }
    }

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
