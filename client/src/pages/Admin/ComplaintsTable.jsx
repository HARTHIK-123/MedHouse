import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ComplaintsTable.css";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import backendURL from "../../config";

// Initialize EmailJS
emailjs.init("McyT0cwVhQOXgog9F");

function ComplaintsTable() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "pending", "accepted", "rejected"
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, [filter, searchTerm]);

  console.log(complaints)

  const fetchComplaints = async () => {
    try {
      let url = `${backendURL}/api/v1/complaint`;
      if (filter !== "all" || searchTerm) {
        url += `?status=${filter !== "all" ? filter : ""}${
          searchTerm ? `&search=${searchTerm}` : ""
        }`;
      }

      const response = await axios.get(url);
      setComplaints(response.data.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch complaints. Please try again later.",
      });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`${backendURL}/api/v1/complaint/${id}/status`, {
        status: newStatus,
      });

      // Open modal for sending email notification if status is changed
      if (newStatus !== "pending") {
        const complaint = complaints.find((c) => c._id === id);
        setSelectedComplaint(complaint);
        setIsModalOpen(true);
      }

      // Refresh the complaints list
      fetchComplaints();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Complaint status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update complaint status.",
      });
    }
  };

  const handleSendEmail = async () => {
    if (!selectedComplaint || !emailMessage) return;

    try {
      const emailSubject = `Your Complaint Status Update (ID: ${selectedComplaint.studentID})`;
      
      await emailjs.send("service_dab7f58", "template_b5hpmrk", {
        to_email: selectedComplaint.studentEmail,
        subject: emailSubject,
        description: emailMessage,
      });

      Swal.fire({
        icon: "success",
        title: "Email Sent",
        text: `Notification sent to ${selectedComplaint.studentEmail}`,
      });

      setIsModalOpen(false);
      setEmailMessage("");
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send email notification.",
      });
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "badge-warning",
      accepted: "badge-success",
      rejected: "badge-danger",
    };
    return (
      <span className={`badge ${statusClasses[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="complaints-container">
      <h1 className="complaints-header">Complaints Management</h1>
      
      <div className="complaints-controls">
        <div className="filter-controls">
          <label>Filter by Status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-select"
          >
            <option value="all">All Complaints</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div className="search-controls">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search by student ID or name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="complaints-table-container">
        <table className="complaints-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Details</th>
              <th>Complaint</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint.studentID}</td>
                  <td>
                    <div className="student-info">
                      <strong>{complaint.studentName}</strong>
                      <small>{complaint.studentEmail}</small>
                      <small>{complaint.year} Year, {complaint.branch}</small>
                    </div>
                  </td>
                  <td>
                    <div className="complaint-meta">
                      <span>Year: {complaint.year}</span>
                      <span>Branch: {complaint.branch}</span>
                    </div>
                  </td>
                  <td className="complaint-text">
                    <div className="text-truncate" title={complaint.complaintText}>
                      {complaint.complaintText}
                    </div>
                    <button 
                      className="view-full-btn"
                      onClick={() => {
                        Swal.fire({
                          title: "Full Complaint",
                          text: complaint.complaintText,
                          confirmButtonText: "Close"
                        });
                      }}
                    >
                      View Full
                    </button>
                  </td>
                  <td>{formatDate(complaint.createdAt)}</td>
                  <td>{getStatusBadge(complaint.status)}</td>
                  <td>
                    <div className="action-buttons">
                      {complaint.status === "pending" && (
                        <>
                          <button
                            className="btn-accept"
                            onClick={() => handleStatusChange(complaint._id, "accepted")}
                          >
                            Accept
                          </button>
                          <button
                            className="btn-reject"
                            onClick={() => handleStatusChange(complaint._id, "rejected")}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {complaint.status !== "pending" && (
                        <button
                          className="btn-reset"
                          onClick={() => handleStatusChange(complaint._id, "pending")}
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-complaints">
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Email Notification Modal */}
      {isModalOpen && selectedComplaint && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Send Status Update Notification</h2>
            <p>
              To: {selectedComplaint.studentName} ({selectedComplaint.studentEmail})
            </p>
            <p>
              Status: {getStatusBadge(selectedComplaint.status)}
            </p>
            <textarea
              className="email-message-input"
              placeholder="Enter your message to the student..."
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
              rows="5"
            />
            <div className="modal-actions">
              <button
                className="btn-send"
                onClick={handleSendEmail}
                disabled={!emailMessage}
              >
                Send Email
              </button>
              <button
                className="btn-cancel"
                onClick={() => {
                  setIsModalOpen(false);
                  setEmailMessage("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplaintsTable;