import { Table } from "antd";
import React, { useRef, useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { RiEmpathizeLine } from "react-icons/ri";
import { FaBed } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaAmbulance } from "react-icons/fa";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllData, GetPatients } from "../../../../Redux/Datas/action";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


const FrontPage = () => {
  const columns = [
    { title: "Name", dataIndex: "patientName", key: "patientName" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Disease", dataIndex: "disease", key: "disease" },
    { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  const wardColumns = [
    { title: "Ward Name", dataIndex: "wardName" },
    { title: "Doctors(Av | Tot)", dataIndex: "doctors" },
    { title: "Nurses(Av | Tot)", dataIndex: "nurses" },
    { title: "Rooms(Av | Tot)", dataIndex: "rooms" },
    { title: "Beds(Av | Tot)", dataIndex: "beds"},
  ];

  const wards = [
    { 
      wardName: "Ward 01", 
      doctors: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
      nurses: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
      rooms: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
      beds: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>)
    },
    { 
      wardName: "Ward 01", 
      doctors: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
      nurses: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
      rooms: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
      beds: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>)
    },
    { 
      wardName: "Ward 01", 
      doctors: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
      nurses: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
      rooms: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
      beds: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>)
    },
    { 
      wardName: "Ward 01", 
      doctors: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
      nurses: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
      rooms: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
      beds: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>)
    }
  ]


  const { patients } = useSelector((store) => store.data.patients);
  const {
    dashboard: { data },
  } = useSelector((store) => store.data);

  console.log(data);

  const dispatch = useDispatch();

  

  

  useEffect(() => {
    dispatch(GetPatients());
    dispatch(GetAllData());
  }, []);

  return (
    <div  className="container">
      <Sidebar/>
      <div className="AfterSideBar">
        <h1 style={{ color: "rgb(184 191 234)" }}>Overall Stats</h1>
        <div className="maindiv">
          <div className="one commondiv">
            <div>
              <h1>{data?.doctor}</h1>
              <p>Doctor</p>
            </div>
            <MdPersonAdd className="overviewIcon" />
          </div>
          <div className="two commondiv">
            {" "}
            <div>
              <h1>{data?.nurse}</h1>
              <p>Nurse</p>
            </div>
            <FaUserNurse className="overviewIcon" />
          </div>
          <div className="three commondiv">
            <div>
              <h1>{data?.patient}</h1>
              <p>Patient</p>
            </div>
            <RiEmpathizeLine className="overviewIcon" />
          </div>
          <div className="six commondiv">
            {" "}
            <div>
              <h1>{data?.admin}</h1>
              <p>Admin</p>
            </div>
            <RiAdminLine className="overviewIcon" />
          </div>
          <div className="four commondiv">
            {" "}
            <div>
              <h1>{data?.bed}</h1>
              <p>Beds</p>
            </div>
            <FaBed className="overviewIcon" />
          </div>

          <div className="five commondiv">
            {" "}
            <div>
              <h1>{data?.ambulance}</h1>
              <p>Ambulance</p>
            </div>
            <FaAmbulance className="overviewIcon" />
          </div>
          <div className="six commondiv">
            {" "}
            <div>
              <h1>{data?.appointment}</h1>
              <p>Appointment</p>
            </div>
            <BsFillBookmarkCheckFill className="overviewIcon" />
          </div>
          <div className="six commondiv">
            {" "}
            <div>
              <h1>{data?.report}</h1>
              <p>Reports</p>
            </div>
            <MdPayment className="overviewIcon" />
          </div>
        </div>
        {/* <h1 style={{ color: "rgb(184 191 234)" }}>Stats By Ward</h1>
        <div className="middlediv">
          <div className="wardStatsDiv">
            <h1 className="light-grey-font">WARD 01</h1>
            <div className="wardStatBottom">
<div className="wardStats">
              <p>Doctor</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">10000</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">10000</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Nurse</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">10000</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">10000</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Room</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">10000</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">10000</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Bed</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1000000</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1000000</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            </div>
            
          </div>
          
          <div className="wardStatsDiv">
            <h1 className="light-grey-font">WARD 01</h1>
            <div className="wardStatBottom">
<div className="wardStats">
              <p>Doctor</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">10000</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1000</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Nurse</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1000</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1000</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Room</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1000</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1000</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Bed</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1000</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1000</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            </div>
            
          </div>
         
          <div className="wardStatsDiv">
            <h1 className="light-grey-font" >WARD 01</h1>
            <div className="wardStatBottom">
<div className="wardStats">
              <p>Doctor</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Nurse</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Room</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Bed</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            </div>
            
          </div>
         
          <div className="wardStatsDiv">
            <h1 className="light-grey-font" >WARD 01</h1>
            <div className="wardStatBottom">
<div className="wardStats">
              <p>Doctor</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Nurse</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Room</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Bed</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            </div>
            
          </div>
         
          <div className="wardStatsDiv">
            <h1 className="light-grey-font" >WARD 01</h1>
            <div className="wardStatBottom">
<div className="wardStats">
              <p>Doctor</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Nurse</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Room</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Bed</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            </div>
            
          </div>
         
          <div className="wardStatsDiv">
            <h1 className="light-grey-font" >WARD 01</h1>
            <div className="wardStatBottom">
<div className="wardStats">
              <p>Doctor</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Nurse</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Room</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Bed</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            </div>
            
          </div>
         
          <div className="wardStatsDiv">
            <h1 className="light-grey-font" >WARD 01</h1>
            <div className="wardStatBottom">
<div className="wardStats">
              <p>Doctor</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Nurse</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Room</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Bed</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            </div>
            
          </div>
         
          <div className="wardStatsDiv">
            <h1 className="light-grey-font" >WARD 01</h1>
            <div className="wardStatBottom">
<div className="wardStats">
              <p>Doctor</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Nurse</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Room</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            <div className="wardStats">
              <p>Bed</p>
              <div className="stats">
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Av</p>
                  </div>
                  <div className="stat">
                    <h1 className="statValue">1</h1>
                    <p>Tot</p>
                  </div>
              </div>
            </div>
            </div>
            
          </div>
         
        </div> */}
        {/* ************************************* */}
        <div className="wardDetails">
          <h1>Stats By Ward</h1>
          <div className="wardBox">
            <Table columns={wardColumns} dataSource={wards} />
          </div>
        </div>
        
        <div className="patientDetails">
          <h1>Patient Details</h1>
          <div className="patientBox">
            <Table columns={columns} dataSource={patients} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
