import { Table } from "antd";
import React, { useRef, useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { RiEmpathizeLine } from "react-icons/ri";
import { FaBed } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { LiaHospitalAltSolid } from "react-icons/lia";
import { FaAmbulance } from "react-icons/fa";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllData, GetPatients } from "../../../../Redux/Datas/action";
import { SiGoogleclassroom } from "react-icons/si";
import { FaUserDoctor } from "react-icons/fa6";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


const FrontPage = () => {

  const [mappedWardStats, setMappedWardStats] = useState([])

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

  const mapWards = (wards) => {
    let arr = []
    for(let ward of wards) {
      let obj = { 
        key: ward._id,
        wardName: ward.wardName, 
        doctors: (<><Link to={"#"}>{ward.doctors[0]}</Link> | <Link to={"#"}>{ward.doctors[1]}</Link></>), 
        nurses: (<><Link to={"#"}>{ward.nurses[0]}</Link> | <Link to={"#"}>{ward.nurses[1]}</Link></>), 
        rooms: (<><Link to={"#"}>{ward.rooms[0]}</Link> | <Link to={"#"}>{ward.rooms[1]}</Link></>), 
        beds: (<><Link to={"#"}>{ward.beds[0]}</Link> | <Link to={"#"}>{ward.beds[1]}</Link></>)
      }
      arr.push(obj)
    }
    setMappedWardStats([...arr])
  }

  // const wards = [
  //   { 
  //     wardName: "Ward 01", 
  //     doctors: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     nurses: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     rooms: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     beds: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>)
  //   },
  //   { 
  //     wardName: "Ward 01", 
  //     doctors: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     nurses: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     rooms: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     beds: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>)
  //   },
  //   { 
  //     wardName: "Ward 01", 
  //     doctors: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     nurses: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     rooms: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     beds: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>)
  //   },
  //   { 
  //     wardName: "Ward 01", 
  //     doctors: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     nurses: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     rooms: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     beds: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>)
  //   }
  // ]


  const { patients } = useSelector((store) => store.data.patients);
  const {
    dashboard: { data },
  } = useSelector((store) => store.data);

  console.log(data);

  const dispatch = useDispatch();

  

  

  useEffect(() => {
    dispatch(GetPatients());
    dispatch(GetAllData());
    mapWards(data.wardStats)
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
              <p>Doctors</p>
            </div>
            <FaUserDoctor className="overviewIcon" />
          </div>
          <div className="two commondiv">
            {" "}
            <div>
              <h1>{data?.nurse}</h1>
              <p>Nurses</p>
            </div>
            <FaUserNurse className="overviewIcon" />
          </div>
          <div className="three commondiv">
            <div>
              <h1>{data?.patient}</h1>
              <p>Patients</p>
            </div>
            <RiEmpathizeLine className="overviewIcon" />
          </div>
          <div className="six commondiv">
            {" "}
            <div>
              <h1>{data?.admin}</h1>
              <p>Admins</p>
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

          <div className="four commondiv">
            {" "}
            <div>
              <h1>{data?.ward}</h1>
              <p>Wards</p>
            </div>
            <LiaHospitalAltSolid className="overviewIcon" />

          </div>

          <div className="four commondiv">
            {" "}
            <div>
              <h1>{data?.room}</h1>
              <p>Rooms</p>
            </div>
            <SiGoogleclassroom className="overviewIcon" />

          </div>

          <div className="five commondiv">
            {" "}
            <div>
              <h1>{data?.ambulance}</h1>
              <p>Ambulances</p>
            </div>
            <FaAmbulance className="overviewIcon" />
          </div>
          <div className="six commondiv">
            {" "}
            <div>
              <h1>{data?.appointment}</h1>
              <p>Appointments</p>
            </div>
            <BsFillBookmarkCheckFill className="overviewIcon" />
          </div>
          <div className="six commondiv">
            {" "}
            <div>
              <h1>{data?.labReport}</h1>
              <p>Lab Reports</p>
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
            <Table columns={wardColumns} dataSource={mappedWardStats} />
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
