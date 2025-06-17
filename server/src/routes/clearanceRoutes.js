const express = require("express");
const router = express.Router();
const {
  createClearanceRequest,
  getAllClearanceRequests,
  getClearanceRequestById,
  updateClearanceRequestStatus,
  deleteClearanceRequest,
} = require("../controllers/clearanceController");

// Create a new clearance request
router.post("/", createClearanceRequest);

// Get all clearance requests
router.get("/", getAllClearanceRequests);

// Get a single clearance request by ID
router.get("/:id", getClearanceRequestById);

// Update only the status of a clearance request by ID
router.patch("/:id/status", updateClearanceRequestStatus);

// Delete a clearance request by ID
router.delete("/:id", deleteClearanceRequest);

module.exports = router;
