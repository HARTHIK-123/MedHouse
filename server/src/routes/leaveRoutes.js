const express = require("express");
const router = express.Router();
const {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequestStatus,
  deleteLeaveRequest,
} = require("../controllers/leaveController");

// Create a new leave request
router.post("/", createLeaveRequest);

// Get all leave requests
router.get("/", getAllLeaveRequests);

// Get a single leave request by ID
router.get("/:id", getLeaveRequestById);

// Update only the status of a leave request
router.patch("/:id/status", updateLeaveRequestStatus);

// Delete a leave request
router.delete("/:id", deleteLeaveRequest);

module.exports = router;
