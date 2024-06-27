const { RoomModel } = require("../../models/Room.model")
const { countAllBedsInRoom } = require("../../controllers/modelControllers/bed.controller")
const { countAllPatientsInRoom } = require("../../controllers/modelControllers/patient.controller")

async function findRoomByRoomNumberAndWardID(roomNumber, wardID) {
    const room = await RoomModel.findOne({ roomNumber, wardID})
    return room;
}

async function countAvailableRoomsInWard (wardID) {
    const count = await RoomModel.countDocuments({ isAvailable: true, wardID})
    return count;
}

async function countAllRoomsInWard (wardID) {
    const count = await RoomModel.countDocuments({ wardID });
    return count;
}

async function getAllRoomsInParticularOrder(wardID) {
    const rooms = await RoomModel.find({ wardID, isAvailable: { $exists: true } }).populate("wardID")
    .sort({ isAvailable: 'desc' }) 
    return rooms;
}



async function updateAvailabilityOfRoom(room) {
    try {
       console.log("update availability of room: room", room)
        const patientCount = await countAllPatientsInRoom(room._id);
        const bedCount = await countAllBedsInRoom(room._id);
        console.log('patientcount, bedcount', patientCount, bedCount)
        if(patientCount === bedCount) {
            room.isAvailable = false;
        }else if(patientCount < bedCount) {
            room.isAvailable = true;
        }
        const res =  await room.save();
        console.log("room after save", res);
        return res;
    }catch(err) {
        console.log(err);
    }
}

async function findRoomByRoomNumber(roomNumber) {
    const room = await RoomModel.findOne({ roomNumber});
    return room;
}

module.exports = {
    countAvailableRoomsInWard,
    countAllRoomsInWard,
    updateAvailabilityOfRoom,
    findRoomByRoomNumberAndWardID,
    findRoomByRoomNumber,
    getAllRoomsInParticularOrder
}