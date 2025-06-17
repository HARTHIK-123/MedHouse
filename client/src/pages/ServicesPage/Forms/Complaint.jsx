import React, { useState } from "react";
import "./forms.css"; // Optional: If you're importing custom styles
import { Link } from "react-router-dom";

const Complaint = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    studentID: "",
    studentEmail: "",
    year: "",
    branch: "",
    complaintText: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/v1/complaint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Complaint submitted successfully!");
        setFormData({
          studentName: "",
          studentID: "",
          studentEmail: "",
          year: "",
          branch: "",
          complaintText: "",
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="Cleaning">
      <div className="header">
        <Link to="/services">Back</Link>
        <h2>Complaint</h2>
        <Link to="/home">Home</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          required
        />

        <label>Roll No.:</label>
        <input
          type="text"
          name="studentID"
          value={formData.studentID}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="studentEmail"
          value={formData.studentEmail}
          onChange={handleChange}
          required
        />

        <label>Year:</label>
        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        >
          <option value="">Select year</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
        </select>

        <label>Branch:</label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
        />

        <label>Complaint:</label>
        <textarea
          name="complaintText"
          value={formData.complaintText}
          onChange={handleChange}
          rows={5}
          required
        ></textarea>

        <input type="submit" value="Submit Complaint" />
      </form>
    </div>
  );
};

export default Complaint;
