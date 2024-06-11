import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import { AddRoom } from "../../../../../Redux/Datas/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const notify = (text) => toast(text);

const AddRooms = () => {
  const { data } = useSelector((store) => store.auth);

  const InitData = {
    roomNumber: "",
    wardName: "",
  };
  const [roomData, setRoomData] = useState(InitData);

  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

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
    dispatch(AddRoom(roomData));
    setloading(false);
    setRoomData(InitData);
    notify("Room Added");
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
                    placeholder="Room No"
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
                    placeholder="Ward Name"
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
        </div>
      </div>
    </>
  );
};

export default AddRooms;
