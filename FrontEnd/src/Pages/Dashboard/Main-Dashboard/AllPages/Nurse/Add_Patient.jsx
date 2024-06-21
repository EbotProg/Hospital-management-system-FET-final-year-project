import React, { useState, useEffect } from "react";
import { message, Upload } from "antd";
import doctor from "../../../../../img/doctoravatar.png";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "antd";
import Admit_Patient from "./Admit_Patient"
import Discharge_Patient from "./Discharge_Patient"
import { SendPassword } from "../../../../../Redux/auth/action";


import {
  AddPatients,
  GetPatients,
  CreateBeds,
  EditSingleBed,
  GetSingleBed,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const notify = (text) => toast(text);

const Add_Patient = () => {
  // const getBase64 = (img, callback) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => callback(reader.result));
  //   reader.readAsDataURL(img);
  // };


  const columns = [
    { title: "ID", dataIndex: "patientID", key: "patientID" },
    { title: "Full Name", dataIndex: "patientFullName", key: "patientFullName" },
    { title: "Admitted", dataIndex: "admitted", key: "admitted" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Date of Birth", dataIndex: "DOB", key: "DOB" },
    // { title: "", dataIndex: "viewMore", key: "veiwMore" },
    { title: "", dataIndex: "dischargeAdmit", key: "dischargeAdmit" },
  ];



  const [loading, setLoading] = useState(false);
  const [fetchedPatients, setFetchedPatients] = useState([])
  const [mappedPatients, setMappedPatients] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.auth);

  // const handleViewMorePatientInfo = (id) => {

  //   return id;
  // }
  // const dischargePatient = (id) => {

  //   return id;
  // }
  // const admitPatient = (id) => {

  //   return id;
  // }

const navigate = useNavigate()
  const moveToAdmitPage = (id) => {
  //  return  <Navigate to={`/admitPatient/${id}`} />
  return navigate(`/admitPatient/${id}`)
  }
  
  const moveToDischargePage = (id) => {
  //  return  <Navigate to={`/dischargePatient/${id}`} />
  return navigate(`/dischargePatient/${id}`)
  }
  



  const mapPatientInfo = () => {
    let arr = []
    fetchedPatients.forEach((patient)=>{
      let obj = {};
      obj.key = patient._id
      obj.patientID = patient.patientID;
      obj.patientFullName = `${patient.firstName} ${patient.lastName}`;
      obj.admitted = patient.admitted === true? "Yes": "No";
      obj.address = patient.address;
      obj.email = patient.email;
      obj.gender = patient.gender;
      obj.DOB = patient.DOB;
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
      obj.dischargeAdmit = patient.admitted === true?  <button
      style={{
        border: "none",
        color: "green",
        outline: "none",
        background: "transparent",
        cursor: "pointer",
      }}
      onClick={() => moveToDischargePage(patient._id)}
    >
      discharge
    </button> : <button
      style={{
        border: "none",
        color: "green",
        outline: "none",
        background: "transparent",
        cursor: "pointer",
      }}
      onClick={() => moveToAdmitPage(patient._id)}
    >
      admit
    </button>;

    arr.push(obj);
    
  });

  setMappedPatients([...arr])

  }


  useEffect(()=> {
    dispatch(GetPatients()).then(res => {
      console.log('get all patients res', res)
      setFetchedPatients(res.patients);
    })
    
  }, [])

  useEffect(()=> {
    if(isSubmitted === true) {
      dispatch(GetPatients()).then(res => {
        console.log('get all patients res', res)
        setFetchedPatients(res.patients);
      })
    }
    setIsSubmitted(false)
    
  }, [isSubmitted])

  useEffect(()=> {
    console.log('fetchedPatients', fetchedPatients)
    mapPatientInfo()

  }, [fetchedPatients])



  // const beforeUpload = (file) => {
  //   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  //   if (!isJpgOrPng) {
  //     message.error("You can only upload JPG/PNG file!");
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error("Image must smaller than 2MB!");
  //   }
  //   return isJpgOrPng && isLt2M;
  // };

  // const initBed = {
  //   bedNumber: "",
  //   roomNumber: "",
  // };
  // const [bedDetails, setbedDetails] = useState(initBed);

  // const HandleBedchange = (e) => {
  //   setbedDetails({ ...bedDetails, [e.target.name]: e.target.value });
  // };

  const InitData = {
    firstName: "",
    lastName: "",
    // patientID: Date.now(),
    age: "",
    email: "",
    gender: "",
    mobile: "",
    // disease: "",
    address: "",
    // department: "",
    dateTime: "",
    bloodGroup: "",
    DOB: "",
    // password: "",
    // patientID: data?.user._id,
    // docID: "",
    details: "",
  };
  const [AddPatient, setAddPatient] = useState(InitData);

  const HandleAppointment = (e) => {
    setAddPatient({ ...AddPatient, [e.target.name]: e.target.value });
  };

  const HandleOnsubmitAppointment = (e) => {
    e.preventDefault();
     setLoading(true);
    dispatch(AddPatients(AddPatient)).then(res => {
      console.log("res from handlepatientadd", res);
      if(res.error) {
        setLoading(false);
        return notify(res.error)
      }

      notify(res.message)
      if(res.message === "Patient Added") {
        notify("sending email to patient...")
        setIsSubmitted(true)
        let data = {
          email: res.patient.email,
          patientId: res.patient.patientID
        };
        dispatch(SendPassword(data)).then((res) => notify("Email sent to patient"));
        setAddPatient(InitData);
        setLoading(false);

      }
    })
    
    
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
            <h1>Add Patient</h1>
            <img src={doctor} alt="doctor" className="avatarimg" />

            <form onSubmit={HandleOnsubmitAppointment}>
              {/* Name PlaceHolder */}
              <div className="display_row">
                <p>Patient's Names </p>
                <div className="inputdiv">
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={AddPatient.firstName}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="last Name"
                    name="lastName"
                    value={AddPatient.lastName}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
                </div>
              </div>

              {/* <div>
                <label>Patient Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="patientName"
                    value={AddPatient.patientName}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div> */}
              {/* AGE PLACEHOLDER  */}
              <div>
                <label>Age</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="e.g. 23"
                    name="age"
                    value={AddPatient.age}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              {/* EMAIL PLACEHOLDER  */}
              <div>
                <label>Email</label>
                <div className="inputdiv">
                  <input
                    type="email"
                    placeholder="e.g. abc@abc.com"
                    name="email"
                    value={AddPatient.email}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Date and Time</label>
                <div className="inputdiv">
                  <input
                    type="datetime-local"
                    name="dateTime"
                    value={AddPatient.dateTime}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              {/* GENDER PLACEHOLDER  */}
              <div>
                <label>Gender</label>
                <div className="inputdiv">
                  <select
                    name="gender"
                    value={AddPatient.gender}
                    onChange={HandleAppointment}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              {/* DATE OF BIRTH  */}
              <div className="dateofAppointment">
                <p>Birth Date</p>
                <div className="inputdiv">
                  <input
                    type={"date"}
                    name="DOB"
                    value={AddPatient.DOB}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              {/* MOBILE PLACEHOLDER */}
              <div>
                <label>Contact Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="e.g. 673767494"
                    name="mobile"
                    value={AddPatient.mobile}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>

              

              {/* <div>
                <label>Disease</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Disease"
                    name="disease"
                    value={AddPatient.disease}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div> */}

              {/* ADDRESS SECTION  */}
              <div>
                <label>Address</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="e.g. Bokwai New-layout"
                    name="address"
                    value={AddPatient.address}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>

              {/* <div>
                <label>Bed Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="bed No"
                    name="bedNumber"
                    value={bedDetails.bedNumber}
                    onChange={HandleBedchange}
                    required
                  />
                </div>
              </div> */}
              {/* <div>
                <label>Room Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="room no"
                    name="roomNumber"
                    value={bedDetails.roomNumber}
                    onChange={HandleBedchange}
                    required
                  />
                </div>
              </div> */}

              {/* <div>
                <label>Department</label>
                <div className="inputdiv">
                  <select
                    name="department"
                    value={AddPatient.department}
                    onChange={HandleAppointment}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="ENT">ENT</option>
                    <option value="Ophthalmologist">Ophthalmologist</option>
                    <option value="Anesthesiologist">Anesthesiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Oncologist">Oncologist</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                  </select>
                </div>
              </div> */}
              {/* <div>
                <label>Doctor</label>
                <div className="inputdiv">
                  <select
                    name="docID"
                    value={AddPatient.docID}
                    onChange={HandleAppointment}
                    required
                  >
                    <option value="">Select doctor</option>
                    <option value="63d228df1742e138a3727857">
                      Piyush Agrawal
                    </option>
                    <option value="63d2270dfe66e89c9be342f9">
                      Rajendra Patel
                    </option>
                  </select>
                </div>
              </div> */}

              <div>
                <label>Patient Blood Group</label>
                <div className="inputdiv">
                  <select
                    name="bloodGroup"
                    onChange={HandleAppointment}
                    required
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div>
                <label>More Details</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="e.g. I am a student and live with my parents"
                    name="details"
                    value={AddPatient.details}
                    onChange={HandleAppointment}
                    
                  />
                </div>
              </div>
              {/* PASSWORD*/}
              {/* <div className="dateofAppointment">
                <p>Password</p>
                <div className="inputdiv">
                  <input
                    type={"text"}
                    placeholder="Password"
                    name="password"
                    value={AddPatient.password}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div> */}
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
          <h1>Patient Details</h1>
          <div className="wardBox">
            <Table columns={columns} dataSource={mappedPatients} />
          </div>
        </div>

        </div>
      </div>
    </>
  );
};

export default Add_Patient;
