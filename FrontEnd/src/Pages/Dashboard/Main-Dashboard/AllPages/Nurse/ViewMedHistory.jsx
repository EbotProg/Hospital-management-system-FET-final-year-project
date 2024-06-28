import { Table, Tag } from "antd";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  SearchMedHistory,
  downloadMedHistory,
  GetMedHistory,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { MdKeyboardArrowUp } from "react-icons/md";
import { jsPDF } from 'jspdf';
const notify = (text) => toast(text);


const ViewMedHistory = () => {
  const { data } = useSelector((store) => store.auth);

  // const downloadPdf = () => {
  //   const pdf = new jsPDF('p', 'pt', 'a4')



  // }
  

  const columns = [
    { title: "Patient Name", dataIndex: "patientName", key: "patientName"},
    { title: "Doctor", dataIndex: "doctorName", key: "doctorName"},
    { title: "Nurse", dataIndex: "nurseName", key: "nurseName"},
    { title: "disease", dataIndex: "disease", key: "disease"},
    { title: "medicines", dataIndex: "meds", key: "meds" ,render: (_, { meds }) => (
      <>
        {meds.map((med) => {
          let color = med.length > 5 ? 'geekblue' : 'green';
          // if (med === 'loser') {
          //   color = 'volcano';
          // }
          return (
            <div style={ { display: "flex", flexDirection: "column", gap: "0.3rem"} }>
            <Tag color={color} key={med}>
              {med.toUpperCase()}
            </Tag>
            
            </div>
            
          );
        })}
      </>
    )},
    // { title: "medicine 2", dataIndex: "medTwo", key: "medTwo"},
    { title: "Weight(Kg)", dataIndex: "weight", key: "weight"},
    { title: "Glucose level", dataIndex: "glucose", key: "glucose"},
    { title: "Date", dataIndex: "date", key: "date"},
  ];

  // const PatientMedicalHistory = [
  //     { 
  //       patientName: "Achale Ebot",
  //       doctor: "John Doe",
  //       disease: "Cough",
  //       ward: "maternity",
  //       date: "2022-01-01"
  //     }
  // ]

  const mapMedHistory = () => {
    let arr = []
    if(fetchedMedHistory?.length > 0) {
      fetchedMedHistory.forEach((info)=>{
        let obj = {};
        obj.key = info?._id
        obj.patientName = info?.patient_id?.patientID ? `${info?.patient_id?.firstName} ${info?.patient_id?.lastName}`: '';
        obj.doctorName = info?.doc_id?.docName;
        obj.nurseName = info?.nurse_id?.nurseName;
        obj.disease = info?.consultation_id?.disease;
        const medicines = info?.prescription_id?.medicines
        console.log("medicines", medicines)
        // let med = '';
        // for(let medicine of medicines) {
          
        //   med = med + `${medicine?.medicineName} ${medicine?.dosage} ${medicine?.duration}`
        //   if(medicines[medicines.length - 1] !== medicine) {
        //     med = med + "\n"
        //   }
        // }
        let medArr = []
        if(medicines) {
          for(let medicine of medicines) {
          
            const med = `${medicine?.medicineName} ${medicine?.dosage} ${medicine?.duration}`
            medArr.push(med);
          }
        }
        
        console.log('medArr', medArr)
        obj.meds = medArr;
        obj.weight = info?.consultation_id?.weight;
        obj.glucose = info?.consultation_id?.glucose;
        obj.date = info?.timeStamp ? new Date(info.timeStamp).toLocaleDateString() : "";
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
    

  setMappedMedHistory([...arr])

  }


 

  const InitData = {
    patientID: "",
    startDate: "",
    endDate: ""
  };
  const [medSearchInputs, setMedSearchInputs] = useState(InitData);
  const [fetchedMedHistory, setFetchedMedHistory] = useState([])
  const [mappedMedHistory, setMappedMedHistory] = useState([])

  const [loading, setloading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const dispatch = useDispatch();

  useEffect(()=> {

    mapMedHistory();
  }, [fetchedMedHistory])

  const handleSearchInputsChange = (e) => {
    setMedSearchInputs({
      ...medSearchInputs,
      [e.target.name]: e.target.value,
    });
    console.log('medSearchInputs', medSearchInputs);
  };

  const handleDownload = () => {
    setDownloading(true);
    dispatch(downloadMedHistory(medSearchInputs))
    .then(res => {
      console.log("res from download med history", res);
      if(res?.error) {
        setDownloading(false);
        return notify(res.error)
      }
      const file = new Blob(
        [res], 
        {type: "application/pdf"}
      )

      const fileURL = URL.createObjectURL(file);
      setDownloading(false)
      window.open(fileURL)
      // if(res?.error) {
      //   setDownloading(false);
      //   return notify(res.error);
      // }
        
          
      //     console.log('res message', res.message)
      //     setDownloading(false);
      //     return notify(res.message);
    })
  }

  const handleMedSearchInputsSubmit = (e) => {
    e.preventDefault(); 
    setloading(true);
    dispatch(SearchMedHistory(medSearchInputs)).then(res=>{
      console.log("res from search med history", res);
      if(res?.error) {
        setloading(false);
        return notify(res.error);
      }
        if(res.message === "Fetched data") {
          setFetchedMedHistory(res.medHistory);
        }
          
          console.log('res message', res.message)
          setloading(false);
          return notify(res.message);
      
    })
    // setloading(false);
    // setMedSearchInputs(InitData);
    // notify("Got Medical History");
  };

  // const MedHistory = useSelector((state) => state.data.PatientMedicalHistory);

  
  // useEffect(() => {
  //   disptach(GetMedHistory());
  // }, []);

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor" && data?.user.userType !== "nurse") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
    <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">

        <div className="mainAmbupance">
            <h1>Search Medical History</h1>

            {/* ******************************************************** */}
            <form onSubmit={handleMedSearchInputsSubmit}>
              <div>
                <label>Patient ID</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="e.g. Pt-1kdd2l2d"
                    name="patientID"
                    value={medSearchInputs.patientID}
                    onChange={handleSearchInputsChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>From</label>
                <div className="inputdiv">
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={medSearchInputs.startDate}
                    onChange={handleSearchInputsChange}
                  />
                </div>
              </div>
              <div>
                <label>To</label>
                <div className="inputdiv">
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={medSearchInputs.endDate}
                    onChange={handleSearchInputsChange}
                  />
                </div>
              </div>

              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Search"}
              </button>
              <button type="button" className="formsubmitbutton" onClick={handleDownload}>
                {downloading ? "Generating...": "Generate Pdf"}
              </button>
            </form>
          </div>
        <div className="Payment_Page">
          <h1 style={{ marginTop: "2rem", marginBottom: "2rem", maxWidth: "80vw" }}>Medical History</h1>
          <div className="wardBox">
            <Table columns={columns} dataSource={mappedMedHistory} />
          </div>
        </div>
        
          {/* <div className="Payment_Page">
            <h1 style={{ marginBottom: "2rem" }}>Appointment Details</h1>
            <div className="patientBox">
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Mobile</th>
                    <th>Disease</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Resolve</th>
                  </tr>
                </thead>
                <tbody>
                  {MedHistory?.map((ele) => {
                    return (
                      <tr>
                        <td>{ele.patientName}</td>
                        <td>{ele.mobile}</td>
                        <td>{ele.disease}</td>
                        <td>{ele.department}</td>
                        <td>{ele.date}</td>
                        <td>
                          <button
                            style={{
                              border: "none",
                              color: "red",
                              outline: "none",
                              background: "transparent",
                              cursor: "pointer",
                            }}
                            onClick={() => DeleteAppoint(ele._id)}
                          >
                            Delete
                          </button>
                        </td>
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

export default ViewMedHistory;
