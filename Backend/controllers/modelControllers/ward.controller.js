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

async function checkIfWardExistAndUpdatePayload(payload) {
    try{

               /****check ward */
//if the change made is a ward 
if(payload.wardName) {
    console.log('payload has ward info')
  
    const ward = await findWardByName(payload.wardName)
    if(!ward) {
      console.log('no ward was found with the name given')
  
    //   return  res.send({ error: "ward not found"})
    return;
    }else {
      console.log('deleted wardName property from payload')
  
      delete payload.wardName
      payload.wardID = ward._id;
      console.log('patch doctor: payload', payload)
      return payload;

    }
  }
      /*************** */
    }catch(err) {
        console.log(err)
    }
}

module.exports = {
    findWardByName,
    getAllWards,
    checkIfWardExistAndUpdatePayload
}