const { PatientMedicalHistoryModel } = require("../../models/PatientMedicalHistory.model")
const moment = require("moment");


async function findPatientHistoryByPatientId(patient_id) {
    try {

        const medHistory = await PatientMedicalHistoryModel.find({
            patient_id,
        }).populate([
                  {
                    path: "patient_id",
                  },
                  {
                    path: "prescription_id",
                  },
                  {
                    path: "doc_id",
                  },
                  {
                    path: "nurse_id",
                  },
                  {
                    path: "consultation_id",
                  },
                ]);
                return medHistory;
    }catch(err) {
        console.log(err)
    }
}

async function findHistoryWithinGivenDates(patient_id, start, end) {
    try{
        const arr = [];
        const startDate = new Date(start);
        const endDate = new Date(end)
        const historyInfos = await findPatientHistoryByPatientId(patient_id);
        
        for( let info of historyInfos) {
            const comparisonDate = new Date(info.timeStamp)
            const value = moment(comparisonDate).isSameOrAfter(startDate) && moment(comparisonDate).isSameOrBefore(endDate)
            if(value) {
                arr.push(info);
            }
        }
        return arr;
    }catch(err) {
        console.log(err)
    }
}

module.exports = {
    findHistoryWithinGivenDates
}