import React, { useState, createElement } from "react";
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
    setInputs([...inputs, { id: Math.random().toString(36).substring(2), value: '' }])
  }

  const handleChange = (id, event) => {
    setInputs(inputs.map(input => (input.id === id ? { ...input, value: event.target.value } : input)))
  }

  const handleRemove = (id) => {
    setInputs(inputs.filter((input) => input.id !== id))
  }

 ////

  const dispatch = useDispatch();
  const initmed = {
    medName: "",
    dosage: "",
    duration: "",
  };
  const [med, setmed] = useState(initmed);

  const [medicines, setmedicines] = useState([]);

  const HandleMedChange = (e) => {
    setmed({ ...med, [e.target.name]: e.target.value });
  };

  const InitData = {
    docName: "",
    nurseName: "",
    patientName: "",
    disease: "",
    temperature: "",
    weight: "",
    bloodPressure: "",
    glocuse: "",
    extrainfo: "",
    date: "",
    time: "",
    medicines: [],
  };

  const [consultationInfo, setConsultationInfo] = useState(InitData);

  const handleConsultationInfoChange = (e) => {
    setConsultationInfo({ ...consultationInfo, [e.target.name]: e.target.value });
  };

  const HandleMedAdd = (e) => {
    e.preventDefault();
    setmedicines([...medicines, med]);
    setmed(initmed);
  };

  const handleConsultationInfoSubmit = (e) => {
    e.preventDefault();
    let data = {
      ...consultationInfo,
      medicines,
    };
    try {
      setLoading(true);
      dispatch(AddConsulationInfo(data)).then((res) => {
        if (res.message === "ConsulationInfo successfully created") {
          notify("Patient Consulted Successfully");
          setLoading(false);
          setConsultationInfo(InitData);
        } else {
          setLoading(false);
          notify("Something went Wrong");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor") {
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
            <form>
              <div>
                <label>Doctor Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="docName"
                    value={consultationInfo.docName}
                    onChange={handleConsultationInfoChange}
                    required
                  />
                </div>
              </div>
              <div>
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
              </div>
              <div>
                <label>Patient Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Name"
                    name="patientName"
                    value={consultationInfo.patientName}
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
                <label>Date</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    name="date"
                    value={consultationInfo.date}
                    onChange={handleConsultationInfoChange}
                  />
                </div>
              </div>
              <div>
                <label>Time</label>
                <div className="inputdiv">
                  <input
                    type="time"
                    name="time"
                    value={consultationInfo.time}
                    onChange={handleConsultationInfoChange}
                  />
                </div>
              </div>

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

                <div >
                <label>Medicines</label>
                <div className="medicines_div">
                <div className="medicine_inputs_div">
                {
                  inputs.map((input, index) => (
                  <div className="inputdiv" key={input.id}>
                  <input
                    type="text"
                    placeholder="PCM"
                    name="medName"
                    value={input.value}
                    onChange={e => handleChange(input.id, e)}
                  />
                  <select name="duration" >
                    <option value="Dosage">Duration</option>
                    <option value="After Meal">After Meal</option>
                    <option value="Before Meal">Before Meal</option>
                  </select>
                  <select name="dosage" >
                    <option value="Dosage">Dosage</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
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
                className="formsubmitbutton bookingbutton"
                onClick={handleConsultationInfoSubmit}
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
