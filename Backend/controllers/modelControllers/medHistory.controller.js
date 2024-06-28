const { PatientMedicalHistoryModel } = require("../../models/PatientMedicalHistory.model")
const moment = require("moment");


async function findPatientHistoryByPatientId(patient_id) {
    try {

        const medHistory = await PatientMedicalHistoryModel.find({
            patient_id,
        })
        .populate("patient_id")
        .populate("prescription_id")
        .populate("consultation_id")
        .populate("admissionRep_id")
        .populate("dischargeRep_id")
        .populate("labReport_id")
        // .populate([
        //           {
        //             path: "patient_id",
        //           },
        //           {
        //             path: "prescription_id",
        //           },
        //           // {
        //           //   path: "doc_id",
        //           // },
        //           // {
        //           //   path: "nurse_id",
        //           // },
        //           {
        //             path: "consultation_id",
        //           },
        //           {
        //             path: "admissionRep_id",
        //           },
        //           {
        //             path: "dischargeRep_id",
        //           },
        //           {
        //             path: "labReport_id",
        //           },
        //         ]);
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

async function findSingleHistoryWithinGivenDates(patient_id, start, end) {
    try{
        const startDate = new Date(start);
        const endDate = new Date(end)
        const historyInfos = await findPatientHistoryByPatientId(patient_id);
        
        for( let info of historyInfos) {
            const comparisonDate = new Date(info.dateTime)
            const value = moment(comparisonDate).isSameOrAfter(startDate) && moment(comparisonDate).isSameOrBefore(endDate)
            if(value) {
                return info;
            }
        }
        return;
    }catch(err) {
        console.log(err)
    }
}

function getHeaders() {
  const headers = ["Date","Disease", "Medicines", "Weight(kg)", "Glucose level", "consulted At", "admitted At", "discharged At", "Did lab test At"];
  return headers;
}

function getRows (infos) {
    try{

      const rows = [];

      for(const info of infos) {
        
        const obj = {};
        // obj.patientName = info?.patient_id?.patientID ? `${info?.patient_id?.firstName} ${info?.patient_id?.lastName}`: '';
        // obj.doctorName = info?.doc_id?.docName;
        // obj.nurseName = info?.nurse_id?.nurseName;
        obj.date = info?.dateTime ? new Date(info.dateTime).toLocaleDateString() : "";
        obj.disease = info?.consultation_id?.disease;
        const medicines = info?.prescription_id?.medicines
      
        let medArr = []
        if(medicines) {
          for(let medicine of medicines) {
          
            const med = `${medicine?.medicineName} ${medicine?.dosage} ${medicine?.duration}`
            // const med = `${medicine?.medicineName}`
            medArr.push(med);
          }
        }
        
        console.log('medArr', medArr)
        obj.meds = medArr.join("___");
        obj.weight = info?.consultation_id?.weight;
        obj.glucose = info?.consultation_id?.glucose;
        // obj.date = info?.timeStamp ? new Date(info.timeStamp).toLocaleDateString() : "";
        obj.consultedAt = info?.consultation_id?.dateTime ? getFormattedTime(new Date(info.consultation_id.dateTime)) : "";
        obj.admittedAt = info?.admissionRep_id?.dateTime ? getFormattedTime(new Date(info.admissionRep_id.dateTime)) : "";
        obj.dischargedAt = info?.dischargeRep_id?.dateTime ? getFormattedTime(new Date(info.dischargeRep_id.dateTime)) : "";
        obj.didLabTestAt = info?.labReport_id?.dateTime ? getFormattedTime(new Date(info.labReport_id.dateTime)) : "";
        rows.push([...Object.values(obj)])

      }

      return rows;
    }catch(err){
      console.log(err);
    }
}


function getFormattedTime(dateObj) {
  // Get hours, minutes, and adjust for 12-hour format
  const hours = dateObj.getHours() % 12 || 12; // Ensures 12 for noon
  const minutes = dateObj.getMinutes().toString().padStart(2, '0'); // Pad minutes with leading zero

  // Get AM/PM indicator
  const amPm = dateObj.getHours() < 12 ? 'AM' : 'PM';

  // Format the time string
  return `${hours}:${minutes}${amPm}`;
}


module.exports = {
    findHistoryWithinGivenDates,
    getHeaders,
    getRows,
    findSingleHistoryWithinGivenDates,
    getFormattedTime
}