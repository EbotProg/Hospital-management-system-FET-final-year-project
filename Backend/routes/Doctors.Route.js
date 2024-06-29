const express = require("express");
const { DoctorModel } = require("../models/Doctor.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { findWardByName } = require("../controllers/modelControllers/ward.controller")
const { findHospitalByName } = require("../controllers/modelControllers/hospital.controller")
const { getAllDoctorsInParticularOrder, updateDoctorAvailability, findDoctorByDoc_Id } = require("../controllers/modelControllers/doctor.controller")
const nodemailer = require("nodemailer");
const {generateUserId, generatePassword } = require("../controllers/generatePasswordAndID")


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const doctors = await DoctorModel.find().populate("wardID");
    res.status(200).send(doctors);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.get('/findDoctorsInWard/:wardId', async (req, res)=> {
  try{

    const { wardId } = req.params
    const doctors = await getAllDoctorsInParticularOrder(wardId);
    res.send({ message: "fetched ward doctors", doctors});

  }catch(err) {
    console.log(err);
    res.send({ error: "Internal Server Error"})
  }
})

router.post("/toggleAvailability/:id", async (req, res) => {
  try{

    const { id } = req.params;
    const doctor = await findDoctorByDoc_Id(id)
    if(!doctor) {
      res.send({ error: "doctor not found"})
    }

    await updateDoctorAvailability(doctor);
    res.send({ message: "doctor availability updated", doctor})

  }catch(err) {
    console.log(err);
    res.send({ error: "Internal Server Error"})
  }
})

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const payload = { ...req.body}
  try {
    const doctor = await DoctorModel.findOne({ email });
    if (doctor) {
      return res.send({
        error: "Doctor already exists",
      });
    }

       /****check ward */
//if the change made is a ward 
if(payload.wardName) {
  console.log('payload has ward info')

  const ward = await findWardByName(payload.wardName)
  if(!ward) {
    console.log('no ward was found with the name given')

    return  res.send({ error: "ward not found"})
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

    let userId;
    let idIsFound = true;
    let i = 1;
    while(idIsFound === true) {
      console.log("idcheck ==== Running id check number", i)
      userId = generateUserId("Doc")
      const value = await DoctorModel.findOne({ docID: userId })
      if(!value) {
        console.log("No doctor found with id: ", userId)
        idIsFound = false;
      }else{
        console.log("doctor found with id: ", userId);
      }
      i++;
    }

    let password;
    let passwordIsFound = true;
    let j = 1;
    while(passwordIsFound === true) {
      console.log("passwordcheck ==== Running id check number", j)
      password = generatePassword(12)
      const value = await DoctorModel.findOne({ password });
      if(!value) {
        console.log("No doctor found with : password", password)

        passwordIsFound = false;
      }else{
        console.log("doctor found with : password", password);
      }
      j++;
    }
    
    // const userId = generateUserId("Doc")
    // const password = generatePassword(12)

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, async function(err, hash) {
          // Store hash in your password DB.
          console.log("passwordhash", hash)
          let value = new DoctorModel(payload);
          value.password = hash
          value.docID = userId
          await value.save();
          const data = await DoctorModel.findOne({ email });
          data.password = password;
          // data.docID = userId;
          return res.send({ data, message: "Registered" });
      });
  });

    
  } catch (error) {
    res.send({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { docID, password } = req.body;
  try {
    const doctor = await DoctorModel.findOne({ docID });

    if (doctor) {

      bcrypt.compare(password, doctor.password).then((val) => {
        // res === true
      console.log('passwordIsCorrect', val);
      if(val == true) {
        const token = jwt.sign({ foo: "bar" }, process.env.key, {
          expiresIn: "24h",
        });
        res.send({ message: "Successful", user: doctor, token: token });
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

router.patch("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  const payload = {...req.body};
  console.log('patch doctor: id payload', id, payload)

  try {

    //if the change made is a ward 
    if(payload.wardName) {
      console.log('payload has ward info')

      const docWard = await findWardByName(payload.wardName)
      if(!docWard) {
        console.log('no ward was found with the name given')

        return  res.status(404).send({ error: "ward not found"})
      }else {
        console.log('deleted wardName property from payload')

        delete payload.wardName
        payload.wardID = docWard._id;
        console.log('patch doctor: payload', payload)

      }
    }

    await DoctorModel.findByIdAndUpdate({ _id: id }, payload);
    const doctor = await DoctorModel.findById(id);
    console.log('checking doctor')

    if (!doctor) {
      console.log('no doctor found')

      return res
        .status(404)
        .send({ message: `Doctor with id ${id} not found` });
    }
    console.log('doctor found')

    res.status(200).send({ message: `Doctor Updated`, user: doctor });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  try {
    const doctor = await DoctorModel.findByIdAndDelete({ _id: id });
    if (!doctor) {
      res.status(404).send({ msg: `Doctor with id ${id} not found` });
    }
    res.status(200).send(`Doctor with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});



module.exports = router;
