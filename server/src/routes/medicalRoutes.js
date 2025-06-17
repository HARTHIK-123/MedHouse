const express = require("express");
const router = express.Router();
const {
  createMedicalRequest,
  getAllMedicalRequests,
  getMedicalRequestById,
  updateMedicalRequestStatus,
  deleteMedicalRequest,
} = require("../controllers/medicalController");

// Create a new medical request
router.post("/", createMedicalRequest);

// Get all medical requests
router.get("/", getAllMedicalRequests);

// Get a single medical request by ID
router.get("/:id", getMedicalRequestById);

// Update only the status of a medical request
router.patch("/:id/status", updateMedicalRequestStatus);

// Delete a medical request
router.delete("/:id", deleteMedicalRequest);

module.exports = router;
