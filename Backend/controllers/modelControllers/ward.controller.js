const { WardModel } = require("../../models/Ward.model");


async function findWardByName(wardNameStr) {
        let wardName = wardNameStr.toUpperCase();
        let ward = await WardModel.findOne({ wardName })

        return ward;
}

module.exports = {
    findWardByName
}