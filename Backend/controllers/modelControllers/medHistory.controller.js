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

function getHeaders() {
  const headers = ["Patient Name", "Doctor", "Nurse", "Disease", "Medicines", "Weight(kg)", "Glucose level", "Date"];
  return headers;
}

function getRows (infos) {
    try{

      const rows = [];

      for(const info of infos) {
        
        const obj = {};
        obj.patientName = info?.patient_id?.patientID ? `${info?.patient_id?.firstName} ${info?.patient_id?.lastName}`: '';
        obj.doctorName = info?.doc_id?.docName;
        obj.nurseName = info?.nurse_id?.nurseName;
        obj.disease = info?.consultation_id?.disease;
        const medicines = info?.prescription_id?.medicines
      
        let medArr = []
        for(let medicine of medicines) {
          
          const med = `${medicine?.medicineName} ${medicine?.dosage} ${medicine?.duration}`
          medArr.push(med);
        }
        console.log('medArr', medArr)
        obj.meds = medArr;
        obj.weight = info?.consultation_id?.weight;
        obj.glucose = info?.consultation_id?.glucose;
        obj.date = info?.timeStamp;
        rows.push([...Object.values(obj)])

      }

      return rows;
    }catch(err){
      console.log(err);
    }
}


module.exports = {
    findHistoryWithinGivenDates,
    getHeaders,
    getRows
}