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

function findPatientsByRoom_Id(roomID) {
    const patients = PatientModel.find({ roomID })
    .populate("patientID")
    .populate("wardID")
    .populate("roomID")
    .populate("bedID");
    return patients;
}
function findPatientsByWard_Id(wardID) {
    const patients = PatientModel.find({ wardID })
    .populate("patientID")
    .populate("wardID")
    .populate("roomID")
    .populate("bedID");
    return patients;
}
function findPatientsByBed_Id(bedID) {
    const patients = PatientModel.find({ bedID })
    .populate("patientID")
    .populate("wardID")
    .populate("roomID")
    .populate("bedID");
    // .populate(
    //     {
    //         path: "patientID"
    //     },
    //     {
    //         path: "wardID",
    //     },
    //     {
    //         path: "roomID"
    //     },
    //     {
    //         path: "bedID"
    //     }
    // );
    return patients;
}
function findPatientsByPatient_Id(_id) {
    const patients = PatientModel.find({ _id })
    .populate("patientID")
    .populate("wardID")
    .populate("roomID")
    .populate("bedID");
    return patients;
}

function findPatientsByPatientName(patientName) {
    const patients = PatientModel.find({ "fullName": { "$regex": patientName, "$options": "i" } })
    .populate("patientID")
    .populate("wardID")
    .populate("roomID")
    .populate("bedID");
    return patients;
}


module.exports = {
    findPatientsByRoom_Id,
    findPatientsByWard_Id,
    findPatientsByBed_Id,
    findPatientsByPatient_Id,
    assignPatientToWardRoomBed,
    findPatientByName,
    countAllPatientsInRoom,
    findPatientByID,
    findPatientByPatientID,
    checkIfPatientIsFoundInWard,
    checkIfPatientIsFoundInRoom,
    checkIfPatientIsFoundOnBed,
    removePatientFromWardRoomBed,
    findPatientsByPatientName
}