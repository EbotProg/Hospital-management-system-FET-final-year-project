const { HospitalModel } = require("../../models/Hospital.model")

async function findHospitalByName(hospitalNameStr) {
    let hospitalName = hospitalName.toUpperCase();
    let hospital = await HospitalModel.findOne({ name: hospitalName })

    return hospital;
}

module.exports = {
    findHospitalByName
}