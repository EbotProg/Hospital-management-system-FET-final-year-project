import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import { AddRoom, deleteRoom, getAllRooms } from "../../../../../Redux/Datas/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { Table } from "antd";

const notify = (text) => toast(text);

const AddRooms = () => {
  const { data } = useSelector((store) => store.auth);

  const roomColumns = [
    { title: "Room Number", dataIndex: "roomNumber"},
    { title: "ward", dataIndex: "wardName"},
    { title: "", dataIndex: "deleteRoom"}
  ];

  const InitData = {
    roomNumber: "",
    wardName: "",
  };
  const [roomData, setRoomData] = useState(InitData);

  const [loading, setloading] = useState(false);

  const [fetchedRooms, setFetchedRooms ] = useState([]);
  const [mappedRooms, setMappedRooms ] = useState([])

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false);

  const handleRoomDelete = (roomId) => {

    let clickedOk = window.confirm("Warning!!!\nYou are about to delete a room\nContinue?");
    if(clickedOk === true) {
        dispatch(deleteRoom(roomId)).then((res) => {
          console.log('res', res)
            notify(res.message)
            if(res.message === "room has been deleted") {
              setIsDeleted(true)
            }
          })
          .catch(err => {
            notify(err.message)
          })
    }
  
  }

  const mapRooms = () => {
    let arr = []
    if(fetchedRooms?.length > 0) {
      fetchedRooms.forEach((room)=>{
        let obj = {};
        obj.key = room?._id
        obj.roomNumber = room?.roomNumber;
        obj.wardName = room?.wardID.wardName;
        obj.deleteRoom = <button
        style={{
          border: "none",
          color: "red",
          outline: "none",
          background: "transparent",
          cursor: "pointer",
        }}
        onClick={() => handleRoomDelete(room._id)}
      >
        Remove
      </button>
      arr.push(obj);
      
    });
    }
    

  setMappedRooms([...arr])

  }

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getAllRooms()).then(res => {
      console.log('get all room res', res)
      setFetchedRooms(res);
    })
    
  }, [])

  useEffect(()=> {
    if(isSubmitted === true || isDeleted === true) {
      dispatch(getAllRooms()).then(res => {
        console.log('get all room res', res)
        setFetchedRooms(res);
      })
    }
    setIsSubmitted(false)
    setIsDeleted(false)
    
  }, [isSubmitted, isDeleted])

  useEffect(()=> {
    console.log('fetchedRooms', fetchedRooms)
    mapRooms()

  }, [fetchedRooms])


  const handleRoomChange = (e) => {
    setRoomData({
      ...roomData,
      [e.target.name]: e.target.value,
    });
    console.log('RoomData', roomData);
  };

  const handleRoomSumit = (e) => {
    e.preventDefault();
    setloading(true);
    dispatch(AddRoom(roomData)).then(res => {
      console.log('res handleroomsubmit', res);
      if(res.error) {
        setloading(false);
       return notify(res.error);
      }
      if(res.message === "Room created successfully"){
        setIsSubmitted(true)
      }

      setloading(false);
    notify(res.message);
    setRoomData(InitData)
    });
    ;

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
            <h1>Add Rooms</h1>

            {/* ******************************************************** */}
            <form onSubmit={handleRoomSumit}>
              <div>
                <label>Room Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="e.g. 1"
                    name="roomNumber"
                    value={roomData.roomNumber}
                    onChange={handleRoomChange}
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
                    value={roomData.wardName}
                    onChange={handleRoomChange}
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
          <h1>Rooms</h1>
          <div className="wardBox">
            <Table columns={roomColumns} dataSource={mappedRooms} />
          </div>
        </div>

        </div>
      </div>
    </>
  );
};

export default AddRooms;
