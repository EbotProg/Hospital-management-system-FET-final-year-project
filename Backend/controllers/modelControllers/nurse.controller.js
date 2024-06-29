const { NurseModel } = require("../../models/Nurse.model")


async function countAvailableNursesInWard (wardID) {
    const count = await NurseModel.countDocuments({ isAvailable: true, wardID})
    return count;
}

async function countAllNursesInWard (wardID) {
    const count = await NurseModel.countDocuments({ wardID });
    return count;
}

async function findNurseByNurseID(nurseID) {
    const nurse = await NurseModel.findOne({nurseID});
    return nurse;
}

async function findNurseByNurseId(_id) {
    const nurse = await NurseModel.findOne({_id});
    return nurse;
}

async function getAllNursesInParticularOrder(wardID) {
    const nurses = await NurseModel.find({ wardID, isAvailable: { $exists: true } }).populate("wardID")
    .sort({ isAvailable: 'desc' }) 
    return nurses;
}

async function updateNurseAvailability(nurse) {
    // const doctor = await DoctorModel.updateOne({ _id }, {$set: { isAvailable: value}});
    nurse.isAvailable = !nurse?.isAvailable
    const updatedNurse = await nurse.save()
    return updatedNurse;
}

module.exports = {
    countAvailableNursesInWard,
    countAllNursesInWard,
    findNurseByNurseID,
    getAllNursesInParticularOrder,
    updateNurseAvailability,
    findNurseByNurseId
}