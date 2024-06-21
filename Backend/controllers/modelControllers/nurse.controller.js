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

module.exports = {
    countAvailableNursesInWard,
    countAllNursesInWard,
    findNurseByNurseID
}