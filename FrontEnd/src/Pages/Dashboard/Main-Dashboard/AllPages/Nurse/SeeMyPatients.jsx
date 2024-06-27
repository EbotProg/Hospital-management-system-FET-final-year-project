import { Table } from "antd";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  SearchPatients,
  GetPatients,
  GetMedHistory,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
const notify = (text) => toast(text);


const SeeMyPatients = () => {
  const { data } = useSelector((store) => store.auth);

  // const {
  //   data: { user },
  // } = useSelector((state) => state.auth);

  const dispatch = useDispatch();


  const columns = [
    { title: "ID", dataIndex: "patientID", key: "patientID"},
    { title: "Full names", dataIndex: "fullNames", key: "fullNames"},
    { title: "Ward", dataIndex: "wardName", key: "wardName"},
    { title: "Room#", dataIndex: "roomNumber", key: "roomNumber"},
    { title: "Bed#", dataIndex: "bedNumber", key: "bedNumber"},
    { title: "Added on", dataIndex: "date", key: "date"}
  ];

  // const PatientMedicalHistory = [
  //     { 
  //       patientName: "Achale Ebot",
  //       doctor: "John Doe",
  //       disease: "Cough",
  //       ward: "maternity",
  //       date: "2022-01-01"
  //     }
  // ]

  const InitData = {
    searchBy: "",
    // id: data.user._id 
  };

  const fieldNames = {
    searchBy: {
      type: "text",
      placeholder: "",
      name: "searchBy",
    },
    patientID: {
      type: "text",
      name: "patientID",
      placeholder: "e.g. Pt-1k3l2l37",
    },
    wardName: {
      type: "text",
      name: "wardName",
      placeholder: "e.g. surgical ward",
    },
    roomNumber: {
      type: "number",
      name: "roomNumber",
      placeholder: "e.g. 1",
    },
    bedNumber: {
      type: "number",
      name: "bedNumber",
      placeholder: "e.g. 1",
    },
    patientName: {
      type: "text",
      name: "patientName",
      placeholder: "e.g. Ayuk Bessem"
    }
  }

  const [patientSearchInput, setPatientSearchInput] = useState(InitData);
  const [fieldName, setFieldName] = useState("searchBy")
  const [fetchedPatients, setFetchedPatients] = useState([])
  const [mappedPatients, setMappedPatients] = useState([])

  const [input, setInput] = useState({...fieldNames["searchBy"]})

  const [loading, setloading] = useState(false);


  const mapPatientInfo = () => {
    let arr = []
    fetchedPatients.forEach((patient)=>{
      let obj = {};
      obj.key = patient._id
      obj.patientID = patient.patientID;
      obj.fullNames = `${patient.firstName} ${patient.lastName}`;
      obj.wardName = patient?.wardID?.wardName || "";
      obj.roomNumber = patient?.roomID?.roomNumber || "";
      obj.bedNumber = patient?.bedID?.bedNumber;
      obj.date = patient?.timeStamp ? new Date(patient.timeStamp).toLocaleDateString() : "";
    //   obj.viewMore = <button
    //   style={{
    //     border: "none",
    //     color: "blue",
    //     outline: "none",
    //     background: "transparent",
    //     cursor: "pointer",
    //   }}
    //   onClick={() => handleViewMorePatientInfo(patient._id)}
    // >
    //   View more
    // </button>
    //   obj.dischargeAdmit = patient.admitted === true?  <button
    //   style={{
    //     border: "none",
    //     color: "green",
    //     outline: "none",
    //     background: "transparent",
    //     cursor: "pointer",
    //   }}
    //   onClick={() => dischargePatient(patient._id)}
    // >
    //   discharge
    // </button> : <button
    //   style={{
    //     border: "none",
    //     color: "green",
    //     outline: "none",
    //     background: "transparent",
    //     cursor: "pointer",
    //   }}
    //   onClick={() => admitPatient(patient._id)}
    // >
    //   admit
    // </button>

    arr.push(obj);
    
  });

  setMappedPatients([...arr])

  }
  

  useEffect(() => {
    dispatch(GetPatients()).then(res => {
      console.log("res from getall fetchedPatients", res);
      setFetchedPatients(res.patients)
    });
  }, []);


  useEffect(()=> {

      console.log('fetchedPatients', fetchedPatients)
   mapPatientInfo()

  }, [fetchedPatients])

  const handleFieldNameChange = (e) => {
    setFieldName(e.target.value)
    const data = {};
    data[e.target.value] = "";
    setPatientSearchInput(data)
    setInput(fieldNames[e.target.value])
  }

  useEffect(()=>{
    console.log('fieldName', fieldName)
    console.log('patientSearchInput', patientSearchInput)
  }, [fieldName, patientSearchInput])

  const handleSearchInputsChange = (e) => {
    setPatientSearchInput({
      ...patientSearchInput,
      [e.target.name]: e.target.value,
    });
    console.log('patientSearchInput', patientSearchInput);
  };

  const handlePatientSearchSubmit = (e) => {
    e.preventDefault();
    const obj = { ...patientSearchInput };
    if(obj.hasOwnProperty("searchBy")) {
      return notify("You must select one of the options")
    }
    setloading(true);
    console.log("patientSearchInput", patientSearchInput);
    dispatch(SearchPatients(patientSearchInput)).then(res => {
     console.log("res from search fetchedPatients", res);

     if(res.error) {
      setloading(false);
      return notify(res.error)
     }else {

      if(res.message === "fetched patient(s)") {
        setFetchedPatients(res.patients)
        notify(res.message); 
        setPatientSearchInput(InitData);
        setFieldName("searchBy")
        setInput({...fieldNames["searchBy"]})
      }
      setloading(false);
     }
    });
    
  };

  // const MedHistory = useSelector((state) => state.data.PatientMedicalHistory);

  
  // useEffect(() => {
  //   disptach(GetMedHistory());
  // }, []);

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor" && data?.user.userType !== "nurse") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
    <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">

        <div className="mainAmbupance">
            <h1>Search Patients</h1>

            {/* ******************************************************** */}
            <form onSubmit={handlePatientSearchSubmit}>
              <div>
                <label>Search By</label>
                <div className="inputdiv">
                <select name={fieldName} value={fieldName} onChange={e => handleFieldNameChange(e)}>
                    <option value="searchBy">Search By</option>
                    <option value="patientID">patient ID</option>
                    <option value="wardName">Ward</option>
                    <option value="roomNumber">Room</option>
                    <option value="bedNumber">Bed</option>
                    <option value="patientName">Patient Name</option>
                  </select>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    value={patientSearchInput[fieldName]}
                    onChange={handleSearchInputsChange}
                    required
                  />
                  
                </div>
              </div>
              

              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
              
            </form>
          </div>
        <div className="Payment_Page">
          <h1 style={{ marginTop: "2rem", marginBottom: "2rem" }}>Patient(s)</h1>
          <div className="wardBox">
            <Table columns={columns} dataSource={mappedPatients} />
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
                  {MedHistory?.map((ele) => {
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

export default SeeMyPatients;
