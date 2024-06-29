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
    
    let userId;
    let idIsFound = true;
    let i = 1;
    while(idIsFound === true) {
      console.log("idcheck ==== Running id check number", i)
      userId = generateUserId("Adm")
      const value = await AdminModel.findOne({ adminID: userId })
      if(!value) {
        console.log("No admin found with id: ", userId)
        idIsFound = false;
      }else{
        console.log("admin found with id: ", userId);
      }
      i++;
    }

    let password;
    let passwordIsFound = true;
    let j = 1;
    while(passwordIsFound === true) {
      console.log("passwordcheck ==== Running id check number", j)
      password = generatePassword(12)
      const value = await AdminModel.findOne({ password });
      if(!value) {
        console.log("No admin found with : password", password)

        passwordIsFound = false;
      }else{
        console.log("admin found with : password", password);
      }
      j++;
    }

    // const userId = generateUserId("Adm")
    // const password = generatePassword(12)

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
  console.log('req.body', req.body);

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
    console.log("email info", info)
    return res.send("Password reset email sent");
  });
});

router.post("/forgot", async (req, res) => {
  const { email, type } = req.body;
  let user;
  let userId;
  let password;

  try{

    if (type == "nurse") {
      user = await NurseModel.findOne({ email });
  
      if(!user) {
        return res.send({ error: "nurse not found"});
      }
     password = await generateAndCheckNursePass(user);
     
  
      userId = user?.nurseID;
      
    }
    else if (type == "patient") {
      user = await PatientModel.find({ email });
      userId = user[0]?.nurseID;
      password = user[0]?.password;
    }
  
    else if (type == "admin") {
      user = await AdminModel.findOne({ email });
  
      if(!user) {
        return res.send({ error: "nurse not found"});
      }
     password = await generateAndCheckAdminPass(user);
      userId = user?.adminID;
   
    }
  
    else if (type == "doctor") {
      user = await DoctorModel.findOne({ email });
  
      if(!user) {
        return res.send({ error: "nurse not found"});
      }
     password = await generateAndCheckDocPass(user);
      userId = user?.docID;
    }
  
    else if (!user) {
      return res.send({ message: "User not found" });
    }

    
    
      console.log("password before send", password)
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
        subject: "Account ID and Password",
        text: `Hello user ${userId}, this is your new Password : ${password} .`,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.send(error);
        }
        return res.send("Password reset email sent");
      });
    
  
  


  }catch(err) {
    console.log(err);
    res.send({ error: "Internal Server Error"})
  }


});


async function generateAndCheckDocPass(doctor) {
  try{

    let password;
    let passwordIsFound = true;
    let j = 1;
    while(passwordIsFound === true) {
      console.log("passwordcheck ==== Running check number", j)
      password = generatePassword(12)
      const value = await DoctorModel.findOne({ password });
      if(!value) {
        console.log("No doctor found with : password", password)

        passwordIsFound = false;
      }else{
        console.log("nurse doctor with : password", password);
      }
      j++;
    }

    return new Promise((resolve, reject)=>{

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt,function(err, hash) {
            // Store hash in your password DB.
            console.log("passwordhash", hash)
            
            doctor.password = hash
            console.log("password after hash", password)
            doctor.save().then(()=>{
              resolve(password)
            }).catch(err => {
              console.log(err);
              reject(err)
            });
            
            
            // data.docID = userId;
            
        });
    });
    })


  }catch(err) {
    console.log(err);
  }
}
async function generateAndCheckNursePass(nurse) {
  try{

    let password;
    let passwordIsFound = true;
    let j = 1;
    while(passwordIsFound === true) {
      console.log("passwordcheck ==== Running check number", j)
      password = generatePassword(12)
      const value = await NurseModel.findOne({ password });
      if(!value) {
        console.log("No nurse found with : password", password)

        passwordIsFound = false;
      }else{
        console.log("nurse found with : password", password);
      }
      j++;
    }

    return new Promise((resolve, reject)=>{

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt,function(err, hash) {
            // Store hash in your password DB.
            console.log("passwordhash", hash)
            
            nurse.password = hash
            console.log("password after hash", password)
            nurse.save().then(()=>{
              resolve(password)
            }).catch(err => {
              console.log(err);
              reject(err)
            });
            
            
            // data.docID = userId;
            
        });
    });
    })

  }catch(err) {
    console.log(err);
  }
}
async function generateAndCheckAdminPass(admin) {
  try{

    let password;
    let passwordIsFound = true;
    let j = 1;
    while(passwordIsFound === true) {
      console.log("passwordcheck ==== Running check number", j)
      password = generatePassword(12)
      const value = await AdminModel.findOne({ password });
      if(!value) {
        console.log("No admin found with : password", password)

        passwordIsFound = false;
      }else{
        console.log("admin found with : password", password);
      }
      j++;
    }

   
return new Promise((resolve, reject)=>{

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt,function(err, hash) {
        // Store hash in your password DB.
        console.log("passwordhash", hash)
        
        admin.password = hash
        console.log("password after hash", password)
        admin.save().then(()=>{
          resolve(password)
        }).catch(err => {
          console.log(err);
          reject(err)
        });
        
        
        // data.docID = userId;
        
    });
});
})
   

  }catch(err) {
    console.log(err);
  }
}

module.exports = router;
