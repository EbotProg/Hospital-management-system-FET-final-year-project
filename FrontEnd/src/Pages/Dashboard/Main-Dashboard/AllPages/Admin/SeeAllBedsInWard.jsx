import { Table } from "antd";
import { useEffect, useState,  } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import {
  DeleteAppointment,
  GetAllAppointment,
  cancleAppointment,
  getAllBedsInWard
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = (text) => toast(text);



const SeeAllBedsInWard = () => {
  const { data } = useSelector((store) => store.auth);

  const { wardId, wardName } = useParams();
  console.log("wardId, wardName", wardId, wardName);

  const dispatch = useDispatch();

  const [fetchedBeds, setFetchedBeds] = useState([])
  const [mappedBeds, setMappedBeds] = useState([])
  // const [isCancelled, setIsCancelled] = useState(false)

  // const { doc_id } = useParams();
  // console.log("doc_id", doc_id);

  const columns = [
    { title: "Bed#", dataIndex: "bedNumber", key: "bedNumber"},
    { title: "ward", dataIndex: "wardName", key: "wardName"},
    { title: "Available", dataIndex: "isAvailable", key: "isAvailable"},
    // { title: "Email", dataIndex: "email", key: "email"},
    // { title: "phone#", dataIndex: "phoneNumber", key: "phoneNumber"},
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

  const mapBeds = () => {
    let arr = []
    if(fetchedBeds?.length > 0) {
      fetchedBeds.forEach((info)=>{
        let obj = {};
        obj.key = info?._id
        obj.bedNumber = info?.bedNumber
        obj.wardName = info?.wardID?.wardName;
        obj.isAvailable = info?.isAvailable === true ? "Yes": "No";
        // obj.email = info?.email;
        // obj.phoneNumber = info?.mobile;
      //   obj.status = info?.bedstatus;
      //   obj.cancel =  info?.bedstatus === "Scheduled" ? <button
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
    

  setMappedBeds([...arr])

  }


  useEffect(()=> {

    if(wardId) {
      dispatch(getAllBedsInWard(wardId)).then(res => {
        console.log("res from getallbedsin ward", res);
        if(res.message === "fetched ward beds") {
          // setPatientForAdmissionInfo(res.patient)
          setFetchedBeds(res.beds)
        }
      })
    }
    
    
  }, [])

  // useEffect(()=> {
  //   if(isCancelled === true) {
  //     dispatch(getAllBedsInWard(wardId)).then(res => {
  //       console.log("res from getallbedsin ward", res);
  //       if(res.message === "fetched ward beds") {
  //         // setPatientForAdmissionInfo(res.patient)
  //         setFetchedBeds(res.beds)
  //       }
  //     })
  //   }
  //   // setIsCancelled(false)
    
  // }, [isCancelled, data])

  useEffect(()=> {
    console.log('fetchedBeds', fetchedBeds)
    mapBeds()

  }, [fetchedBeds])




  

  // const beds = [
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

  // const AllAppointment = useSelector((state) => state.data.beds);

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
          <h1 style={{ marginBottom: "2rem" }}>{wardName} BEDS</h1>
          <div className="wardBox">
            <Table columns={columns} dataSource={mappedBeds} />
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

export default SeeAllBedsInWard;
