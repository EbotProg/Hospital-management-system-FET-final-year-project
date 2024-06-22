const { AdmissionReportModel } = require("../../models/AdmissionReport.model")


async function updatePayload(payload, bed, room, ward, patient, nurse) {
    console.log('payload', payload)
        payload.bedID = bed._id;
        payload.wardID = ward._id;
        payload.roomID = room._id;
        payload.patientID = patient._id
        payload.nurseID = nurse._id
        
        delete payload.wardName;
        delete payload.roomNumber;
        delete payload.bedNumber;
        console.log('update payload', payload)
 
}

async function findAdmissionReportById(_id) {
    const admissionRep = await AdmissionReportModel.findById(_id).populate([
        {
          path: "wardID",
        },
        {
          path: "roomID",
        },
        {
          path: "bedID",
        },
        {
          path: "patientID",
        },
        {
          path: "nurseID",
        },
      ]);
    return admissionRep;
}

async function addDischargeReportIdToAdmissionReport(dischargeRepId) {
    const admissionRep = await AdmissionReportModel.updateOne({isCurrent: true }, { $set: { dischargeReportID: dischargeRepId }});
    return admissionRep
}

async function findAndUpdatePreviousAdmissionRepByPatientId(_id) {
    const prevAdmissionRep = await AdmissionReportModel.updateOne({_id, isCurrent: true}, { $set: { isCurrent: false }});
    return prevAdmissionRep;
}

module.exports = {
    updatePayload,
    findAdmissionReportById,
    addDischargeReportIdToAdmissionReport,
    findAndUpdatePreviousAdmissionRepByPatientId
}