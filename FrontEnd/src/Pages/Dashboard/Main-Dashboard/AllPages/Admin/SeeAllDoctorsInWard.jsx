import { Table } from "antd";
import { useEffect, useState,  } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import {
  DeleteAppointment,
  GetAllAppointment,
  cancleAppointment,
  getAllDoctorsInWard
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = (text) => toast(text);



const SeeAllDoctorsInWard = () => {
  const { data } = useSelector((store) => store.auth);

  const { wardId, wardName } = useParams();
  console.log("wardId, wardName", wardId, wardName);

  const dispatch = useDispatch();

  const [fetchedDoctors, setFetchedDoctors] = useState([])
  const [mappedDoctors, setMappedDoctors] = useState([])
  // const [isCancelled, setIsCancelled] = useState(false)

  // const { doc_id } = useParams();
  // console.log("doc_id", doc_id);

  const columns = [
    { title: "Name", dataIndex: "docName", key: "docName"},
    { title: "ward", dataIndex: "wardName", key: "wardName"},
    { title: "address", dataIndex: "address", key: "address"},
    { title: "Available", dataIndex: "isAvailable", key: "isAvailable"},
    { title: "Email", dataIndex: "email", key: "email"},
    { title: "phone#", dataIndex: "phoneNumber", key: "phoneNumber"},
    // { title: "", dataIndex: "cancel", key: ""},
  ];

  // const handleCancelAppointment = (id) => {
  //   let clickedOk = window.confirm("Warning!!!\nYou are about to cancel an appointment\nContinue?");
  //   if(clickedOk === true) {
  //       dispatch(cancleAppointment(id)).then((res) => {
  //         console.log('res', res)
  //           notify(res.message)
  //           if(res.message === "appointment cancelled") {
  //             setIsCancelled(true)
  //           }
  //         })
  //         .catch(err => {
  //           notify(err.message)
  //         })
  //   }
  // }

  const mapDoctors = () => {
    let arr = []
    if(fetchedDoctors?.length > 0) {
      fetchedDoctors.forEach((info)=>{
        let obj = {};
        obj.key = info?._id
        obj.docName = info?.docName
        obj.wardName = info?.wardID?.wardName;
        obj.address = info?.address;
        obj.isAvailable = info?.isAvailable === true ? "Yes": "No";
        obj.email = info?.email;
        obj.phoneNumber = info?.mobile;
      //   obj.status = info?.doctorstatus;
      //   obj.cancel =  info?.doctorstatus === "Scheduled" ? <button
      //   style={{
      //     border: "none",
      //     color: "red",
      //     outline: "none",
      //     background: "transparent",
      //     cursor: "pointer",
      //   }}
      //   onClick={() => handleCancelAppointment(info._id)}
      // >
      //   Cancel
      // </button> : ""
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
    

  setMappedDoctors([...arr])

  }


  useEffect(()=> {

    if(wardId) {
      dispatch(getAllDoctorsInWard(wardId)).then(res => {
        console.log("res from getalldoctorsin ward", res);
        if(res.message === "fetched ward doctors") {
          // setPatientForAdmissionInfo(res.patient)
          setFetchedDoctors(res.doctors)
        }
      })
    }
    
    
  }, [])

  // useEffect(()=> {
  //   if(isCancelled === true) {
  //     dispatch(getAllDoctorsInWard(wardId)).then(res => {
  //       console.log("res from getalldoctorsin ward", res);
  //       if(res.message === "fetched ward doctors") {
  //         // setPatientForAdmissionInfo(res.patient)
  //         setFetchedDoctors(res.doctors)
  //       }
  //     })
  //   }
  //   // setIsCancelled(false)
    
  // }, [isCancelled, data])

  useEffect(()=> {
    console.log('fetchedDoctors', fetchedDoctors)
    mapDoctors()

  }, [fetchedDoctors])




  

  // const doctors = [
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

  // const AllAppointment = useSelector((state) => state.data.doctors);

  // const DeleteAppoint = (id) => {
  //   disptach(DeleteAppointment(id));
  // };
  // useEffect(() => {
  //   disptach(GetAllAppointment());
  // }, []);

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor" && data?.user.userType !== "admin" && data?.user.userType !== "nurse") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
          <ToastContainer />

      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">

        <div className="Payment_Page">
          <h1 style={{ marginBottom: "2rem" }}>{wardName} DOCTORS</h1>
          <div className="wardBox">
            <Table columns={columns} dataSource={mappedDoctors} />
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

export default SeeAllDoctorsInWard;
