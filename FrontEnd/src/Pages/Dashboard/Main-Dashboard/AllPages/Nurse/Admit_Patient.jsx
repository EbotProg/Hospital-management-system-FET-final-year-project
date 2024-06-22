import React, { useState, useEffect } from "react";
import { message, Upload } from "antd";
import doctor from "../../../../../img/doctoravatar.png";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table} from "antd"
import {
  admitPatientInfos,
  getPatient,
  getAllAdmissionReports,
  CreateBeds,
  EditSingleBed,
  GetSingleBed,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { Navigate, useParams } from "react-router-dom";

const notify = (text) => toast(text);

const Admit_Patient = () => {
 
  const columns = [
    { title: "PatientID", dataIndex: "patientID", key: "patientID" },
    { title: "NurseID(AdmittedBy)", dataIndex: "nurseID", key: "nurseID" },
    { title: "Ward", dataIndex: "wardName", key: "wardName" },
    { title: "Room#", dataIndex: "roomNumber", key: "roomNumber" },
    { title: "Bed#", dataIndex: "bedNumber", key: "bedNumber" },
    { title: "admittedOn", dataIndex: "timeStamp", key: "timeStamp" },
    { title: "Disease", dataIndex: "disease", key: "disease" },
    // { title: "", dataIndex: "viewMore", key: "veiwMore" },
  ];

  const [loading, setLoading] = useState(false);
  const [fetchedadmissionReports, setFetchedadmissionReports] = useState([])
  const [mappedadmissionReports, setMappedadmissionReports] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.auth);


  const { patientId } = useParams();
  console.log("patientId", patientId);


  const mapAdmissionRepInfo = () => {
    let arr = []
    if(fetchedadmissionReports?.length > 0) {
      fetchedadmissionReports.forEach((info)=>{
        let obj = {};
        obj.key = info?._id
        obj.patientID = info?.patientID?.patientID;
        obj.nurseID = info?.nurseID?.nurseID;
        obj.wardName = info?.wardID?.wardName;
        obj.roomNumber = info?.roomID?.roomNumber;
        obj.bedNumber = info?.bedID?.bedNumber;
        obj.timeStamp = info?.timeStamp;
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
    

  setMappedadmissionReports([...arr])

  }



  useEffect(()=> {

    if(patientId) {
      dispatch(getPatient(patientId)).then(res => {
        console.log("res from get patient", res);
        if(res.message === "patient found") {
          // setPatientForAdmissionInfo(res.patient)
          setAdmitPatientInfo({ ...admitPatientInfo, patientID:  res.patient.patientID, nurseID: data?.user.nurseID})
        }
      })
    }
    setAdmitPatientInfo({ ...admitPatientInfo, nurseID: data?.user.nurseID})


    dispatch(getAllAdmissionReports()).then(res => {
      console.log('get all admissionrep res', res)
      setFetchedadmissionReports(res);
    })
    
  }, [])

  useEffect(()=> {
    if(isSubmitted === true) {
      dispatch(getAllAdmissionReports()).then(res => {
        console.log('get all admissionrep res', res)
        setFetchedadmissionReports(res);
      })
    }
    setIsSubmitted(false)
    
  }, [isSubmitted])

  useEffect(()=> {
    console.log('fetchedadmissionReports', fetchedadmissionReports)
    mapAdmissionRepInfo()

  }, [fetchedadmissionReports])


  

  const InitData = {
    patientID: "",
    nurseID: "",
    wardName: "",
    roomNumber: "",
    bedNumber: "",
    disease: "",
    details: "",
    timeStamp: "",
    // time: ""
  };


  const [admitPatientInfo, setAdmitPatientInfo] = useState(InitData);

  const handleAdmitPatientInfoChange = (e) => {
    setAdmitPatientInfo({ ...admitPatientInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitPatientInfo = (e) => {
    e.preventDefault();

    if (
      admitPatientInfo.patientID === "" ||
      admitPatientInfo.nurseID === "" ||
      admitPatientInfo.wardName === "" ||
      admitPatientInfo.bedNumber === "" ||
      admitPatientInfo.disease === "" ||
      admitPatientInfo.timeStamp === "" ||
      admitPatientInfo.roomNumber === ""
    ) {
      return notify("Please Enter All the Requried Feilds");
    }
  
      setLoading(true);
      
      dispatch(admitPatientInfos(admitPatientInfo)).then((res) => {
          console.log("res from admission info", res);
          if(res.error) {
            setLoading(false)
            return notify(res.error)
          }

          if(res.message === "patient admitted") {
            setIsSubmitted(true);
            notify(res.message);
          }
          setLoading(false);
          setAdmitPatientInfo(InitData)
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
            <h1>Admit Patient</h1>
            <img src={doctor} alt="doctor" className="avatarimg" />

            <form onSubmit={handleSubmitPatientInfo}>
              {/* Name PlaceHolder */}
              <div>
                <label>Patient ID</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="e.g. Pt-k1k2k2gh"
                    name="patientID"
                    // value={!patientId || !patientForAdmissionInfo ? admitPatientInfo.patientName : `${patientForAdmissionInfo.firstName} ${patientForAdmissionInfo.lastName}`}
                    value={ admitPatientInfo.patientID}

                    onChange={handleAdmitPatientInfoChange}
                    required
                  />
                </div>
              </div>

              <div>
                  <label>Your ID</label>
                  <div className="inputdiv">
                    <input
                      type="text"
                      placeholder="e.g. Nrs-kdj12kjd"
                      name="nurseID"
                      value={admitPatientInfo.nurseID}
                      onChange={handleAdmitPatientInfoChange}
                      required
                    />
                  </div>
                </div>

              {/* {
                data?.user.userType === "doctor" ?
                (<div>
                  <label>Doctor Name</label>
                  <div className="inputdiv">
                    <input
                      type="text"
                      placeholder="Doctor Full Name"
                      name="doctorName"
                      value={admitPatientInfo.doctorName}
                      onChange={handleAdmitPatientInfoChange}
                    />
                  </div>
                </div>) :
                (<div>
                  <label>Nurse Name</label>
                  <div className="inputdiv">
                    <input
                      type="text"
                      placeholder="Nurse Full Name"
                      name="nurseName"
                      value={admitPatientInfo.nurseName}
                      onChange={handleAdmitPatientInfoChange}
                      required
                    />
                  </div>
                </div>)
              } */}
              
              {/* AGE PLACEHOLDER  */}
              
              {/* EMAIL PLACEHOLDER  */}
              <div>
                <label>Ward Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="ward name"
                    name="wardName"
                    value={admitPatientInfo.wardName}
                    onChange={handleAdmitPatientInfoChange}
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
                    value={admitPatientInfo.roomNumber}
                    onChange={handleAdmitPatientInfoChange}
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
                    value={admitPatientInfo.bedNumber}
                    onChange={handleAdmitPatientInfoChange}
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
                    value={admitPatientInfo.disease}
                    onChange={handleAdmitPatientInfoChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>DateTime</label>
                <div className="inputdiv">
                  <input
                    type="datetime-local"
                    name="timeStamp"
                    value={admitPatientInfo.timeStamp}
                    onChange={handleAdmitPatientInfoChange}
                    required
                  />
                </div>
              </div>

              {/* <div>
                <label>Time</label>
                <div className="inputdiv">
                  <input
                    type="time"
                    name="time"
                    value={admitPatientInfo.time}
                    onChange={handleAdmitPatientInfoChange}
                    required
                  />
                </div>
              </div> */}
             
              <div>
                <label>Details</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Details"
                    name="details"
                    value={admitPatientInfo.details}
                    onChange={handleAdmitPatientInfoChange}
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
          <h1>Admission History</h1>
          <div className="wardBox">
            <Table columns={columns} dataSource={mappedadmissionReports} />
          </div>
        </div>

        </div>
      </div>
    </>
  );
};

export default Admit_Patient;
