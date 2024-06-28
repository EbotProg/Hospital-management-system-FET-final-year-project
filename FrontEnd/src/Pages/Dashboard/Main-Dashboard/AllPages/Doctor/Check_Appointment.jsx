import { Table } from "antd";
import { useEffect, useState,  } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import {
  DeleteAppointment,
  GetAllAppointment,
  cancleAppointment,
  getAllDoctorAppointments
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = (text) => toast(text);



const Check_Appointment = () => {
  const { data } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [fetchedAppointments, setFetchedAppointments] = useState([])
  const [mappedAppointments, setMappedAppointments] = useState([])
  const [isCancelled, setIsCancelled] = useState(false)

  // const { doc_id } = useParams();
  // console.log("doc_id", doc_id);

  const columns = [
    { title: "Patient Name", dataIndex: "patientName"},
    { title: "Mobile", dataIndex: "phoneNumber"},
    { title: "Reason", dataIndex: "reason"},
    { title: "Location", dataIndex: "location"},
    { title: "Date", dataIndex: "date"},
    { title: "Period", dataIndex: "period"},
    { title: "Created By", dataIndex: "createdBy"},
    { title: "Status", dataIndex: "status"},
    { title: "", dataIndex: "cancel"},
  ];

  const handleCancelAppointment = (id) => {
    let clickedOk = window.confirm("Warning!!!\nYou are about to cancel an appointment\nContinue?");
    if(clickedOk === true) {
        dispatch(cancleAppointment(id)).then((res) => {
          console.log('res', res)
            notify(res.message)
            if(res.message === "appointment cancelled") {
              setIsCancelled(true)
            }
          })
          .catch(err => {
            notify(err.message)
          })
    }
  }

  const getFormattedTime = (dateObj) => {
    // Get hours, minutes, and adjust for 12-hour format
    const hours = dateObj.getHours() % 12 || 12; // Ensures 12 for noon
    const minutes = dateObj.getMinutes().toString().padStart(2, '0'); // Pad minutes with leading zero
  
    // Get AM/PM indicator
    const amPm = dateObj.getHours() < 12 ? 'AM' : 'PM';
  
    // Format the time string
    return `${hours}:${minutes}${amPm}`;
  }

  const mapAppointmentInfo = () => {
    let arr = []
    if(fetchedAppointments?.length > 0) {
      fetchedAppointments.forEach((info)=>{
        // const from = new Date(info.startDateTime).toISOString().split("T")[1].split("Z")[0]
        // const to = new Date(info.endDateTime).toISOString().split("T")[1].split("Z")[0]
        const from = getFormattedTime(new Date(info.startDateTime))
        const to = getFormattedTime(new Date(info.endDateTime))
        let obj = {};
        obj.key = info?._id
        obj.patientName = info?.patientID?.patientID ? `${info?.patientID.firstName} ${info?.patientID.lastName}` : "";
        obj.phoneNumber = info?.patientID?.mobile;
        obj.reason = info?.reason;
        obj.location = info?.location;
        // obj.date = info ? `${new Date(info.startDateTime).toLocaleDateString()} - ${new Date(info.endDateTime).toLocaleDateString()}` : "";
        obj.date = info ? `${new Date(info.startDateTime).toLocaleDateString()}` : "";
        obj.period = `${from} - ${to}`
        obj.createdBy = info?.createdBy?.nurseID;
        obj.status = info?.appointmentStatus;
        obj.cancel =  info?.appointmentStatus === "Scheduled" ? <button
        style={{
          border: "none",
          color: "red",
          outline: "none",
          background: "transparent",
          cursor: "pointer",
        }}
        onClick={() => handleCancelAppointment(info._id)}
      >
        Cancel
      </button> : ""
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

    if(data?.user?._id) {
      dispatch(getAllDoctorAppointments(data.user._id)).then(res => {
        console.log("res from getalldoctorappointments", res);
        if(res.message === "fetched your appointments") {
          // setPatientForAdmissionInfo(res.patient)
          setFetchedAppointments(res.appointments)
        }
      })
    }
    
    
  }, [data])

  useEffect(()=> {
    if(isCancelled === true) {
      dispatch(getAllDoctorAppointments(data?.user?._id)).then(res => {
        console.log("res from getalldoctorappointments", res);
        if(res.message === "fetched your appointments") {
          // setPatientForAdmissionInfo(res.patient)
          setFetchedAppointments(res.appointments)
        }
      })
    }
    setIsCancelled(false)
    
  }, [isCancelled, data])

  useEffect(()=> {
    console.log('fetchedAppointments', fetchedAppointments)
    mapAppointmentInfo()

  }, [fetchedAppointments])




  

  // const appointments = [
  //     { 
  //       patientName: "Achale Ebot",
  //       phoneNumber: "6784858339",
  //       disease: "Cough",
  //       department: "maternity",
  //       date: "2022-01-01",
  //       delete: <button
  //       style={{
  //         border: "none",
  //         color: "red",
  //         outline: "none",
  //         background: "transparent",
  //         cursor: "pointer",
  //       }}
  //       onClick={() => DeleteAppoint(1)}
  //     >
  //       Delete
  //     </button>
  //     },
  // ]

  const AllAppointment = useSelector((state) => state.data.Appointments);

  // const DeleteAppoint = (id) => {
  //   disptach(DeleteAppointment(id));
  // };
  // useEffect(() => {
  //   disptach(GetAllAppointment());
  // }, []);

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
          <ToastContainer />

      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">

        <div className="Payment_Page">
          <h1 style={{ marginBottom: "2rem" }}>Appointment Details</h1>
          <div className="wardBox">
            <Table columns={columns} dataSource={mappedAppointments} />
          </div>
        </div>

          {/* <div className="Payment_Page">
            <h1 style={{ marginBottom: "2rem" }}>Appointment Details</h1>
            <div className="patientBox">
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Mobile</th>
                    <th>Disease</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Resolve</th>
                  </tr>
                </thead>
                <tbody>
                  {AllAppointment?.map((ele) => {
                    return (
                      <tr>
                        <td>{ele.patientName}</td>
                        <td>{ele.mobile}</td>
                        <td>{ele.disease}</td>
                        <td>{ele.department}</td>
                        <td>{ele.date}</td>
                        <td>
                          <button
                            style={{
                              border: "none",
                              color: "red",
                              outline: "none",
                              background: "transparent",
                              cursor: "pointer",
                            }}
                            onClick={() => DeleteAppoint(ele._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Check_Appointment;
