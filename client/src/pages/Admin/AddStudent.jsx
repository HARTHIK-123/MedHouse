import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import backendURL from "../../config";
import "./AddStudent.css";

function AddStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const navigate = useNavigate();

  async function handleAddStudent(e) {
    e.preventDefault();

    if (password !== conPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    try {
      const response = await axios.post(`${backendURL}/api/v1/user/signup`, {
        name,
        email,
        gender,
        password,
      });

      if (response.data.status === "success") {
        Swal.fire("Success", "Student added successfully!", "success")
      } else {
        Swal.fire("Error", "Failed to add student. Try again!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Network issue. Please try later.", "error");
    }
  }

  return (
    <div className="admin-add-student-container">
      <div className="admin-student-form-container">
        <h1>Add Student</h1>
        <form onSubmit={handleAddStudent}>
          <div className="admin-form-group">
            <label htmlFor="student-name">Name</label>
            <input
              type="text"
              id="student-name"
              placeholder="Enter student's full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="student-email">Email</label>
            <input
              type="email"
              id="student-email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="student-gender">Gender</label>
            <select
              id="student-gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label htmlFor="student-password">Password</label>
            <input
              type="password"
              id="student-password"
              placeholder="Set a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Re-enter password"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Add Student</button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
