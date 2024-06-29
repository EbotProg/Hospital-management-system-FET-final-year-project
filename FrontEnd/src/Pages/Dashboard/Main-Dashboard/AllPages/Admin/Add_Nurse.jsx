import React, { useState, useEffect } from "react";
import "./CSS/Add_Doctor.css";
import nurse from "../../../../../img/nurseavatar.png";
import { message, Upload, Table } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { NurseRegister, SendPassword } from "../../../../../Redux/auth/action";
import { getAllNurses, updateNurseAvailability } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const notify = (text) => toast(text);
// const showPassword = (password) => toast(password, {
//   autoClose: false
// });

const Add_Nurse = () => {
  const { data } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const InitData = {
    nurseName: "",
    age: "",
    mobile: "",
    email: "",
    gender: "",
    DOB: "",
    address: "",
    education: "",
    // department: "",
    // nurseID: Date.now(),
    password: "",
    details: "",
    bloodGroup: "",
    wardName: ""
  };
  const [NurseValue, setNurseValue] = useState(InitData);
  const [fetchedNurses, setFetchedNurses] = useState([])
  const [mappedNurses, setMappedNurses] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isToggled, setIsToggled] = useState(false);


  const HandleDoctorChange = (e) => {
    setNurseValue({ ...NurseValue, [e.target.name]: e.target.value });
  };

  const nurseColumns = [
    { title: "NurseID", dataIndex: "nurseID"},
    { title: "Name", dataIndex: "nurseName"},
    { title: "Ward", dataIndex: "wardName"},
    { title: "Available", dataIndex: "isAvailable"},
    { title: "Address", dataIndex: "address"},
    { title: "Email", dataIndex: "email"},
    { title: "Gender", dataIndex: "gender"},
    { title: "Date of Birth", dataIndex: "DOB"},
    { title: "", dataIndex: "toggleAvailability"}

    // { title: "", dataIndex: "viewMore"}
  ];

  const mapNurseInfo = () => {
    let arr = []
    if(fetchedNurses?.length > 0) {
      fetchedNurses.forEach((nurse)=>{
        let obj = {};
        obj.key = nurse?._id
        obj.nurseID = nurse?.nurseID;
        obj.nurseName = nurse?.nurseName;
        obj.wardName = nurse?.wardID?.wardName;
        obj.isAvailable = nurse?.isAvailable === true? "Yes": "No";
        obj.address = nurse?.address;
        obj.email = nurse?.email;
        obj.gender = nurse?.gender;
        obj.DOB = nurse?.DOB;
        obj.toggleAvailability = <button
        style={{
          border: "none",
          color: "green",
          outline: "none",
          background: "transparent",
          cursor: "pointer",
        }}
        onClick={() => handleToggleAvailability(nurse._id)}
      >
        Toggle availability
      </button>
      //   obj.viewMore = <button
      //   style={{
      //     border: "none",
      //     color: "green",
      //     outline: "none",
      //     background: "transparent",
      //     cursor: "pointer",
      //   }}
      //   onClick={() => handleViewMoreNurseInfo(nurse._id)}
      // >
      //   View more
      // </button>
      arr.push(obj);
      
    });
    }
   

  setMappedNurses([...arr])

  }


  const handleToggleAvailability = (nurseId) => {

    let clickedOk = window.confirm("Warning!!!\nYou are about to change a doctor's availability\nContinue?");
    if(clickedOk === true) {
        dispatch(updateNurseAvailability(nurseId)).then((res) => {
          console.log('res', res)
            notify(res.message)
            if(res.message === "nurse availability updated") {
              setIsToggled(true)
            }
          })
          .catch(err => {
            notify(err.message)
          })
    }
  
  }




  useEffect(()=> {
    dispatch(getAllNurses()).then(res => {
      console.log('get all nurses res', res)
      setFetchedNurses(res);
    })
    
  }, [])

  useEffect(()=> {
    if(isSubmitted === true || isToggled === true) {
      dispatch(getAllNurses()).then(res => {
        console.log('get all nurses res', res)
        setFetchedNurses(res);
      })
    }
    setIsSubmitted(false)
    setIsToggled(false)

  }, [isSubmitted, isToggled])

  useEffect(()=> {
    console.log('fetchedNurses', fetchedNurses)
    mapNurseInfo()

  }, [fetchedNurses])


  const HandleDoctorSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(NurseRegister(NurseValue)).then((res) => {
      console.log('res', res)
      if (
        res.message === "Nurse already exists" || 
        res.message === "ward not found" ||
        res.message === "could not send email" ||
        res.message === "Internal server error" 
      ) {
        setLoading(false);
        return notify(res.message);
      }
      // if (res.message === "error") {
      //   setLoading(false);
      //   // return notify("Something went wrong, Please try Again");
      // }
      notify(res.message);
      setIsSubmitted(true)
      let data = {
        email: res.data.email,
        password: res.data.password,
        userId: res.data.nurseID,
      };
      dispatch(SendPassword(data)).then((res) => notify("Account Detais Sent"));
      setLoading(false);
      setNurseValue(InitData);
    });
  };

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "admin") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Add Nurse</h1>
            <img src={nurse} alt="doctor" className="avatarimg" />
            <form onSubmit={HandleDoctorSubmit}>
              <div>
                <label> Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="nurseName"
                    value={NurseValue.nurseName}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Age</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={NurseValue.age}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Ward</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="ward name"
                    name="wardName"
                    value={NurseValue.wardName}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Contact Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Emergency Number"
                    name="mobile"
                    value={NurseValue.mobile}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Email</label>
                <div className="inputdiv">
                  <input
                    type="email"
                    placeholder="abc@abc.com"
                    name="email"
                    value={NurseValue.email}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Gender</label>
                <div className="inputdiv">
                  <select
                    name="gender"
                    value={NurseValue.gender}
                    onChange={HandleDoctorChange}
                    required
                  >
                    <option value="Choose Gender">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Birthdate</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="dd-mm-yy"
                    name="DOB"
                    value={NurseValue.DOB}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Address</label>
                <div className="inputdiv adressdiv">
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={NurseValue.address}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Education</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="eg.MBBS"
                    name="education"
                    value={NurseValue.education}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Blood Group</label>
                <div className="inputdiv">
                  <select
                    name="bloodGroup"
                    value={NurseValue.bloodGroup}
                    onChange={HandleDoctorChange}
                    required
                  >
                    <option value="Choose Blood Group">Select</option>
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

              {/* <div>
                <label>Password</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={NurseValue.password}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div> */}
              <div>
                <label>Other Info</label>
                <div className="inputdiv">
                  <textarea
                    type="text"
                    placeholder="Extra Info"
                    rows="4"
                    cols="50"
                    name="details"
                    value={NurseValue.details}
                    onChange={HandleDoctorChange}
                    // required
                  />
                </div>
              </div>
              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
          <div className="wardDetails">
          <h1>Nurses</h1>
          <div className="wardBox">
            <Table columns={nurseColumns} dataSource={mappedNurses} />
          </div>
        </div>

        </div>
      </div>
    </>
  );
};

export default Add_Nurse;
