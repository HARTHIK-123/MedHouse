const express = require("express");
const router = express.Router();
const { 
  createRoomInquiry, 
  getAllRoomInquiries, 
  getRoomInquiryById, 
  updateRoomInquiry, 
  deleteRoomInquiry 
} = require("../controllers/roomInquiryController");


// Create a new room inquiry
router.post("/", createRoomInquiry);

// Get all room inquiries
router.get("/", getAllRoomInquiries);

// Get a single room inquiry by ID
router.get("/:id", getRoomInquiryById);

// Update an entire room inquiry by ID
router.patch("/:id/status", updateRoomInquiry);

// Delete a room inquiry by ID
router.delete("/:id", deleteRoomInquiry);


module.exports = router;
