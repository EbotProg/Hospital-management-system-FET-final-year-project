import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import { AddWard } from "../../../../../Redux/Datas/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const notify = (text) => toast(text);

const AddWards = () => {
  const { data } = useSelector((store) => store.auth);

  const InitData = {
    wardNumber: ""
  };
  const [wardData, setWardData] = useState(InitData);

  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  const HandleWardChange = (e) => {
    setWardData({
      ...wardData,
      [e.target.name]: e.target.value,
    });
  };

  const HandleWardSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    dispatch(AddWard(wardData));
    setloading(false);
    setWardData(InitData);
    notify("Added Ward Successfully");
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
                    value={wardData.wardNumber}
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
        </div>
      </div>
    </>
  );
};

export default AddWards;
