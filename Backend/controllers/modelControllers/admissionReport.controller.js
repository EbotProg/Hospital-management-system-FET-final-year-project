


async function updatePayload(payload, bed, room, ward, patient, nurse) {
        payload.bedID = bed._id;
        payload.wardID = ward._id;
        payload.roomID = room._id;
        payload.patientID = patient._id
        payload.nurseID = nurse._id
        
        delete payload.wardName;
        delete payload.roomNumber;
        delete payload.bedNumber;
          
}

module.exports = {
    updatePayload
}