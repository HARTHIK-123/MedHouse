const express = require("express");
const router = express.Router();
const {
    createAccommodation,
    getAllAccommodations,
    getAccommodationById,
    updateAccommodation,
    deleteAccommodation,
} = require("../controllers/accommodationController");

// Create a new accommodation request
router.post("/", createAccommodation);

// Get all accommodation requests
router.get("/", getAllAccommodations);

// Get a single accommodation request by ID
router.get("/:id", getAccommodationById);

// Update an accommodation request by ID
router.put("/:id", updateAccommodation);

// Delete an accommodation request by ID
router.delete("/:id", deleteAccommodation);

module.exports = router;
