import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CreatePayment, CreateLabReport } from "../../../../../Redux/Datas/action";
import { GetLabReports } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Table } from "antd";
const notify = (text) => toast(text);

const CreateLabReports = () => {
  const { data } = useSelector((store) => store.auth);

 

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  
  const [Report, setReport] = useState();
  useEffect(() => {
    dispatch(GetLabReports()).then((res) => {
      setReport(res);
    });
  }, []);

  const InitData = {
    docName: "",
    patientName: "",
    haemoglobin: "",
    redBloodCellCount: "",
    whiteBloodCellCount: "",
    thrombocytes: "",
    glucose: "",
    sodium: "",
    potassium: "",
    date: "",
    time: ""
  };

  const columns = [
    { title: "Doctor Name", dataIndex: "docName"},
    { title: "Patient Name", dataIndex: "patientName"},
    { title: "Haemoglobin", dataIndex: "haemoglobin"},
    { title: "RBCs", dataIndex: "redBloodCellCount" },
    { title: "WBCs", dataIndex: "whiteBloodCellCount"},
    { title: "Thrombocytes", dataIndex: "thrombocytes" },
    { title: "Glucose", dataIndex: "glucose" },
    { title: "Sodium", dataIndex: "sodium" },
    { title: "Date", dataIndex: "date" },
    { title: "Time", dataIndex: "time" },
  ];

  const [labReportValue, setLabReportValue] = useState(InitData);

  const handleLabReportChange = (e) => {
    setLabReportValue({ ...labReportValue, [e.target.name]: e.target.value });
  };


  const handleLabReportSubmit = (e) => {
    e.preventDefault();
    let data = {
      ...labReportValue,
    };
    try {
      setLoading(true);
      dispatch(CreateLabReport(data)).then((res) => {
        if (res.message === "LabReport successfully created") {
          notify("LabReport Created Sucessfully");
          setLoading(false);
          setLabReportValue(InitData);
        } else {
          setLoading(false);
          notify("Something went Wrong");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="Main_Add_Doctor_div">
            <h1>Create Lab Report</h1>
            <form>
              <div>
                <label>Doctor Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="docName"
                    value={labReportValue.docName}
                    onChange={handleLabReportChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Patient Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="patientName"
                    value={labReportValue.patientName}
                    onChange={handleLabReportChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Haemoglobin</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="No"
                    name="haemoglobin"
                    value={labReportValue.haemoglobin}
                    onChange={handleLabReportChange}
                  />
                </div>
              </div>

              <div>
                <label>Red BLood Cell Count</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="No"
                    name="redBLoodCellCount"
                    value={labReportValue.redBloodCellCount}
                    onChange={handleLabReportChange}
                  />
                </div>
              </div>

              <div>
                <label>White Blood Cell Count</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="No"
                    name="whiteBloodCellCount"
                    value={labReportValue.whiteBloodCellCount}
                    onChange={handleLabReportChange}
                  />
                </div>
              </div>

              <div>
                <label>Thrombocytes</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="No"
                    name="thrombocytes"
                    value={labReportValue.thrombocytes}
                    onChange={handleLabReportChange}
                  />
                </div>
              </div>

              <div>
                <label>Glucose</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="No"
                    name="glucose"
                    value={labReportValue.glucose}
                    onChange={handleLabReportChange}
                  />
                </div>
              </div>

              <div>
                <label>Sodium</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="No"
                    name="sodium"
                    value={labReportValue.sodium}
                    onChange={handleLabReportChange}
                  />
                </div>
              </div>

              <div>
                <label>Potassium</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="No"
                    name="potassium"
                    value={labReportValue.potassium}
                    onChange={handleLabReportChange}
                  />
                </div>
              </div>
           
              <div>
                <label>Date</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    name="date"
                    value={labReportValue.date}
                    onChange={handleLabReportChange}
                  />
                </div>
              </div>
              <div>
                <label>Time</label>
                <div className="inputdiv">
                  <input
                    type="time"
                    name="time"
                    value={labReportValue.time}
                    onChange={handleLabReportChange}
                  />
                </div>
              </div>

              <button
                className="formsubmitbutton bookingbutton"
                onClick={handleLabReportSubmit}
              >
                {loading ? "Loading..." : "Generate Report"}
              </button>
            </form>
          </div>

          <div className="view_lab_report_div">
          <h1 style={{ marginBottom: "2rem" }}>View Lab Reports</h1>
          <div className="wardBox">
            <Table columns={columns} dataSource={Report} />
          </div>
        </div>

          {/* <div className="Payment_Page view_lab_report_div">
            <h1 style={{ marginBottom: "2rem" }}>View Lab Reports</h1>
            <div className="patientBox">
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Department</th>
                    <th>Doctor Name</th>
                    <th>Patient Mobile</th>
                    <th>Patient Age</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Report?.map((ele) => {
                    return (
                      <tr>
                        <td>{ele.patientName}</td>
                        <td>{ele.docDepartment}</td>
                        <td>{ele.docName}</td>
                        <td>{ele.patientMobile}</td>
                        <td>{ele.patientAge}</td>
                        <td>{ele.date}</td>
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

export default CreateLabReports;
