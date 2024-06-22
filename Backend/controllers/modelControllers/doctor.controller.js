const { DoctorModel } = require("../../models/Doctor.model")


async function countAvailableDoctorsInWard (wardID) {
    const count = await DoctorModel.countDocuments({ isAvailable: true, wardID})
    return count;
}

async function countAllDoctorsInWard (wardID) {
    const count = await DoctorModel.countDocuments({ wardID });
    return count;
}

async function findDoctorByDocID(docID) {
    const doctor = await DoctorModel.findOne({ docID })
    return doctor;
}


module.exports = {
    countAllDoctorsInWard,
    countAvailableDoctorsInWard,
    findDoctorByDocID
}