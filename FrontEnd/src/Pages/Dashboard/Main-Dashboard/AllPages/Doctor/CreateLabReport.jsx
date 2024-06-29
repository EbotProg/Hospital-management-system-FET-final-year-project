import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CreatePayment, CreateLabReport, GetLabReports } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Table } from "antd";
const notify = (text) => toast(text);

const CreateLabReports = () => {
  const { data } = useSelector((store) => store.auth);



  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  
  // const [Report, setReport] = useState();


  const InitData = {
    docID: "",
    patientID: "",
    haemoglobin: "",
    redBloodCellCount: "",
    whiteBloodCellCount: "",
    thrombocytes: "",
    glucose: "",
    sodium: "",
    potassium: "",
    dateTime: ""
  };

  const columns = [
    { title: "Doctor Name", dataIndex: "docName", key: "docName"},
    { title: "Patient Name", dataIndex: "patientName", key: "patientName"},
    { title: "Haemoglobin", dataIndex: "haemoglobin", key: "haemoglobin"},
    { title: "RBCs", dataIndex: "rbc", key: "rbc"},
    { title: "WBCs", dataIndex: "wbc", key: "wbc"},
    { title: "Thrombocytes", dataIndex: "thrombocytes", key: "thrombocytes"},
    { title: "Glucose", dataIndex: "glucose", key: "glucose" },
    { title: "Sodium", dataIndex: "sodium", key: "sodium" },
    { title: "Date", dataIndex: "dateTime", key: "dateTime"},
  ];

  const [labReportValue, setLabReportValue] = useState(InitData);
  const [fetchedLabReports, setFetchedLabReports] = useState([])
  const [mappedLabReports, setMappedLabReports] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)


  const mapAdmissionRepInfo = () => {
    let arr = []
    if(fetchedLabReports?.length > 0) {
      fetchedLabReports.forEach((info)=>{
        let obj = {};
        obj.key = info?._id
        obj.docName = info?.doc_id?.docName;
        obj.patientName = info?.patient_id?.patientID ? `${info?.patient_id?.firstName} ${info?.patient_id?.lastName}`: "";
        obj.haemoglobin = info?.haemoglobin;
        obj.rbc = info?.redBloodCellCount;
        obj.wbc = info?.whiteBloodCellCount;
        obj.thrombocytes = info?.thrombocytes;
        obj.glucose = info?.glucose;
        obj.sodium = info?.sodium;
        obj.dateTime = info?.dateTime;
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
    

  setMappedLabReports([...arr])

  }




  useEffect(()=> {

    
    setLabReportValue({ ...labReportValue, docID: data?.user.docID})


    dispatch(GetLabReports()).then(res => {
      console.log('get all labrep res', res)
      setFetchedLabReports(res.labReports);
    })
    
  }, [])

  useEffect(()=> {
    if(isSubmitted === true) {
      dispatch(GetLabReports()).then(res => {
        console.log('get all labrep res', res)
        setFetchedLabReports(res.labReports);
      })
    }
    setIsSubmitted(false)
    
  }, [isSubmitted])

  useEffect(()=> {
    console.log('fetchedLabReports', fetchedLabReports)
    mapAdmissionRepInfo()

  }, [fetchedLabReports])




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
        console.log("res from createlabrep", res)
        if (res.error) {
          setLoading(false);
          notify(res.error);

        } else {
          if(res.message === "Lab Report Created") {
            notify(res.message)
            setIsSubmitted(true)
            setLabReportValue(InitData)
          }
          setLoading(false);
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
                <label>Your ID</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="e.g. Doc-kf3l2ks7"
                    name="docID"
                    value={labReportValue.docID}
                    onChange={handleLabReportChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Patient ID</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="e.g. Pt-kf3l2ks7"
                    name="patientID"
                    value={labReportValue.patientID}
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
                    name="redBloodCellCount"
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
                    type="datetime-local"
                    placeholder="dd-mm-yyyy"
                    name="dateTime"
                    value={labReportValue.dateTime}
                    onChange={handleLabReportChange}
                  />
                </div>
              </div>
              

              <button
                className="formsubmitbutton bookingbutton"
                onClick={handleLabReportSubmit}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>

          <div className="view_lab_report_div">
          <h1 style={{ marginBottom: "2rem" }}>View Lab Reports</h1>
          <div className="wardBox">
            <Table columns={columns} dataSource={mappedLabReports} />
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
                        <td>{ele.dateTime}</td>
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
