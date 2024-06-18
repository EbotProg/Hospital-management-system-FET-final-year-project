const { HospitalModel } = require("../../models/Hospital.model")
const {
    countAllDoctorsInWard,
    countAvailableDoctorsInWard
} = require("../modelControllers/doctor.controller")

const {
    countAllNursesInWard,
    countAvailableNursesInWard
} = require("../modelControllers/nurse.controller")

const { getAllWards } = require("../modelControllers/ward.controller")

async function findHospitalByName(hospitalNameStr) {
    let hospitalName = hospitalName.toUpperCase();
    let hospital = await HospitalModel.findOne({ name: hospitalName })

    return hospital;
}

async function getStatisticsByWard(ward) {
    try {

        return {
            wardName: ward.wardName,
            doctors: [
                (await countAvailableDoctorsInWard(ward._id)),
                (await countAllDoctorsInWard(ward._id))
            ],
            nurses: [
                (await countAvailableNursesInWard(ward._id)),
                (await countAllNursesInWard(ward._id))
            ],
            rooms: [],
            beds: []
        }

    }catch(err) {
        console.log(err);
    }
}

async function getAllWardStats() {
    try {
        const wards = await getAllWards(); 
        const stats = [];

        for( let ward of wards ) {
            stats.push(await getStatisticsByWard(ward))
        }

        return stats;
    }catch(err) {
        console.log(err)
    }
}

module.exports = {
    findHospitalByName,
    getAllWardStats
}