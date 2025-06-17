const Accommodation = require("../models/accommodationModel");

// Create a new accommodation
const createAccommodation = async (req, res) => {
    try {
        const newAccommodation = await Accommodation.create(req.body);
        return res.status(201).json({
            status: "success",
            message: "Accommodation request created successfully",
            request: newAccommodation,
        });
    } catch (error) {
        console.error("Create Accommodation Error:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// Get all accommodations
const getAllAccommodations = async (req, res) => {
    try {
        const accommodations = await Accommodation.find({});
        if (accommodations.length === 0) {
            return res.status(404).json({ status: "error", message: "No accommodation requests found" });
        }
        return res.status(200).json({
            status: "success",
            message: "Accommodation requests retrieved successfully",
            requests: accommodations,
        });
    } catch (error) {
        console.error("Get All Accommodations Error:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// Get a single accommodation request by ID
const getAccommodationById = async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);
        if (!accommodation) {
            return res.status(404).json({ status: "error", message: "Accommodation request not found" });
        }
        return res.status(200).json({
            status: "success",
            message: "Accommodation request retrieved successfully",
            request: accommodation,
        });
    } catch (error) {
        console.error("Get Accommodation By ID Error:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// Update accommodation request details
const updateAccommodation = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedAccommodation) {
            return res.status(404).json({ status: "error", message: "Accommodation request not found" });
        }

        return res.status(200).json({
            status: "success",
            message: "Accommodation request updated successfully",
            request: updatedAccommodation,
        });
    } catch (error) {
        console.error("Update Accommodation Error:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// Delete an accommodation request
const deleteAccommodation = async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);

        if (!accommodation) {
            return res.status(404).json({ status: "error", message: "Accommodation request not found" });
        }

        await accommodation.deleteOne();
        return res.status(200).json({ status: "success", message: "Accommodation request deleted successfully" });
    } catch (error) {
        console.error("Delete Accommodation Error:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// Export the controller functions
module.exports = {
    createAccommodation,
    getAllAccommodations,
    getAccommodationById,
    updateAccommodation,
    deleteAccommodation,
};
