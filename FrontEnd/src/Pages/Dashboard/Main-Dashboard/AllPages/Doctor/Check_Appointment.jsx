import { Table } from "antd";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  DeleteAppointment,
  GetAllAppointment,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";

const Check_Appointment = () => {
  const { data } = useSelector((store) => store.auth);

  const disptach = useDispatch();

  const columns = [
    { title: "Patient Name", dataIndex: "patientName"},
    { title: "Mobile", dataIndex: "phoneNumber"},
    { title: "Disease", dataIndex: "disease"},
    { title: "Department", dataIndex: "department"},
    { title: "Date", dataIndex: "date"},
    { title: "Resolve", dataIndex: "delete"},
  ];

  const appointments = [
      { 
        patientName: "Achale Ebot",
        phoneNumber: "6784858339",
        disease: "Cough",
        department: "maternity",
        date: "2022-01-01",
        delete: <button
        style={{
          border: "none",
          color: "red",
          outline: "none",
          background: "transparent",
          cursor: "pointer",
        }}
        onClick={() => DeleteAppoint(1)}
      >
        Delete
      </button>
      },
  ]

  const AllAppointment = useSelector((state) => state.data.Appointments);

  const DeleteAppoint = (id) => {
    disptach(DeleteAppointment(id));
  };
  useEffect(() => {
    disptach(GetAllAppointment());
  }, []);

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">

        <div className="Payment_Page">
          <h1 style={{ marginBottom: "2rem" }}>Appointment Details</h1>
          <div className="wardBox">
            <Table columns={columns} dataSource={appointments} />
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
                  {AllAppointment?.map((ele) => {
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

export default Check_Appointment;
