const { PatientModel } = require("../../models/Patient.model");
const { updateBedAvailability } = require("../modelControllers/bed.controller")


async function assignPatientToWardRoomBed(patient, bed, room, ward) {
    try{

        patient.bedID = bed._id;
        patient.wardID = ward._id;
        patient.roomID = room._id;
        const updatedPatient = await patient.save();
        const updatedBed = await updateBedAvailability(false, bed);

        return { 
            patient: updatedPatient,
            bed: updatedBed
        }
    }catch(err) {
        console.log(err);
    }
}

async function findPatientByName(name) {
    const patient = await PatientModel.findOne({ patientName: name})
    return patient;
}

async function countAllPatientsInRoom(roomID) {
    const count = await PatientModel.countDocuments({ roomID });
    return count;
}

module.exports = {
    assignPatientToWardRoomBed,
    findPatientByName,
    countAllPatientsInRoom
}