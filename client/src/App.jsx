import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/ServicesPage/Services";
import Accommodation from "./pages/Accommodations/Accommodation";
import AccommodationForm from "./pages/Accommodations/Form/Form";
import SignInUpPage from "./pages/Sign-in-up/SignInUpPage";
import Cleaning from "./pages/ServicesPage/Forms/Cleaning";
import Medical from "./pages/ServicesPage/Forms/Medical";
import Clearance from "./pages/ServicesPage/Forms/Clearance";
import Mentoring from "./pages/ServicesPage/Forms/Mentoring";
import Leave from "./pages/ServicesPage/Forms/Leave";
import RoomInquire from "./pages/Accommodations/DetailPage/RoomInquire";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddStudent from "./pages/Admin/AddStudent";
import AdminSignin from "./pages/Admin/Signin";
import ComplaintForm from "./pages/ServicesPage/Forms/Complaint";
import AttendanceView from "./pages/ServicesPage/Forms/AttendanceView";

function App() {
  return (
    <Router>
      <Navbar /> {/* Render Navbar on all pages */}
      <Routes>
        <Route path="/" element={<SignInUpPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/accommodation/form" element={<AccommodationForm />} />
        <Route path="/accommodation/inquire" element={<RoomInquire />} />
        <Route path="/services/Cleaning" element={<Cleaning />} />
        <Route path="/services/Medical" element={<Medical />} />
        <Route path="/services/Clearance" element={<Clearance />} />
        <Route path="/services/Complaint" element={<ComplaintForm />} />
        <Route path="/services/Mentoring" element={<Mentoring />} />
        <Route path="/services/Leave" element={<Leave />} />
        <Route path="/services/Attendance" element={<AttendanceView />} />
        <Route path="/adminpage" element={<AdminDashboard />} />
        <Route path="/admin/signin" element={<AdminSignin />} />

        {/* <Route path="/addStudent" element={<AddStudent />} /> */}
      </Routes>
      <Footer /> {/* Render Footer on all pages */}
    </Router>
  );
}

export default App;
