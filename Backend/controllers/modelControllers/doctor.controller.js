const { DoctorModel } = require("../../models/Doctor.model")


async function countAvailableDoctorsInWard (wardID) {
    const count = await DoctorModel.countDocuments({ isAvailable: true, wardID})
    return count;
}

async function countAllDoctorsInWard (wardID) {
    const count = await DoctorModel.countDocuments({ wardID });
    return count;
}


module.exports = {
    countAllDoctorsInWard,
    countAvailableDoctorsInWard
}