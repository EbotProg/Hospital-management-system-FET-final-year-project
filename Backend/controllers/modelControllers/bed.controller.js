const { BedModel } = require("../../models/Bed.model");

async function findBedByBedNumberRoomIDAndWardID(bedNumber, roomID, wardID) {
try{
    const bed = await BedModel.findOne({ bedNumber, roomID, wardID });
    return bed;
}catch(err) {
    console.log(err);
}
 
}


async function updateBedAvailability(isAvailable, bed) {
    bed.isAvailable = isAvailable;
    return await bed.save();
    
}

async function countAvailableBedsInWard (wardID) {
    const count = await BedModel.countDocuments({ isAvailable: true, wardID})
    return count;
}

async function countAllBedsInWard (wardID) {
    const count = await BedModel.countDocuments({ wardID });
    return count;
}

async function countAllBedsInRoom(roomID) {
    const count = await BedModel.countDocuments({ roomID });
    return count;
}

module.exports = {
    countAllBedsInWard,
    countAvailableBedsInWard,
    updateBedAvailability,
    countAllBedsInRoom,
    findBedByBedNumberRoomIDAndWardID
}