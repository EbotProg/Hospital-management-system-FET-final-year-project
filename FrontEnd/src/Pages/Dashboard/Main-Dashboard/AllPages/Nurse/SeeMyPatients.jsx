import { Table } from "antd";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  SearchMyPatient,
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

  const disptach = useDispatch();

  const columns = [
    { title: "Patient Name", dataIndex: "patientName"},
    { title: "Doctor", dataIndex: "doctorName"},
    { title: "Disease", dataIndex: "disease"},
    { title: "Ward", dataIndex: "ward"},
    { title: "Date", dataIndex: "date"}
  ];

  const PatientMedicalHistory = [
      { 
        patientName: "Achale Ebot",
        doctor: "John Doe",
        disease: "Cough",
        ward: "maternity",
        date: "2022-01-01"
      }
  ]

  const InitData = {
    patientName: "",
    id: data.user._id 
  };
  const [patientSearchInput, setPatientSearchInput] = useState(InitData);

  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  const handleSearchInputsChange = (e) => {
    setPatientSearchInput({
      ...patientSearchInput,
      [e.target.name]: e.target.value,
    });
    console.log('patientSearchInput', patientSearchInput);
  };

  const handlePatientSearchSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    dispatch(SearchMyPatient(patientSearchInput));
    setloading(false);
    setPatientSearchInput(InitData);
    notify("Got Your Patient(s)");
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
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">

        <div className="mainAmbupance">
            <h1>Search My Patients</h1>

            {/* ******************************************************** */}
            <form onSubmit={handlePatientSearchSubmit}>
              <div>
                <label>Patient Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="name"
                    name="patientName"
                    value={patientSearchInput.patientName}
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
          <h1 style={{ marginTop: "2rem", marginBottom: "2rem" }}>My Patient(s)</h1>
          <div className="wardBox">
            <Table columns={columns} dataSource={PatientMedicalHistory} />
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
