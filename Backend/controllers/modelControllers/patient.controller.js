const { PatientModel } = require("../../models/Patient.model");
const { updateBedAvailability } = require("../modelControllers/bed.controller")


async function assignPatientToWardRoomBed(patient, bed, room, ward, admissionRep) {
    try{

        patient.bedID = bed._id;
        patient.wardID = ward._id;
        patient.roomID = room._id;
        patient.admitted = true;
        patient.currentAdmissionReportID = admissionRep._id
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

async function removePatientFromWardRoomBed(patient, bed, dischargeRep) {
    try{
        
        patient.bedID = null;
        patient.wardID = null;
        patient.roomID = null;
        patient.admitted = false;
        patient.currentDischargeReportID = dischargeRep._id
        const updatedPatient = await patient.save();
        const updatedBed = await updateBedAvailability(true, bed);

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

async function findPatientByID(_id) {
    const patient = await PatientModel.findById(_id)
    return patient;
}

async function findPatientByPatientID(patientID) {
    const patient = await PatientModel.findOne({ patientID });
    return patient;
}

async function countAllPatientsInRoom(roomID) {
    const count = await PatientModel.countDocuments({ roomID });
    return count;
}

async function findPatientsByDocID(docID) {
    const patients = await PatientModel.find({ docID })
    return 
}


async function findPatientsByNurseID(nurseID) {
    const patients = await PatientModel.find({ nurseID })
    return 
}

function checkIfPatientIsFoundInWard(patient, wardID) {
    const value = patient.wardID.equals(wardID);
    return value;
}
function checkIfPatientIsFoundInRoom(patient, roomID) {
    const value = patient.roomID.equals(roomID) ;
    return value;
}
function checkIfPatientIsFoundOnBed(patient, bedID) {
    const value = patient.bedID.equals(bedID);
    return value;
}

module.exports = {
    assignPatientToWardRoomBed,
    findPatientByName,
    countAllPatientsInRoom,
    findPatientByID,
    findPatientByPatientID,
    checkIfPatientIsFoundInWard,
    checkIfPatientIsFoundInRoom,
    checkIfPatientIsFoundOnBed,
    removePatientFromWardRoomBed
}