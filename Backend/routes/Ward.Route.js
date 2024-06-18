const express = require("express");
const { WardModel } = require("../models/Ward.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const Wards = await WardModel.find();
    res.status(200).send(Wards);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Failed to fetch all wards" });
  }
});

router.post("/add", async (req, res)=> {
    try{
        console.log("entered add route for routes")
        const { wardName } = req.body;

        console.log("entered add route for routes", wardName)

        const wardNameStr = wardName.toUpperCase();
        let ward = await WardModel.findOne({ wardName: wardNameStr })
        console.log("entered add route for routes", ward)

        if(ward) {
            console.log("ward exists")

            res.send({ message: "Ward Already Exists"})
        } else {
            console.log("ward does not exist")

            ward = new WardModel({ wardName: wardNameStr })
            console.log("entered add route for routes", ward)
            await ward.save();
            console.log("ward saved")

            res.status(200).send({ message: "Ward created successfully", ward})
        }


    } catch(err) {
        console.log('failed to add ward',err)
        res.status(400).send({error: "Unable to create ward"})
    }
})

router.delete("/:wardId", async (req, res)=> {
  try{
    const id = req.params.wardId;

    const ward = await WardModel.findByIdAndDelete({ _id: id });
    if (!ward) {
      res.status(404).send({ message: `ward not found` });
    }else {
      res.status(200).send({ message: `ward has been deleted`});

    }

  }catch(err) {
    res.status(400).send({ error: "Failed to delete ward"})
  }
})

// router.patch("/:wardName", async (req, res) => {
//     const wardName = req.params.wardName;
//     const payload = req.body;
//     try {
//       const bed = await BedModel.findByIdAndUpdate({ _id: id }, payload);
//       if (!bed) {
//         return res.status(404).send({ msg: `Bed with id ${id} not found` });
//       }
//       return res.status(200).send(`Bed with id ${id} updated`);
//     } catch (error) {
//       console.log(error);
//       res.status(400).send({ error });
//     }
//   });


module.exports = router;