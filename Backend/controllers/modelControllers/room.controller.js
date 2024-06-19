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



async function updateAvailabilityOfRoom(room) {
    try {

        const patientCount = await countAllPatientsInRoom(room._id);
        const bedCount = await countAllBedsInRoom(room._id);

        if(patientCount === bedCount) {
            room.isAvailable = false;
        }else if(patientCount < bedCount) {
            room.isAvailable = true;
        }
        return await room.save;
    }catch(err) {
        console.log(err);
    }
}

module.exports = {
    countAvailableRoomsInWard,
    countAllRoomsInWard,
    updateAvailabilityOfRoom,
    findRoomByRoomNumberAndWardID
}