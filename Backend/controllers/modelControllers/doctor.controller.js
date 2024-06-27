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

async function findDoctorByDoc_Id(_id) {
    const doctor = await DoctorModel.findOne({_id});
    return doctor;
}

async function updateDoctorAvailability(doctor) {
    // const doctor = await DoctorModel.updateOne({ _id }, {$set: { isAvailable: value}});
    doctor.isAvailable = !doctor?.isAvailable
    const updatedDoc = await doctor.save()
    return updatedDoc;
}

async function getAllDoctorsInParticularOrder(wardID) {
    const doctors = await DoctorModel.find({ wardID, isAvailable: { $exists: true } }).populate("wardID")
    .sort({ isAvailable: 'desc' }) 
    return doctors;
}


module.exports = {
    countAllDoctorsInWard,
    countAvailableDoctorsInWard,
    findDoctorByDocID,
    findDoctorByDoc_Id,
    getAllDoctorsInParticularOrder,
    updateDoctorAvailability
}