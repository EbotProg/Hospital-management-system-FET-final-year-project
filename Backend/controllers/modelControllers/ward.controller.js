const { WardModel } = require("../../models/Ward.model");


async function findWardByName(wardName) {
    try {

        let ward = await WardModel.findOne({ wardName })

        return ward;
    }catch(err) {
       throw new Error(err)
    }
}