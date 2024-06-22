const moment = require("moment")
const { AppointmentModel } = require("../../models/Appointment.model")


async function checkIfDoctorHasAppointmentOnDate(docID, date) {
   const appointment = await AppointmentModel.findOne({ appointmentWith: docID, dateOfAppointment: date })
return appointment;
}

async function getAppointmentsByDocID(docID) {
    const appointments = await AppointmentModel.find({ appointmentWith: docID });
    return appointments;
}

function givenAppointStartDateIsWithin(appointStartDate, newAppointStartDate, newAppointEndDate) {
    const value = moment(appointStartDate).isSameOrAfter(newAppointStartDate) && moment(appointStartDate).isSameOrBefore(newAppointEndDate) 
    console.log("startDate is within =========: appStartDate, newStartDate, newEndDate, value", appointStartDate, newAppointStartDate, newAppointEndDate, value)
    return value;
}

function givenAppointEndDateIsWithin(appointEndDate, newAppointStartDate,  newAppointEndDate) {

    const value = moment(appointEndDate).isSameOrAfter(newAppointStartDate) && moment(appointEndDate).isSameOrBefore(newAppointEndDate)
    console.log("endDate is within =========: appendDate, newStartDate, newEndDate, value", appointEndDate, newAppointStartDate, newAppointEndDate, value)
    return value;
}

async function checkIfDoctorWillBeAvailableDuringPeriod(startDate, endDate, docID) {
   try{
      const appointments = await getAppointmentsByDocID(docID)
      console.log("appointments =========: ", appointments)
      for( let appointment of appointments) {
            const appointOccupiesSomePeriodOfMine = givenAppointStartDateIsWithin(appointment.startDateTime, startDate, endDate) || givenAppointEndDateIsWithin(appointment.endDateTime, startDate, endDate);

            console.log("appointOccupiesSomePeriodOfMine =========: startDate, endDate, docID, value", startDate, endDate, docID, appointOccupiesSomePeriodOfMine)

            if(appointOccupiesSomePeriodOfMine) {
                return false;
            }

      }
      return true;
   }catch(err) {
    console.log(err);
   } 


}

module.exports = {
    checkIfDoctorHasAppointmentOnDate,
    checkIfDoctorWillBeAvailableDuringPeriod
}