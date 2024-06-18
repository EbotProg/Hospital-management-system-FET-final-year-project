import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AdminRegister, SendPassword } from "../../../../../Redux/auth/action";
import { getAllAdmins } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import admin from "../../../../../img/admin.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const notify = (text) => toast(text);

const Add_Admin = () => {
  const { data } = useSelector((store) => store.auth);

  const [loading, setloading] = useState(false);

  const InitData = {
    adminName: "",
    age: "",
    mobile: "",
    email: "",
    gender: "",
    DOB: "",
    address: "",
    education: "",
    // adminID: Date.now(),
    // password: "",

  };
  const [AdminValue, setAdminValue] = useState(InitData);
  const [fetchedAdmins, setFetchedAdmins] = useState([])
  const [mappedAdmins, setMappedAdmins] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)


  const HandleAdminChange = (e) => {
    setAdminValue({ ...AdminValue, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const adminColumns = [
    { title: "AdminID", dataIndex: "adminID"},
    { title: "Name", dataIndex: "adminName"},
    { title: "Available", dataIndex: "isAvailable"},
    { title: "Address", dataIndex: "address"},
    { title: "Email", dataIndex: "email"},
    { title: "Gender", dataIndex: "gender"},
    { title: "Date of Birth", dataIndex: "DOB"},
    // { title: "", dataIndex: "viewMore"}
  ];

  const mapAdminInfo = () => {
    let arr = []
    fetchedAdmins.forEach((admin)=>{
      let obj = {};
      obj.key = admin._id
      obj.adminID = admin.adminID;
      obj.adminName = admin.adminName;
      obj.isAvailable = admin.isAvailable === true? "Yes": "No";
      obj.address = admin.address;
      obj.email = admin.email;
      obj.gender = admin.gender;
      obj.DOB = admin.DOB;
    //   obj.viewMore = <button
    //   style={{
    //     border: "none",
    //     color: "green",
    //     outline: "none",
    //     background: "transparent",
    //     cursor: "pointer",
    //   }}
    //   onClick={() => handleViewMoreAdminInfo(admin._id)}
    // >
    //   View more
    // </button>
    arr.push(obj);
    
  });

  setMappedAdmins([...arr])

  }


  useEffect(()=> {
    dispatch(getAllAdmins()).then(res => {
      console.log('get all admins res', res)
      setFetchedAdmins(res);
    })
    
  }, [])

  useEffect(()=> {
    if(isSubmitted === true) {
      dispatch(getAllAdmins()).then(res => {
        console.log('get all admins res', res)
        setFetchedAdmins(res);
      })
    }
    setIsSubmitted(false)
    
  }, [isSubmitted])

  useEffect(()=> {
    console.log('fetchedAdmins', fetchedAdmins)
    mapAdminInfo()

  }, [fetchedAdmins])



  const HandleAdminSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    dispatch(AdminRegister(AdminValue)).then((res) => {
      console.log("res from admin register", res)
      if (res.error) {
        setloading(false);
        return notify(res.error);
      }
      notify(res.message);
      setIsSubmitted(true)
      let data = {
        email: res.data.email,
        password: res.data.password,
        userId: res.data.adminID,
      };
      dispatch(SendPassword(data)).then((res) => notify("Account Details Sent"));
      setloading(false);
      setAdminValue(InitData);
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
            <h1>Add Admin</h1>
            <img src={admin} alt="admin" className="avatarimg" />
            <form onSubmit={HandleAdminSubmit}>
              <div>
                <label>Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="adminName"
                    value={AdminValue.adminName}
                    onChange={HandleAdminChange}
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
                    value={AdminValue.age}
                    onChange={HandleAdminChange}
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
                    value={AdminValue.mobile}
                    onChange={HandleAdminChange}
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
                    value={AdminValue.email}
                    onChange={HandleAdminChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Gender</label>
                <div className="inputdiv">
                  <select
                    name="gender"
                    value={AdminValue.gender}
                    onChange={HandleAdminChange}
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
                    value={AdminValue.DOB}
                    onChange={HandleAdminChange}
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
                    value={AdminValue.address}
                    onChange={HandleAdminChange}
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
                    value={AdminValue.education}
                    onChange={HandleAdminChange}
                    required
                  />
                </div>
              </div>
              {/* <div>
                <label>Password</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={AdminValue.password}
                    onChange={HandleAdminChange}
                    required
                  />
                </div>
              </div> */}

              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>

          <div className="wardDetails">
          <h1>Admins</h1>
          <div className="wardBox">
            <Table columns={adminColumns} dataSource={mappedAdmins} />
          </div>
        </div>

        </div>
      </div>
    </>
  );
};

export default Add_Admin;
