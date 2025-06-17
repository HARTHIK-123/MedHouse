const express = require("express");
const router = express.Router();
const {
  createCleaningRequest,
  getAllCleaningRequests,
  getCleaningRequestById,
  updateCleaningRequestStatus,
  deleteCleaningRequest,
} = require("../controllers/cleaningController");

// Create a new cleaning request
router.post("/", createCleaningRequest);

// Get all cleaning requests
router.get("/", getAllCleaningRequests);

// Get a single cleaning request by ID
router.get("/:id", getCleaningRequestById);

// Update only the status of a cleaning request by ID
router.patch("/:id/status", updateCleaningRequestStatus);

// Delete a cleaning request by ID
router.delete("/:id", deleteCleaningRequest);

module.exports = router;
