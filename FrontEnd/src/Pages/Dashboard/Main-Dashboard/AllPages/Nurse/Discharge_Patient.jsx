import React, { useState } from "react";
import { message, Upload } from "antd";
import doctor from "../../../../../img/doctoravatar.png";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  dischargePatientInfos,
  CreateBeds,
  EditSingleBed,
  GetSingleBed,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { Navigate } from "react-router-dom";

const notify = (text) => toast(text);

const Discharge_Patient = () => {
 

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.auth);



  const InitData = {
    patientName: "",
    docName: "",
    nurseName: "",
    wardName: "",
    roomNumber: "",
    bedNumber: "",
    disease: "",
    details: "",
    date: "",
    time: ""
  };
  const [dischargePatientInfo, setDischargePatientInfo] = useState(InitData);

  const handledischargePatientInfoChange = (e) => {
    setDischargePatientInfo({ ...dischargePatientInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitDischargePatientInfo = (e) => {
    e.preventDefault();

    if (
      dischargePatientInfo.patientName === "" ||
      dischargePatientInfo.nurseName === "" ||
      dischargePatientInfo.wardName === "" ||
      dischargePatientInfo.bedNumber === "" ||
      dischargePatientInfo.disease === "" ||
      dischargePatientInfo.date === "" ||
      dischargePatientInfo.time === "" ||
      dischargePatientInfo.roomNumber === ""
    ) {
      return notify("Please Enter All the Requried Feilds");
    }
    try {
      setLoading(true);
      
      dispatch(dischargePatientInfos(dischargePatientInfo)).then((item) => {
            if (item.message === "Patient already exists") {
              setLoading(false);
              return notify("Patient already exists");
            }
            let data = {
              patientID: item._id,
              occupied: "occupied",
            };
            notify("Patient Added");

            
            setLoading(false);
            setDischargePatientInfo(InitData);
           
          });
        
    
      //
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
                <label>Patient Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="patientName"
                    value={dischargePatientInfo.patientName}
                    onChange={handledischargePatientInfoChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Doctor Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Doctor Full Name"
                    name="doctorName"
                    value={dischargePatientInfo.doctorName}
                    onChange={handledischargePatientInfoChange}
                  />
                </div>
              </div>
              {/* AGE PLACEHOLDER  */}
              <div>
                <label>Nurse Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Nurse Full Name"
                    name="nurseName"
                    value={dischargePatientInfo.nurseName}
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
                <label>Date</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="abc@abc.com"
                    name="date"
                    value={dischargePatientInfo.date}
                    onChange={handledischargePatientInfoChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Time</label>
                <div className="inputdiv">
                  <input
                    type="time"
                    name="time"
                    value={dischargePatientInfo.time}
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
        </div>
      </div>
    </>
  );
};

export default Discharge_Patient;
