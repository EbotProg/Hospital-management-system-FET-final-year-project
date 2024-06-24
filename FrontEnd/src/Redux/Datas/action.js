import * as types from "./types";
import axios from "axios";
import { API } from "../../config";

// CreateReport
export const CreateReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_REPORT_REQUEST });
    const res = await axios.post(
      `${API}/reports/create`,
      data
    );
    console.log(res);
    return res.data;
    // dispatch({
    //   type: types.CREATE_REPORT_SUCCESS,
    //   payload: {
    //
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.CREATE_REPORT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

export const AddConsulationInfo = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_CONSULTATION_INFO_REQUEST });
    console.log("data from addconsultation action", data)
    const res = await axios.post(
      `${API}/consultations/add`,
      data
    );
    console.log(res);
    return res.data;
    // dispatch({
    //   type: types.CREATE_REPORT_SUCCESS,
    //   payload: {
    //
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.CREATE_CONSULTATION_INFO_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

export const CreateLabReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_LAB_REPORT_REQUEST });
    const res = await axios.post(
      `${API}/labReports/create`,
      data
    );
    console.log(res);
    return res.data;
    // dispatch({
    //   type: types.CREATE_REPORT_SUCCESS,
    //   payload: {
    //
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.CREATE_LAB_REPORT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// GET DOCTOR DETAILS
export const GetDoctorDetails = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DOCTOR_REQUEST });
    const res = await axios.get(
      `${API}/doctors`
    );
    console.log(res);
    // dispatch({
    //   type: types.GET_DOCTOR_SUCCESS,
    //   payload: {
    //
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.GET_DOCTOR_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

//ADD PATIENTS
export const AddPatients = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_PATIENT_REQUEST });
    const res = await axios.post(
      `${API}/patients/add`,
      data
    );
    return res.data;
    // dispatch({
    //   type: types.ADD_PATIENT_SUCCESS,
    //   payload: {
    //
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.ADD_PATIENT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

export const admitPatientInfos = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.ADMIT_PATIENT_REQUEST });
    const res = await axios.post(
      `${API}/admissionReports/add`,
      data
    );
    return res.data;
    // dispatch({
    //   type: types.ADD_PATIENT_SUCCESS,
    //   payload: {
    //
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.ADMIT_PATIENT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

export const dischargePatientInfos = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.DISCHARGE_PATIENT_REQUEST });
    const res = await axios.post(
      `${API}/dischargeReports/add`,
      data
    );
    return res.data;
    // dispatch({
    //   type: types.ADD_PATIENT_SUCCESS,
    //   payload: {
    //
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.DISCHARGE_PATIENT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

//ADD BEDS
export const CreateBeds = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_BED_REQUEST });
    const res = await axios.post(
      `${API}/beds/add`,
      data
    );
    return res.data;
    // dispatch({
    //   type: types.ADD_BED_SUCCESS,
    //   payload: {
    //
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.ADD_BED_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

//create payment
export const CreatePayment = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_PAYMENT_REQUEST });
    const res = await axios.post(
      `${API}/payments/add`,
      data
    );
    console.log(res.data);
    // dispatch({
    //   type: types.CREATE_PAYMENT_SUCCESS,
    //   payload: {
    //
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.CREATE_PAYMENT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

//GET BEDS
export const GetBeds = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_BED_REQUEST });
    const res = await axios.get(`${API}/beds`);
    console.log(res);
    dispatch({
      type: types.GET_BED_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_BED_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

//CREATE BOOKING
export const CreateBooking = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_BOOKING_REQUEST });
    const res = await axios.post(
      `${API}/appointments/create`,
      data
    );
    console.log(res);
    // dispatch({ type: types.CREATE_BOOKING_SUCCESS, payload: res.data.postData });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//GET BEDS
export const AddBed = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_BEDS_REQUEST });
    const res = await axios.post(
      `${API}/beds/add`,
      data
    );
    console.log(res);
    // dispatch({
    //   type: types.ADD_BEDS_SUCCESS,
    //   payload: {

    //   },
    // });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.ADD_BEDS_ERROR,
      payload: {
        message: error,
      },
    });
  }
};


export const AddWard = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_WARD_REQUEST });
    const res = await axios.post(
      `${API}/wards/add`,
      data
    );
    console.log(res);
    // dispatch({
    //   type: types.ADD_BEDS_SUCCESS,
    //   payload: {

    //   },
    // });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.ADD_WARD_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

export const getAllWards = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALL_WARDS_REQUEST });
    const res = await axios.get(
      `${API}/wards`,
      data
    );
    console.log(res);
    // dispatch({
    //   type: types.ADD_BEDS_SUCCESS,
    //   payload: {

    //   },
    // });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.GET_ALL_WARDS_ERROR,
      payload: {
        message: error,
      },
    });
  }
};


export const AddRoom = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_ROOM_REQUEST });
    const res = await axios.post(
      `${API}/rooms/add`,
      data
    );
    console.log(res);
    // dispatch({
    //   type: types.ADD_BEDS_SUCCESS,
    //   payload: {

    //   },
    // });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.ADD_ROOM_ERROR,
      payload: {
        message: error,
      },
    });
  }
};




// GET SINGLE BED
export const GetSingleBed = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_BEDS_REQUEST });
    const res = await axios.post(
      `${API}/beds/single`,
      data
    );
    // console.log(res);
    return res.data;
    // dispatch({
    //   type: types.GET_SINGLE_BEDS_SUCCESS,
    //   payload: {

    //   },
    // });
  } catch (error) {
    // dispatch({
    //   type: types.GET_SINGLE_BEDS_ERROR,
    //   payload: {
    //     message: error,
    //   },
    // });
    console.log(error);
  }
};

// EDIT SINGLE BED
export const EditSingleBed = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_BEDS_REQUEST });
    const res = await axios.patch(
      `${API}/beds/${id}`,
      data
    );
    // console.log(res);
    return res.data;
    // dispatch({
    //   type: types.GET_SINGLE_BEDS_SUCCESS,
    //   payload: {

    //   },
    // });
  } catch (error) {
    // dispatch({
    //   type: types.GET_SINGLE_BEDS_ERROR,
    //   payload: {
    //     message: error,
    //   },
    // });
    console.log(error);
  }
};

// DISCHARGE PATIENT
// export const dischargePatient = (data) => async (dispatch) => {
//   try {
//     dispatch({ type: types.DISCHARGE_PATIENT_REQUEST });
//     const res = await axios.put(
//       `${API}/beds/discharge`,
//       data
//     );
//     console.log(res);
//     // return res.data;
//     dispatch({
//       type: types.DISCHARGE_PATIENT_SUCCESS,
//       payload: {
//         bed: res.data.bed,
//       },
//     });
//   } catch (error) {
//     // dispatch({
//     // type: types.DISCHARGE_PATIENT_ERROR,
//     //   payload: {
//     //     message: error,
//     //   },
//     // });
//     console.log(error);
//   }
// };

// GET ALL PATIENT
export const GetPatients = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PATIENTS_REQUEST });
    const res = await axios.get(
      `${API}/patients`
    );
    console.log(res.data);
    dispatch({
      type: types.GET_PATIENTS_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};


export const getPatient = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PATIENT_REQUEST });
    const res = await axios.get(
      `${API}/patients/${id}`
    );
    console.log(res.data);
    dispatch({
      type: types.GET_PATIENT_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAdmissionReport = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ADMISSION_REPORT_REQUEST });
    const res = await axios.get(
      `${API}/admissionReports/${id}`
    );
    console.log(res.data);
    dispatch({
      type: types.GET_ADMISSION_REPORT_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllNurses = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALL_NURSES_REQUEST });
    const res = await axios.get(
      `${API}/nurses`
    );
    console.log(res.data);
    dispatch({
      type: types.GET_ALL_NURSES_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDoctors = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALL_DOCTORS_REQUEST });
    const res = await axios.get(
      `${API}/doctors`
    );
    console.log(res.data);
    dispatch({
      type: types.GET_ALL_DOCTORS_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdmins = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALL_ADMINS_REQUEST });
    const res = await axios.get(
      `${API}/admin`
    );
    console.log(res.data);
    dispatch({
      type: types.GET_ALL_ADMINS_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllRooms = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALL_ROOMS_REQUEST });
    const res = await axios.get(
      `${API}/rooms`
    );
    console.log(res.data);
    dispatch({
      type: types.GET_ALL_ROOMS_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBeds = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALL_BEDS_REQUEST });
    const res = await axios.get(
      `${API}/beds`
    );
    console.log(res.data);
    dispatch({
      type: types.GET_ALL_BEDS_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdmissionReports = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALL_ADMISSION_REPORTS_REQUEST });
    const res = await axios.get(
      `${API}/admissionReports`
    );
    console.log(res.data);
    dispatch({
      type: types.GET_ALL_ADMISSION_REPORTS_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};


export const getAllDischargeReports = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALL_DISCHARGE_REPORTS_REQUEST });
    const res = await axios.get(
      `${API}/dischargeReports`
    );
    console.log(res.data);
    dispatch({
      type: types.GET_ALL_DISCHARGE_REPORTS_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// GET ALL DATA
export const GetAllData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALLDATA_REQUEST });
    const res = await axios.get(
      `${API}/hospitals`
    );
    console.log(res.data);
    dispatch({
      type: types.GET_ALLDATA_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET ALL APPOINTMENT DETAILS
export const GetAllAppointment = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_APPOINTMENT_DETAILS_REQUEST });
    const res = await axios.get(
      `${API}/appointments`
    );
    // console.log(res.data);
    // return res.data;
    dispatch({
      type: types.GET_APPOINTMENT_DETAILS_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// DELETE APPOINTMENTS
export const DeleteAppointment = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_APPOINTMENT_REQUEST });
    const res = await axios.delete(
      `${API}/appointments/${id}`
    );
    console.log(res.data);
    // return res.data;
    dispatch({
      type: types.DELETE_APPOINTMENT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteWard = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_WARD_REQUEST });
    const res = await axios.delete(
      `${API}/wards/${id}`
    );
    console.log(res.data);
    // return res.data;
    dispatch({
      type: types.DELETE_WARD_SUCCESS,
      payload: id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRoom = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_ROOM_REQUEST });
    const res = await axios.delete(
      `${API}/rooms/${id}`
    );
    console.log(res.data);
    // return res.data;
    dispatch({
      type: types.DELETE_ROOM_SUCCESS,
      payload: id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBed = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_BED_REQUEST });
    const res = await axios.delete(
      `${API}/beds/${id}`
    );
    console.log(res.data);
    // return res.data;
    dispatch({
      type: types.DELETE_BED_SUCCESS,
      payload: id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// GET ALL REPORTS
export const GetAllReports = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_REPORTS_REQUEST });
    const res = await axios.get(
      `${API}/reports`
    );
    // console.log(res.data);
    return res.data;
    // dispatch({
    //   type: types.DELETE_APPOINTMENT_SUCCESS,
    //   payload: id,
    // });
  } catch (error) {
    console.log(error);
  }
};

export const GetLabReports = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_LAB_REPORTS_REQUEST });
    const res = await axios.get(
      `${API}/labReports`
    );
    // console.log(res.data);
    return res.data;
    // dispatch({
    //   type: types.DELETE_APPOINTMENT_SUCCESS,
    //   payload: id,
    // });
  } catch (error) {
    console.log(error);
  }
};

export const SearchMedHistory = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_MEDICAL_HISTORY_REQUEST });
    const res = await axios.post(
      `${API}/medicalHistory/search`,
      data
    );
    // console.log(res.data);
    return res.data;
    // dispatch({
    //   type: types.DELETE_APPOINTMENT_SUCCESS,
    //   payload: id,
    // });
  } catch (error) {
    console.log(error);
  }
};

export const downloadMedHistory = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.DOWNLOAD_MEDICAL_HISTORY_REQUEST });
    // const res = await axios.post(
    //   `${API}/medicalHistory/downloadRep`,
    //   data
    // );
    const res = await axios.post(
      `${API}/medicalHistory/downloadRep`,
      data, {
        responseType: 'blob'
      }
    );
    // console.log(res.data);
    return res.data;
    // dispatch({
    //   type: types.DELETE_APPOINTMENT_SUCCESS,
    //   payload: id,
    // });
  } catch (error) {
    console.log(error);
  }
};

export const SearchMyPatient = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_MY_PATIENTS_REQUEST });
    const res = await axios.get(
      `${API}/patients/myPatients`
    );
    // console.log(res.data);
    return res.data;
    // dispatch({
    //   type: types.DELETE_APPOINTMENT_SUCCESS,
    //   payload: id,
    // });
  } catch (error) {
    console.log(error);
  }
};
