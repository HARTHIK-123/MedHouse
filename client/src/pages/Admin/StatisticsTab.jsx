import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import {
  FaUsers,
  FaQuestionCircle,
  FaBed,
  FaClipboardCheck,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";
import "./StatisticsTab.css";
import backendURL from "../../config";

// API functions with error handling
const fetchAttendees = async () => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/accommodation`);
    return response.data.requests.length;
  } catch (error) {
    console.error("Error fetching attendees:", error);
    return 0;
  }
};

const fetchRoomInquiries = async () => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/inquiries`);
    return response.data.inquiries.length;
  } catch (error) {
    console.error("Error fetching room inquiries:", error);
    return 0;
  }
};

const fetchCleaning = async () => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/cleaning`);
    return response.data.requests.length;
  } catch (error) {
    console.error("Error fetching cleaning data:", error);
    return 0;
  }
};

const fetchClearance = async () => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/clearance`);
    return response.data.requests.length;
  } catch (error) {
    console.error("Error fetching clearance data:", error);
    return 0;
  }
};

const fetchLeaveRequests = async () => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/leave`);
    return response.data.requests.length;
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    return 0;
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get(`${backendURL}/api/v1/user/getAllUsers`);
    return response.data.users.length;
  } catch (error) {
    console.error("Error fetching users:", error);
    return 0;
  }
};

// Chart configuration
const getChartOptions = () => ({
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: [
    "#007BFF",
    "#FFC107",
    "#28A745",
    "#6F42C1",
    "#20C997",
    "#343A40",
  ],
  xaxis: {
    categories: [
      "Attendees",
      "Room Inquiries",
      "Cleaning",
      "Clearance",
      "Leave Request",
      "Users",
    ],
  },
  yaxis: {
    title: {
      text: "Counts",
      style: {
        fontSize: "16px",
        fontWeight: 600,
      },
    },
  },
  tooltip: {
    enabled: true,
    style: {
      fontSize: "14px",
    },
  },
});

// Stats Card Component
const StatCard = ({ icon: Icon, title, value, cardClass, iconClass }) => (
  <div className={`card ${cardClass}`}>
    <div className={`card-icon ${iconClass}`}>
      <Icon />
    </div>
    <div className="card-text">
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
    </div>
  </div>
);

function StatisticsTab() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  // Individual state for each count
  const [attendeesCount, setAttendeesCount] = useState(0);
  const [roomInquiriesCount, setRoomInquiriesCount] = useState(0);
  const [cleaningCount, setCleaningCount] = useState(0);
  const [clearanceCount, setClearanceCount] = useState(0);
  const [leaveRequestCount, setLeaveRequestCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  // Separate useEffect for each API call
  useEffect(() => {
    const fetchAttendeesData = async () => {
      const count = await fetchAttendees();
      setAttendeesCount(count);
    };
    fetchAttendeesData();
  }, []);

  useEffect(() => {
    const fetchRoomInquiriesData = async () => {
      const count = await fetchRoomInquiries();
      setRoomInquiriesCount(count);
    };
    fetchRoomInquiriesData();
  }, []);

  useEffect(() => {
    const fetchCleaningData = async () => {
      const count = await fetchCleaning();
      setCleaningCount(count);
    };
    fetchCleaningData();
  }, []);

  useEffect(() => {
    const fetchClearanceData = async () => {
      const count = await fetchClearance();
      setClearanceCount(count);
    };
    fetchClearanceData();
  }, []);

  useEffect(() => {
    const fetchLeaveRequestsData = async () => {
      const count = await fetchLeaveRequests();
      setLeaveRequestCount(count);
    };
    fetchLeaveRequestsData();
  }, []);

  useEffect(() => {
    const fetchUsersData = async () => {
      const count = await fetchUsers();
      setUsersCount(count);
    };
    fetchUsersData();
  }, []);

  // DateTime update effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const chartSeries = [
    {
      name: "Count",
      data: [
        attendeesCount,
        roomInquiriesCount,
        cleaningCount,
        clearanceCount,
        leaveRequestCount,
        usersCount,
      ],
    },
  ];

  return (
    <div className="statistics-tab">
      <div>
        <div>
          <h2>Statistics</h2>
        </div>
        <div className="live-date-time">{currentDateTime.toLocaleString()}</div>
      </div>

      <div className="card-container">
        <StatCard
          icon={FaUsers}
          title="Attendees"
          value={attendeesCount}
          cardClass="card-blue"
          iconClass="blue"
        />
        <StatCard
          icon={FaQuestionCircle}
          title="Room Inquiries"
          value={roomInquiriesCount}
          cardClass="card-yellow"
          iconClass="yellow"
        />
        <StatCard
          icon={FaBed}
          title="Cleaning"
          value={cleaningCount}
          cardClass="card-green"
          iconClass="green"
        />
        <StatCard
          icon={FaClipboardCheck}
          title="Clearance"
          value={clearanceCount}
          cardClass="card-purple"
          iconClass="purple"
        />
        <StatCard
          icon={FaClipboardList}
          title="Leave Request"
          value={leaveRequestCount}
          cardClass="card-teal"
          iconClass="teal"
        />
        <StatCard
          icon={FaUser}
          title="Users"
          value={usersCount}
          cardClass="card-dark"
          iconClass="dark"
        />
      </div>

      <div className="chart-container">
        <div className="chart">
          <h3>Bar Chart</h3>
          <ReactApexChart
            options={getChartOptions()}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}

export default StatisticsTab;