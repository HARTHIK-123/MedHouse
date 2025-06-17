const express = require("express");
const router = express.Router();
const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
  searchComplaints,
} = require("../controllers/complaintController");

// Create a new complaint
router.post("/", createComplaint);

// Get all complaints with optional filtering and searching
router.get("/", (req, res, next) => {
  if (req.query.search) {
    return searchComplaints(req, res, next);
  }
  return getAllComplaints(req, res, next);
});

// Get a single complaint by ID
router.get("/:id", getComplaintById);

// Update complaint status
router.patch("/:id/status", updateComplaintStatus);

// Delete a complaint
router.delete("/:id", deleteComplaint);

module.exports = router;