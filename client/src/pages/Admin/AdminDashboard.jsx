import React, { useState } from "react";
import "./AdminDashboard.css";
import AttendeeTable from "./AttendeeTable";
import RoomInquiriesTable from "./RoomInquiriesTable";
import CleaningTable from "./CleaningTable";
import AttendanceService from "./AttendanceService";
import ClearanceTable from "./ClearanceTable";
import MentoringTable from "./ComplaintsTable";
import LeaveRequestTable from "./LeaveRequestTable";
import StatisticsTab from "./StatisticsTab";
import AddStudent from "./AddStudent";
import ComplaintsTable from "./ComplaintsTable";

function AdminDashboard() {
  const [selectedTable, setSelectedTable] = useState("statistics");

  const handleNavItemClick = (tableName) => {
    setSelectedTable(tableName);
  };

  return (
    <div className="admin-dashboard">
      <div className="side-nav">
        <div className="nav-item-title">ADMIN DASHBOARD</div>
        <div
          className="nav-item"
          onClick={() => handleNavItemClick("statistics")}
        >
          Statistics
        </div>
        <div
          className="nav-item"
          onClick={() => handleNavItemClick("attendee")}
        >
          Attendee
        </div>
        <div
          className="nav-item"
          onClick={() => handleNavItemClick("roomInquiries")}
        >
          Room Inquiries
        </div>
        <div
          className="nav-item"
          onClick={() => handleNavItemClick("cleaning")}
        >
          Cleaning
        </div>
        <div
          className="nav-item"
          onClick={() => handleNavItemClick("attendanceService")}
        >
          Take Attendance
        </div>
        <div
          className="nav-item"
          onClick={() => handleNavItemClick("clearance")}
        >
          Clearance
        </div>
        <div
          className="nav-item"
          onClick={() => handleNavItemClick("complaints")}
        >
          Complaints
        </div>
        <div
          className="nav-item"
          onClick={() => handleNavItemClick("leaveRequest")}
        >
          Leave Request
        </div>
        <div
          className="nav-item"
          onClick={() => handleNavItemClick("addStudent")}
        >
          Add Student
        </div>
      </div>
      <div className="table-container">
        {selectedTable === "statistics" && <StatisticsTab />}
        {selectedTable === "attendee" && <AttendeeTable />}
        {selectedTable === "roomInquiries" && <RoomInquiriesTable />}
        {selectedTable === "cleaning" && <CleaningTable />}
        {selectedTable === "attendanceService" && <AttendanceService />}
        {selectedTable === "clearance" && <ClearanceTable />}
        {selectedTable === "complaints" && <ComplaintsTable />}
        {selectedTable === "leaveRequest" && <LeaveRequestTable />}
        {selectedTable === "addStudent" && <AddStudent />}
      </div>
    </div>
  );
}

export default AdminDashboard;
