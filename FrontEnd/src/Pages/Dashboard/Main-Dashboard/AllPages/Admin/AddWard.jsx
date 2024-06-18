import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import { 
        AddWard, 
        deleteWard, 
        getAllWards } from "../../../../../Redux/Datas/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Link } from "react-router-dom";
import { Table } from "antd";

const notify = (text) => toast(text);

const AddWards = () => {
  const { data } = useSelector((store) => store.auth);

  

  const wardColumns = [
    { title: "Ward Name", dataIndex: "wardName"},
    // { title: "Doctors(Av | Tot)", dataIndex: "doctors" },
    // { title: "Nurses(Av | Tot)", dataIndex: "nurses" },
    // { title: "Rooms(Av | Tot)", dataIndex: "rooms" },
    // { title: "Beds(Av | Tot)", dataIndex: "beds"},
    { title: "", dataIndex: "deleteWard"}
  ];


  // const wards = [
  //   { 
  //     wardName: "Ward 01", 
  //     doctors: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     nurses: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     rooms: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     beds: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>),
  //     deleteWard: <button
  //       style={{
  //         border: "none",
  //         color: "red",
  //         outline: "none",
  //         background: "transparent",
  //         cursor: "pointer",
  //       }}
  //       onClick={() => deleteWard(1)}
  //     >
  //       delete ward
  //     </button>
  //   },
  //   { 
  //     wardName: "Ward 01", 
  //     doctors: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     nurses: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     rooms: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     beds: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>),
  //     deleteWard: <button
  //       style={{
  //         border: "none",
  //         color: "red",
  //         outline: "none",
  //         background: "transparent",
  //         cursor: "pointer",
  //       }}
  //       onClick={() => deleteWard(1)}
  //     >
  //       delete ward
  //     </button>
  //   },
  //   { 
  //     wardName: "Ward 01", 
  //     doctors: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     nurses: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     rooms: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     beds: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>),
  //     deleteWard: <button
  //       style={{
  //         border: "none",
  //         color: "red",
  //         outline: "none",
  //         background: "transparent",
  //         cursor: "pointer",
  //       }}
  //       onClick={() => deleteWard(1)}
  //     >
  //       delete ward
  //     </button>
  //   },
  //   { 
  //     wardName: "Ward 01", 
  //     doctors: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     nurses: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     rooms: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>), 
  //     beds: (<><Link to={"#"}>12</Link> | <Link to={"#"}>40</Link></>),
  //     deleteWard: <button
  //       style={{
  //         border: "none",
  //         color: "red",
  //         outline: "none",
  //         background: "transparent",
  //         cursor: "pointer",
  //       }}
  //       onClick={() => deleteWard(1)}
  //     >
  //       delete ward
  //     </button>
  //   }
  // ]

  const InitData = {
    wardName: ""
  };
  const [wardData, setWardData] = useState(InitData);

  const [loading, setloading] = useState(false);
  const [fetchedWards, setFetchedWards ] = useState([]);
  const [mappedWards, setMappedWards ] = useState([])

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false);

  const handleWardDelete = (wardId) => {

    let clickedOk = window.confirm("Warning!!!\nYou are about to delete a ward\nContinue?");
    if(clickedOk === true) {
        dispatch(deleteWard(wardId)).then((res) => {
          console.log('res', res)
            notify(res.message)
            if(res.message === "ward has been deleted") {
              setIsDeleted(true)
            }
          })
          .catch(err => {
            notify(err.message)
          })
    }
  
  }

  const mapWards = () => {
    let arr = []
    fetchedWards.forEach((ward)=>{
      let obj = {};
      obj.key = ward._id
      obj.wardName = ward.wardName;
      obj.deleteWard = <button
      style={{
        border: "none",
        color: "red",
        outline: "none",
        background: "transparent",
        cursor: "pointer",
      }}
      onClick={() => handleWardDelete(ward._id)}
    >
      Remove
    </button>
    arr.push(obj);
    
  });

  setMappedWards([...arr])

  }

  const dispatch = useDispatch();


  useEffect(()=> {
    dispatch(getAllWards()).then(res => {
      console.log('get all ward res', res)
      setFetchedWards(res);
    })
    
  }, [])

  useEffect(()=> {
    if(isSubmitted === true || isDeleted === true) {
      dispatch(getAllWards()).then(res => {
        console.log('get all ward res', res)
        setFetchedWards(res);
      })
    }
    setIsSubmitted(false)
    setIsDeleted(false)
    
  }, [isSubmitted, isDeleted])

  useEffect(()=> {
    console.log('fetchedWards', fetchedWards)
    mapWards()

  }, [fetchedWards])

  const HandleWardChange = (e) => {
    setWardData({
      ...wardData,
      [e.target.name]: e.target.value,
    });
  };

  const HandleWardSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    
    dispatch(AddWard(wardData)).then(res => {
      let testData;

      testData = res;
      console.log('testData', testData)
    setloading(false);
    setWardData(InitData);
    notify(testData.message);
    if(testData.message === "Ward created successfully"){
      setIsSubmitted(true)
    }
    
    })
    
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
            <h1>Add Wards</h1>

            {/* ******************************************************** */}
            <form onSubmit={HandleWardSubmit}>
              <div>
                <label>Ward Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Ward Name"
                    name="wardName"
                    value={wardData.wardName}
                    onChange={HandleWardChange}
                    required
                  />
                </div>
              </div>
              {/* <div>
                <label>Room Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="room no"
                    name="roomNumber"
                    value={WardData.roomNumber}
                    onChange={HandleWardChange}
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
          <h1>Wards</h1>
          <div className="wardBox">
            <Table columns={wardColumns} dataSource={mappedWards} />
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default AddWards;
