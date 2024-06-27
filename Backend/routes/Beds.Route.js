const express = require("express");
const { BedModel } = require("../models/Bed.model");
const {
  findBedByBedNumberRoomIDAndWardID,
  getAllBedsInParticularOrder
 } = require("../controllers/modelControllers/bed.controller")

 const {
  findWardByName
 } = require("../controllers/modelControllers/ward.controller")
 
 const {
  findRoomByRoomNumberAndWardID,
  updateAvailabilityOfRoom
 } = require("../controllers/modelControllers/room.controller")

const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const beds = await BedModel.find().populate([
//       {
//         path: "patientID",
//         populate: {
//           path: "docID",
//         },
//       },
//       {
//         path: "patientID",
//         populate: {
//           path: "nurseID",
//         },
//       },
//     ]);
//     res.status(200).send(beds);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const beds = await BedModel.find().populate([
      {
        path: "wardID",
      },
      {
        path: "roomID",
      },
    ]);
    res.status(200).send(beds);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Internal Server Error" });
  }
});

// router.post("/single", async (req, res) => {
//   const { bedNumber, roomNumber } = req.body;
//   try {
//     const bed = await BedModel.find({ bedNumber, roomNumber });
//     if (bed.length === 0) {
//       return res.send({ message: "Bed not found" });
//     }
//     if (bed[0].occupied === "available") {
//       return res.send({ message: "Available", id: bed[0]._id });
//     }
//     return res.send({ message: "Occupied" });
//   } catch (error) {
//     res.send({ message: "No Bed", error });
//   }
// });

router.get('/findBedsInWard/:wardId', async (req, res)=> {
  try{

    const { wardId } = req.params
    const beds = await getAllBedsInParticularOrder(wardId);
    res.send({ message: "fetched ward beds", beds});

  }catch(err) {
    console.log(err);
    res.send({ error: "Internal Server Error"})
  }
})

router.post("/add", async (req, res) => {
  const { bedNumber, roomNumber, wardName } = req.body;

  try {


    const ward = await findWardByName(wardName);
    if(!ward) {
      return res.send({ error: "ward not found"})
    }

    const room = await findRoomByRoomNumberAndWardID(roomNumber, ward._id);
    if(!room) {
      return res.send({ error: "room not found"});
    }

    const bed = await findBedByBedNumberRoomIDAndWardID(bedNumber, room._id, ward._id)
    if (bed) {
      return res.send({ error: "Bed already present" });
    } else {
      const bed = new BedModel({ bedNumber, roomID: room._id, wardID: ward._id});
      await bed.save();
      await updateAvailabilityOfRoom(room)
      return res.send({ message: "Bed added successfully", bed });
    }
  } catch (error) {
    res.send({error: "Internal Server Error"});
    console.log(error);
  }
});

router.patch("/:bedId", async (req, res) => {
  const id = req.params.bedId;
  const payload = {...req.body};
  try {

    let ward, room;
    if(payload.wardName) {
      ward = await findWardByName(payload.wardName);
      if(!ward) {
        return res.send({ error: "ward not found"})
      }
    }
     
    if(payload.roomNumber) {
      room = await findRoomByRoomNumberAndWardID(payload.roomNumber, ward._id);
      if(!room) {
        return res.send({ error: "room not found"});
      }
    }
     

    const bed = await BedModel.findByIdAndUpdate({ _id: id }, payload);
    if (!bed) {
      return res.status(404).send({ error: `Bed not found` });
    }
    return res.status(200).send({ message: "Bed Updated"});
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Internal Server Error" });
  }
});

router.put("/discharge", async (req, res) => {
  const { _id } = req.body;
  try {
    const bed = BedModel.findById(_id);
    if (!bed) {
      return res.status(404).send({ message: `Bed not found` });
    }
    await BedModel.findByIdAndUpdate({ _id }, req.body);
    await BedModel.updateOne({ _id }, { $unset: { patientID: 1 } });
    const updatedBed = await BedModel.findById(_id);
    return res.status(200).send({ message: "Bed updated", bed: updatedBed });
  } catch (error) {
    res.send({ message: error });
  }

  // res.send({ message: "Successful" });
});

router.delete("/:bedId", async (req, res) => {
  const id = req.params.bedId;
  try {
    const bed = await BedModel.findByIdAndDelete({ _id: id });
    if (!bed) {
      res.status(404).send({ error: `Bed not found` });
    }
    res.status(200).send({message: `Bed deleted`});
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
