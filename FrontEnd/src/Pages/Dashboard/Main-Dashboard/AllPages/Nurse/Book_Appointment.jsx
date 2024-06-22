import React, { useState, useEffect } from "react";
import { CommonProblem } from "./MixedObjectData";
import "./CSS/Book_appointment.css";
import { useDispatch, useSelector } from "react-redux";
import { AddPatients, CreateBooking, GetAllAppointment } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "antd";

const notify = (text) => toast(text);


const Book_Appointment = () => {
  
  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.auth);

  const [Loading, setLoading] = useState(false);
  const [fetchedAppointments, setFetchedAppointments] = useState([])
  const [mappedAppointments, setMappedAppointments] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const InitValue = {
    patientID: "",
    createdBy: "",
    appointmentWith: "",
    reason: "",
    location: "",
    startDateTime: "",
    endDateTime: ""
    // age: "",
    // gender: "",
    // mobile: "",
    // disease: "",
    // address: "",
    // email: "",
    // department: "",
    // date: "",
    // time: "",
  };

  const [BookAppoint, setBookAppoint] = useState(InitValue);

  const columns = [
    { title: "Patient", dataIndex: "patientName", key: "patientName" },
    { title: "Patient's email", dataIndex: "patientEmail", key: "patientEmail" },
    { title: "Patient phone#", dataIndex: "patientPhoneNumber", key: "patientPhoneNumber" },
    { title: "Doctor", dataIndex: "docName", key: "docName" },
    { title: "Doc phone#", dataIndex: "docPhoneNumber", key: "docPhoneNumber" },
    { title: "Doc email", dataIndex: "docEmail", key: "docEmail" },
    { title: "Appointment Period(from--to--)", dataIndex: "TOA", key: "TOA" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Reason", dataIndex: "reason", key: "reason" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "CreatedBy", dataIndex: "createdBy", key: "createdBy" },
    // { title: "", dataIndex: "viewMore", key: "veiwMore" },
  ];

  const mapAppointmentInfo = () => {
    let arr = []
    if(fetchedAppointments?.length > 0) {
      fetchedAppointments.forEach((info)=>{
        let obj = {};
        obj.key = info?._id
        obj.patientName = info?.patientID?.patientID ? `${info?.patientID?.firstName} ${info?.patientID?.lastName}`: "";
        obj.patientEmail = info?.patientID?.email;
        obj.patientPhoneNumber = info?.patientID?.mobile;
        obj.docName = info?.appointmentWith?.docName;
        obj.docPhoneNumber = info?.appointmentWith?.mobile;
        obj.docEmail = info?.appointmentWith?.email;
        obj.TOA = `${info?.startDateTime} - ${info.endDateTime}`;
        obj.location = info?.location;
        obj.reason = info?.reason;
        obj.status = info?.appointmentStatus;
        obj.createdBy = info?.createdBy?.nurseName;
      //   obj.viewMore = <button
      //   style={{
      //     border: "none",
      //     color: "blue",
      //     outline: "none",
      //     background: "transparent",
      //     cursor: "pointer",
      //   }}
      //   onClick={() => handleViewMorePatientInfo(info._id)}
      // >
      //   View more
      // </button>
    
  
      arr.push(obj);
      
    });
    }
    

  setMappedAppointments([...arr])

  }


  useEffect(()=> {

    // if(patientId) {
    //   dispatch(getPatient(patientId)).then(res => {
    //     console.log("res from get patient", res);
    //     if(res.message === "patient found") {
    //       // setPatientForAdmissionInfo(res.patient)
    //       setBookAppoint({ ...BookAppoint, patientID:  res.patient.patientID, nurseID: data?.user.nurseID})
    //     }
    //   })
    // }
    setBookAppoint({ ...BookAppoint, createdBy: data?.user.nurseID})


    dispatch(GetAllAppointment()).then(res => {
      console.log('get all appointments res', res)
      setFetchedAppointments(res);
    })
    
  }, [])

  useEffect(()=> {
    if(isSubmitted === true) {
      dispatch(GetAllAppointment()).then(res => {
        console.log('get all appointments res', res)
        setFetchedAppointments(res);
      })
    }
    setIsSubmitted(false)
    
  }, [isSubmitted])

  useEffect(()=> {
    console.log('fetchedAppointments', fetchedAppointments)
    mapAppointmentInfo()

  }, [fetchedAppointments])







  const HandleAppointment = (e) => {
    setBookAppoint({ ...BookAppoint, [e.target.name]: e.target.value });
  };

  const HandleOnsubmitAppointment = (e) => {
    e.preventDefault();

    setLoading(true);
    
    dispatch(CreateBooking(BookAppoint)).then(res => {
      console.log("res from create appointment", res);
      if(res.error) {
        setLoading(false);
        return notify(res.error)
      }

      if(res.message === 'Appointment Booked') {
        setLoading(false);
      notify(res.message);
      }
      setBookAppoint(InitValue);
      setLoading(false);

    });
        
        
    
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Book Appointment</h1>
            <form onSubmit={HandleOnsubmitAppointment}>
              {/* Name PlaceHolder */}
              <div>
                <label>Patient ID</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="e.g. Pt-13dkdng8"
                    name="patientID"
                    value={BookAppoint.patientID}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              {/* AGE PLACEHOLDER  */}
              <div>
                <label>Your ID</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="e.g. Nrs-13dkdng8"
                    name="createdBy"
                    value={BookAppoint.createdBy}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              
              
              {/* MOBILE PLACEHOLDER */}
              <div>
                <label>Doctor ID</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="e.g. Doc-13dkdng8"
                    name="appointmentWith"
                    value={BookAppoint.appointmentWith}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Reason For Appointment</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="e.g skin check-up"
                    name="reason"
                    value={BookAppoint.reason}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              {/* PROBLEM PLACEHOLDER */}
              {/* <div>
                <label>Type of Disease</label>
                <div className="inputdiv">
                  <select
                    name="disease"
                    value={BookAppoint.disease}
                    onChange={(e) => {
                      HandleAppointment(e);
                    }}
                    required
                  >
                    <option value="Choose Blood Group">Select Disease</option>
                    {CommonProblem.map((ele, i) => {
                      return (
                        <option key={i} value={ele.title}>
                          {ele.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div> */}

              {/* ENTER SAMPLE DISEASE */}

              {/* ADDRESS SECTION  */}

              <div>
                <label>Location of Appointment</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="e.g. Doctor's office, room 5, surgical ward"
                    name="location"
                    value={BookAppoint.location}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              {/* DEPARTMENT SECTION */}

              {/* <div>
                <label>Department</label>
                <div className="inputdiv">
                  <select
                    name="department"
                    value={BookAppoint.department}
                    onChange={HandleAppointment}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="ENT">ENT</option>
                    <option value="Ophthalmologist">Ophthalmologist</option>
                    <option value="Anesthesiologist">Anesthesiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Oncologist">Oncologist</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                  </select>
                </div>
              </div> */}
              {/* APPOINTMENT DATE  */}
              {/* <div className="dateofAppointment">
                <p>Date and Time </p>
                <div className="inputdiv">
                  <input
                    type={"date"}
                    placeholder="Choose Date"
                    name="date"
                    value={BookAppoint.date}
                    onChange={HandleAppointment}
                    required
                  />
                  <input
                    type={"time"}
                    placeholder="Choose Time"
                    name="time"
                    value={BookAppoint.time}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div> */}
                {/* <div>
                <label>Date of Appointment</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    name="dateOfAppointment"
                    value={BookAppoint.dateOfAppointment}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div> */}

              <div>
                <label>Start On</label>
                <div className="inputdiv">
                <input
                    type={"datetime-local"}
                    name="startDateTime"
                    value={BookAppoint.startDateTime}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>

              <div>
                <label>End On</label>
                <div className="inputdiv">
                <input
                    type={"datetime-local"}
                    name="endDateTime"
                    value={BookAppoint.endDateTime}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="book_formsubmitbutton">
                {Loading ? "Loading..." : "Book Appointment"}
              </button>
            </form>
          </div>

          <div className="wardDetails">
          <h1>All Appointments</h1>
          <div className="wardBox">
            <Table columns={columns} dataSource={mappedAppointments} />
          </div>
        </div>

        </div>
      </div>
    </>
  );
};

export default Book_Appointment;
