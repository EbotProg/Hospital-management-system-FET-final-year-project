const { PrescriptionModel } = require("../../models/Prescription.model");


async function createPrescription (doc_id, nurse_id, patient_id, medicines) {

    try{
        const prescription = new PrescriptionModel();
        if(doc_id) {
            prescription.doc_id = doc_id
        }else if(nurse_id) {
            prescription.nurse_id = nurse_id
        }

        prescription.patient_id = patient_id;
        prescription.medicines = medicines;
        
        return await prescription.save();
    }catch(err) {
        console.log(err);
    }
}



module.exports = {
    createPrescription
}