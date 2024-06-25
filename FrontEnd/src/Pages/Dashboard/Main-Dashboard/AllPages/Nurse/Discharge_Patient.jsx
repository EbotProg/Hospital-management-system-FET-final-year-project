import React, { useState, useEffect } from "react";
import { message, Upload } from "antd";
import doctor from "../../../../../img/doctoravatar.png";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "antd";

import {
  dischargePatientInfos,
  getAdmissionReport,
  getAllDischargeReports,
  CreateBeds,
  EditSingleBed,
  GetSingleBed,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { Navigate, useParams } from "react-router-dom";

const notify = (text) => toast(text);

const Discharge_Patient = () => {

  const columns = [
    { title: "PatientID", dataIndex: "patientID", key: "patientID" },
    { title: "NurseID(DischargedBy)", dataIndex: "nurseID", key: "nurseID" },
    { title: "Ward", dataIndex: "wardName", key: "wardName" },
    { title: "Room#", dataIndex: "roomNumber", key: "roomNumber" },
    { title: "Bed#", dataIndex: "bedNumber", key: "bedNumber" },
    { title: "DischargedOn", dataIndex: "dateTime", key: "dateTime" },
    { title: "Disease", dataIndex: "disease", key: "disease" },
    // { title: "", dataIndex: "viewMore", key: "veiwMore" },
  ];
 

  const { admissionReportId } = useParams();
  console.log("admissionReportId", admissionReportId);

  const [loading, setLoading] = useState(false);
  const [fetchedDischargeReports, setFetchedDischargeReports] = useState([])
  const [mappedDischargeReports, setMappedDischargeReports] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.auth);



  const InitData = {
    patientID: "",
    nurseID: "",
    wardName: "",
    roomNumber: "",
    bedNumber: "",
    disease: "",
    details: "",
    dateTime: ""
  };
  const [dischargePatientInfo, setDischargePatientInfo] = useState(InitData);

  const mapDischargeRepInfo = () => {
    let arr = []
    if(fetchedDischargeReports?.length > 0) {
      fetchedDischargeReports.forEach((info)=>{
        let obj = {};
        obj.key = info?._id
        obj.patientID = info?.patientID?.patientID;
        obj.nurseID = info?.nurseID?.nurseID;
        obj.wardName = info?.wardID?.wardName;
        obj.roomNumber = info?.roomID?.roomNumber;
        obj.bedNumber = info?.bedID?.bedNumber;
        obj.dateTime = info?.dateTime;
        obj.disease = info?.disease;
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
    

  setMappedDischargeReports([...arr])

  }

  useEffect(()=> {

    if(admissionReportId) {
      dispatch(getAdmissionReport(admissionReportId)).then(res => {
        console.log("res from get admissionreport", res);
        if(res.message === "admissionReport found") {
          // setPatientForAdmissionInfo(res.patient)
          setDischargePatientInfo({ 
            ...dischargePatientInfo, 
            patientID:  res.admissionReport.patientID.patientID, 
            nurseID: res.admissionReport.nurseID.nurseID,
            wardName: res.admissionReport.wardID.wardName,
            roomNumber: res.admissionReport.roomID.roomNumber,
            bedNumber: res.admissionReport.bedID.bedNumber,
            disease: res.admissionReport.disease,
            details: res.admissionReport.details,
          })
        }
      })
    }
    setDischargePatientInfo({ ...dischargePatientInfo, nurseID: data?.user.nurseID})


    dispatch(getAllDischargeReports()).then(res => {
      console.log('get all discharge reports res', res)
      setFetchedDischargeReports(res);
    })
    
  }, [])

  useEffect(()=> {
    if(isSubmitted === true) {
      dispatch(getAllDischargeReports()).then(res => {
        console.log('get all dischargereports res', res)
        setFetchedDischargeReports(res);
      })
    }
    setIsSubmitted(false)
    
  }, [isSubmitted])

  useEffect(()=> {
    console.log('fetchedDischargeReports', fetchedDischargeReports)
    mapDischargeRepInfo()

  }, [fetchedDischargeReports])




  const handledischargePatientInfoChange = (e) => {
    setDischargePatientInfo({ ...dischargePatientInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitDischargePatientInfo = (e) => {
    e.preventDefault();
    
      setLoading(true);
      
      dispatch(dischargePatientInfos(dischargePatientInfo)).then((res) => {
            
        console.log("res from discharge info", res);
        if(res.error) {
          setLoading(false)
          return notify(res.error)
        }

        if(res.message === "patient discharged") {
          setIsSubmitted(true);
          notify(res.message);
        }
        setLoading(false);
        setDischargePatientInfo(InitData)
          });
   
  };

  // const handleChange = (info) => {
  //   if (info.file.status === "uploading") {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === "done") {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, (url) => {
  //       setLoading(false);
  //       setImageUrl(url);
  //     });
  //   }
  // };

  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // );

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "nurse") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Discharge Patient</h1>
            <img src={doctor} alt="doctor" className="avatarimg" />

            <form onSubmit={handleSubmitDischargePatientInfo}>
              {/* Name PlaceHolder */}

              <div>
                <label>Patient ID</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="e.g. Pt-k1k2k2gh"
                    name="patientID"
                    // value={!admissionReportId || !patientForAdmissionInfo ? dischargePatientInfo.patientName : `${patientForAdmissionInfo.firstName} ${patientForAdmissionInfo.lastName}`}
                    value={ dischargePatientInfo.patientID}

                    onChange={handledischargePatientInfoChange}
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
                      placeholder="e.g. Nrs-kdj12kjd"
                      name="nurseID"
                      value={dischargePatientInfo.nurseID}
                      onChange={handledischargePatientInfoChange}
                      required
                    />
                  </div>
                </div>

              {/* EMAIL PLACEHOLDER  */}
              <div>
                <label>Ward Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="ward name"
                    name="wardName"
                    value={dischargePatientInfo.wardName}
                    onChange={handledischargePatientInfoChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Room Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="room number"
                    name="roomNumber"
                    value={dischargePatientInfo.roomNumber}
                    onChange={handledischargePatientInfoChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Bed Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="bed number"
                    name="bedNumber"
                    value={dischargePatientInfo.bedNumber}
                    onChange={handledischargePatientInfoChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Disease</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="disease"
                    name="disease"
                    value={dischargePatientInfo.disease}
                    onChange={handledischargePatientInfoChange}
                  />
                </div>
              </div>

              <div>
                <label>DateTime</label>
                <div className="inputdiv">
                  <input
                    type="datetime-local"
                    name="dateTime"
                    value={dischargePatientInfo.dateTime}
                    onChange={handledischargePatientInfoChange}
                    required
                  />
                </div>
              </div>

          
             
              <div>
                <label>Details</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Details"
                    name="details"
                    value={dischargePatientInfo.details}
                    onChange={handledischargePatientInfoChange}
                  />
                </div>
              </div>

           
        
              {/* ADD IMAGES  */}
              {/* <div>
            <label>Image</label>
            <div className="inputdiv">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                style={{ display: "block" }}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
          </div> */}
              {/* SUBMIT BUTTON  */}

              <button
                type="submit"
                className="formsubmitbutton"
                style={{ width: "20%" }}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>

          <div className="wardDetails">
          <h1>Discharge History</h1>
          <div className="wardBox">
            <Table columns={columns} dataSource={mappedDischargeReports} />
          </div>
        </div>


        </div>
      </div>
    </>
  );
};

export default Discharge_Patient;
