import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import { AddBed, getAllBeds, deleteBed } from "../../../../../Redux/Datas/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { Table } from "antd";
const notify = (text) => toast(text);

const AddBeds = () => {
  const { data } = useSelector((store) => store.auth);

  const roomColumns = [
    { title: "Bed#", dataIndex: "bedNumber"},
    { title: "Room#", dataIndex: "roomNumber"},
    { title: "Ward", dataIndex: "wardName"},
    { title: "Available", dataIndex: "isAvailable"},
    { title: "", dataIndex: "deleteBed"}
  ];


  const InitData = {
    roomNumber: "none",
    bedNumber: "",
    wardName: "",
  };
  const [BedData, setBedData] = useState(InitData);

  const [loading, setloading] = useState(false);

  const [fetchedBeds, setFetchedBeds ] = useState([]);
  const [mappedBeds, setMappedBeds ] = useState([])

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false);

  const handleBedDelete = (bedId) => {

    let clickedOk = window.confirm("Warning!!!\nYou are about to delete a bed\nContinue?");
    if(clickedOk === true) {
        dispatch(deleteBed(bedId)).then((res) => {
          console.log('res', res)
            notify(res.message)
            if(res.message === "Bed deleted") {
              setIsDeleted(true)
            }
          })
          .catch(err => {
            notify(err.message)
          })
    }
  
  }

  const mapBeds = () => {
    let arr = []
    fetchedBeds.forEach((bed)=>{
      let obj = {};
      obj.key = bed._id
      obj.bedNumber = bed.bedNumber;
      obj.wardName = bed.wardID.wardName;
      obj.roomNumber = bed.roomID.roomNumber;
      obj.isAvailable = bed.isAvailable === true ? "Yes": "No"
      obj.deleteBed = <button
      style={{
        border: "none",
        color: "red",
        outline: "none",
        background: "transparent",
        cursor: "pointer",
      }}
      onClick={() => handleBedDelete(bed._id)}
    >
      Remove
    </button>
    arr.push(obj);
    
  });

  setMappedBeds([...arr])

  }

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getAllBeds()).then(res => {
      console.log('get all bed res', res)
      setFetchedBeds(res);
    })
    
  }, [])

  useEffect(()=> {
    if(isSubmitted === true || isDeleted === true) {
      dispatch(getAllBeds()).then(res => {
        console.log('get all bed res', res)
        setFetchedBeds(res);
      })
    }
    setIsSubmitted(false)
    setIsDeleted(false)
    
  }, [isSubmitted, isDeleted])

  useEffect(()=> {
    console.log('fetchedBeds', fetchedBeds)
    mapBeds()

  }, [fetchedBeds])


  const HandleAmbuChange = (e) => {
    setBedData({
      ...BedData,
      [e.target.name]: e.target.value,
    });
    console.log('bedData', BedData);
  };

  const HandleAmbuSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    dispatch(AddBed(BedData)).then(res => {
      console.log("res from handlebedsubmit", res);
      if(res.error) {
        setloading(false);
        return notify(res.error);
      }
      notify(res.message)
      setloading(false);
      if(res.message === "Bed added successfully") {
        setIsSubmitted(true);
      }
      setBedData(InitData);

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
          <div className="mainAmbupance">
            <h1>Add Beds</h1>

            {/* ******************************************************** */}
            <form onSubmit={HandleAmbuSubmit}>
              <div>
                <label>Bed Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="e.g. 1"
                    name="bedNumber"
                    value={BedData.bedNumber}
                    onChange={HandleAmbuChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Room Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="eg 1"
                    name="roomNumber"
                    value={BedData.roomNumber}
                    onChange={HandleAmbuChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Ward Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="e.g. surgical ward"
                    name="wardName"
                    value={BedData.wardName}
                    onChange={HandleAmbuChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>

          <div className="wardDetails">
          <h1>Beds</h1>
          <div className="wardBox">
            <Table columns={roomColumns} dataSource={mappedBeds} />
          </div>
        </div>

        </div>
      </div>
    </>
  );
};

export default AddBeds;
