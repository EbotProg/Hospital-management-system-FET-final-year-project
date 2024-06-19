const express = require("express");
const { RoomModel } = require("../models/Room.model");
const { checkIfWardExistAndUpdatePayload } = require("../controllers/modelControllers/ward.controller")

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rooms = await RoomModel.find().populate("wardID");
    res.status(200).send(rooms);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Internal Server Error" });
  }
});

router.post("/add", async (req, res)=> {
    try{
        console.log("entered add route for rooms")
        const body = {...req.body};

        const payload = await checkIfWardExistAndUpdatePayload(body)
        if(!payload) {
                return res.send({error: "ward not found"})
        } 

        let room = await RoomModel.findOne({ roomNumber: payload.roomNumber, wardID: payload.wardID })

        if(room) {
            console.log("room exists")

            res.send({ error: "Room Already Exists"})
        } else {
            console.log("room does not exist")


            
            room = new RoomModel(payload)
            await room.save();
            console.log("room saved")

            res.status(200).send({ message: "Room created successfully", room})
        }


    } catch(err) {
        console.log('failed to add room',err)
        res.status(400).send({error: "Internal Server Error"})
    }
})


router.delete("/:roomId", async (req, res)=> {
    try{
      const id = req.params.roomId;
  
      const room = await RoomModel.findByIdAndDelete({ _id: id });
      if (!room) {
        res.status(404).send({ error: `room not found` });
      }else {
        res.status(200).send({ message: `room has been deleted`});
  
      }
  
    }catch(err) {
      res.status(400).send({ error: "Internal Server Error"})
    }
  })

  module.exports = router;