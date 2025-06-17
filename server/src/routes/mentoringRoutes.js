const express = require("express");
const router = express.Router();
const {
  createMentoringRequest,
  getAllMentoringRequests,
  updateMentoringRequestStatus,
} = require("../controllers/mentoringController");

// Create a new mentoring request
router.post("/", createMentoringRequest);

// Get all mentoring requests
router.get("/", getAllMentoringRequests);

// Update only the status of a mentoring request
router.patch("/:id/status", updateMentoringRequestStatus);

module.exports = router;
