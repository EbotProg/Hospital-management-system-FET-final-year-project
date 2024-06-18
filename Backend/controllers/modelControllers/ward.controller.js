const { WardModel } = require("../../models/Ward.model");


async function findWardByName(wardNameStr) {
        let wardName = wardNameStr.toUpperCase();
        let ward = await WardModel.findOne({ wardName })

        return ward;
}

async function getAllWards() {
    const wards = WardModel.find({})
    return wards;
}

module.exports = {
    findWardByName,
    getAllWards
}