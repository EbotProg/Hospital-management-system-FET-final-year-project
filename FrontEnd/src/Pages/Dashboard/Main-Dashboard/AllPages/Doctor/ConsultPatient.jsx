import React, { useState, createElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CreatePayment, AddConsulationInfo } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const notify = (text) => toast(text);

const AddConsultations = () => {
  const { data } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);

 //test code for adding prescription inputs
  const [inputs, setInputs] = useState([]);

  const handleAdd = () => {
    setInputs([...inputs, { id: Math.random().toString(36).substring(2), medName: '', duration: 'Duration', dosage: 'Dosage' }])
  }

  const handleMedInputChange = (id, event) => {
    setInputs(inputs.map(input => (input.id === id ? { ...input, medName: event.target.value } : input)))
  }
  const handleMedFirstSelectChange = (id, event) => {
    setInputs(inputs.map(input => (input.id === id ? { ...input, duration: event.target.value } : input)))
  }
  const handleMedSecondSelectChange = (id, event) => {
    setInputs(inputs.map(input => (input.id === id ? { ...input, dosage: event.target.value } : input)))
  }

  const handleRemove = (id) => {
    setInputs(inputs.filter((input) => input.id !== id))
  }

 

 ////

  const dispatch = useDispatch();
  // const initmed = {
  //   medName: "",
  //   dosage: "",
  //   duration: "",
  // };
  // const [med, setmed] = useState(initmed);

  const [medicines, setMedicines] = useState([]);

  useEffect(()=> {
    let array = []
    for( let input of inputs) {
      let obj = {}
      obj.medName = input.medName
      obj.duration = input.duration
      obj.dosage = input.dosage
      array.push(obj)
    }
    console.log('array', array)
    setMedicines([...array])
  }, [inputs])

  useEffect(()=> {
    const obj = data?.user.userType === "doctor" ? { docID: data?.user.docID} : { nurseID: data?.user.nurseID};
    setConsultationInfo({ ...consultationInfo, ...obj });

  }, [data])

  // const HandleMedChange = (e) => {
  //   setmed({ ...med, [e.target.name]: e.target.value });
  // };

  const InitData = {
    docID: "",
    nurseID: "",
    patientID: "",
    disease: "",
    temperature: "",
    weight: "",
    bloodPressure: "",
    glocuse: "",
    extrainfo: "",
    dateTime: "",
    medicines: [],
  };

  const [consultationInfo, setConsultationInfo] = useState(InitData);

  const handleConsultationInfoChange = (e) => {
    setConsultationInfo({ ...consultationInfo, [e.target.name]: e.target.value });
  };

  // const HandleMedAdd = (e) => {
  //   e.preventDefault();
  //   setMedicines([...medicines, med]);
  //   setmed(initmed);
  // };

  const handleConsultationInfoSubmit = (e) => {
    e.preventDefault();
    
    let info = {
      ...consultationInfo,
      medicines,
    };
    console.log('data', info)
    try {
      setLoading(true);
      dispatch(AddConsulationInfo(info)).then((res) => {
        console.log("res from consultation", res)
        if (res.error) {
          setLoading(false);
          return notify(res.error);

        } else {
          setLoading(false);
          setConsultationInfo(InitData);
          if(res.message === "patient consulted successfully")
          return notify(res.message);

        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (data?.isAuthticated === false) {
    console.log("not authenticated", data?.isAuthticated )
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor" && data?.user.userType !== "nurse") {
    console.log("usertype", data?.user.userType)
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Consult Patient</h1>
            <form onSubmit={handleConsultationInfoSubmit}>
              <div>
                <label>Your ID</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder={data?.user.userType === "doctor" ? "e.g. Doc-dkw12kl2": "e.g. Nrs-dkw12kl2"}
                    name={data?.user.userType === "doctor" ? "docID": "nurseID"}
                    value={data?.user.userType === "doctor"? consultationInfo.docID: consultationInfo.nurseID}
                    onChange={handleConsultationInfoChange}
                    required
                  />
                </div>
              </div>
              {/* <div>
                <label>Nurse Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Nurse Name"
                    name="nurseName"
                    value={consultationInfo.nurseName}
                    onChange={handleConsultationInfoChange}
                    required
                  />
                </div>
              </div> */}
              <div>
                <label>Patient ID</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="e.g. Pt-dkw12kl2"
                    name="patientID"
                    value={consultationInfo.patientID}
                    onChange={handleConsultationInfoChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Disease</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Disease"
                    name="disease"
                    value={consultationInfo.disease}
                    onChange={handleConsultationInfoChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Temperature</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="99^C"
                    name="temperature"
                    value={consultationInfo.temperature}
                    onChange={handleConsultationInfoChange}
                  />
                </div>
              </div>

              <div>
                <label>Weight</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="75 KG"
                    name="weight"
                    value={consultationInfo.weight}
                    onChange={handleConsultationInfoChange}
                  />
                </div>
              </div>
              
              {/* <div>
                <label>Patient Blood Group</label>
                <div className="inputdiv">
                  <select
                    name="patientBloodGroup"
                    value={consultationInfo.patientBloodGroup}
                    onChange={handleConsultationInfoChange}
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
              </div> */}
             
              

              
              <div>
                <label>Blood Pressure</label>
                <div className="inputdiv adressdiv">
                  <input
                    type="number"
                    placeholder="140/90 mmHg"
                    name="bloodPressure"
                    value={consultationInfo.bloodPressure}
                    onChange={handleConsultationInfoChange}
                  />
                </div>
              </div>
              <div>
                <label>Glucose</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="99 mg/dL"
                    name="glucose"
                    value={consultationInfo.glucose}
                    onChange={handleConsultationInfoChange}
                  />
                </div>
              </div>
              <div>
                <label>Extra Info</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Info"
                    name="extrainfo"
                    value={consultationInfo.extrainfo}
                    onChange={handleConsultationInfoChange}
                  />
                </div>
              </div>

              {/* *********************************** */}
              <div>
                <label>Date and Time</label>
                <div className="inputdiv">
                  <input
                    type="datetime-local"
                    placeholder="dd-mm-yyyy"
                    name="dateTime"
                    value={consultationInfo.dateTime}
                    onChange={handleConsultationInfoChange}
                  />
                </div>
              </div>
              {/* <div>
                <label>Time</label>
                <div className="inputdiv">
                  <input
                    type="time"
                    name="time"
                    value={consultationInfo.time}
                    onChange={handleConsultationInfoChange}
                  />
                </div>
              </div> */}

              {/* ******************************************** */}
              <h1 style={{ marginTop: "2rem" }}>Prescriptions</h1>
              {/* <div>
                <label>Medicines</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="PCM"
                    name="medName"
                    value={med.medName}
                    onChange={HandleMedChange}
                  />
                  <select name="duration" onChange={HandleMedChange}>
                    <option value="Dosage">Duration</option>
                    <option value="After Meal">After Meal</option>
                    <option value="Before Meal">Before Meal</option>
                  </select>
                  <select name="dosage" onChange={HandleMedChange}>
                    <option value="Dosage">Dosage</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <input type="submit" value={"Add"} onClick={HandleMedAdd} />
                </div>
              </div> */}
                <p style={{ textAlign: "center", marginBottom: "1rem" }}>*BID=twice a day*  *QD=once a day*  *PRN=as needed* *HS=Bed time*</p>

                <div >
                <label>Medicines</label>
                <div className="medicines_div">
                <div className="medicine_inputs_div">
                {
                  inputs.map((input, index) => (
                  <div className="inputdiv med_input_div" key={input.id}>
                  <input
                    type="text"
                    placeholder="PCM"
                    name="medName"
                    value={input.medName}
                    onChange={e => handleMedInputChange(input.id, e)}
                  />
                  <select name="duration" onChange={e => handleMedFirstSelectChange(input.id, e)}>
                    <option value="Dosage">Duration</option>
                    <option value="7 days">7 days</option>
                    <option value="1 month">1 month</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="Long-term">Long-term</option>
                  </select>
                  <select name="dosage" onChange={e => handleMedSecondSelectChange(input.id, e)} >
                    <option value="Dosage">Dosage</option>
                    <option value="500mg BID">500mg BID</option> {/* BID = twice daily */}
                    <option value="10mg QD">10mg QD</option> {/* QD = once daily */}
                    <option value="200mg PRN">200mg PRN</option> {/* PRN = as needed */}
                    <option value="20mg HS">20mg HS</option> {/* HS = Bedtime */}
                  </select>
                   <button type="button" onClick={e => handleRemove(input.id)}>Remove</button>
                </div>
                  ))
                }
                

                </div>
                
                {inputs.length > 0 && <button type="button" className="add_prescription_btn" onClick={handleAdd} >Add</button>}
                </div>
                
                {inputs.length === 0 && <button type="button" className="add_prescription_btn" onClick={handleAdd} >Add</button>}

              </div>
              

              <button
                type="submit"
                className="formsubmitbutton bookingbutton"
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

export default AddConsultations;
