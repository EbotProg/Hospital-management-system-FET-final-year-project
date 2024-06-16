import React, { useState } from "react";
import { message, Upload } from "antd";
import doctor from "../../../../../img/doctoravatar.png";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  admitPatientInfos,
  CreateBeds,
  EditSingleBed,
  GetSingleBed,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { Navigate } from "react-router-dom";

const notify = (text) => toast(text);

const Admit_Patient = () => {
 

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
  const [admitPatientInfo, setAdmitPatientInfo] = useState(InitData);

  const handleAdmitPatientInfoChange = (e) => {
    setAdmitPatientInfo({ ...admitPatientInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitPatientInfo = (e) => {
    e.preventDefault();

    if (
      admitPatientInfo.patientName === "" ||
      admitPatientInfo.nurseName === "" ||
      admitPatientInfo.wardName === "" ||
      admitPatientInfo.bedNumber === "" ||
      admitPatientInfo.disease === "" ||
      admitPatientInfo.date === "" ||
      admitPatientInfo.time === "" ||
      admitPatientInfo.roomNumber === ""
    ) {
      return notify("Please Enter All the Requried Feilds");
    }
    try {
      setLoading(true);
      
      dispatch(admitPatientInfos(admitPatientInfo)).then((item) => {
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
            setAdmitPatientInfo(InitData);
           
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
            <h1>Admit Patient</h1>
            <img src={doctor} alt="doctor" className="avatarimg" />

            <form onSubmit={handleSubmitPatientInfo}>
              {/* Name PlaceHolder */}
              <div>
                <label>Patient Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="patientName"
                    value={admitPatientInfo.patientName}
                    onChange={handleAdmitPatientInfoChange}
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
                    value={admitPatientInfo.doctorName}
                    onChange={handleAdmitPatientInfoChange}
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
                    value={admitPatientInfo.nurseName}
                    onChange={handleAdmitPatientInfoChange}
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
                <label>Date</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="abc@abc.com"
                    name="date"
                    value={admitPatientInfo.date}
                    onChange={handleAdmitPatientInfoChange}
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
                    value={admitPatientInfo.time}
                    onChange={handleAdmitPatientInfoChange}
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
        </div>
      </div>
    </>
  );
};

export default Admit_Patient;
