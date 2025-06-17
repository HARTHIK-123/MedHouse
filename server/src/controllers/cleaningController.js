const Cleaning = require("../models/cleaningModel");

// Create a new cleaning request
const createCleaningRequest = async (req, res) => {
  try {
    const newCleaningRequest = await Cleaning.create(req.body);
    return res.status(201).json({
      status: "success",
      message: "Cleaning request created successfully",
      request: newCleaningRequest,
    });
  } catch (error) {
    console.error("Create Cleaning Request Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Get all cleaning requests
const getAllCleaningRequests = async (req, res) => {
  try {
    const cleaningRequests = await Cleaning.find({});
    if (cleaningRequests.length === 0) {
      return res.status(404).json({ status: "error", message: "No cleaning requests found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Cleaning requests retrieved successfully",
      requests: cleaningRequests,
    });
  } catch (error) {
    console.error("Get All Cleaning Requests Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Get a single cleaning request by ID
const getCleaningRequestById = async (req, res) => {
  try {
    const cleaningRequest = await Cleaning.findById(req.params.id);
    if (!cleaningRequest) {
      return res.status(404).json({ status: "error", message: "Cleaning request not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Cleaning request retrieved successfully",
      request: cleaningRequest,
    });
  } catch (error) {
    console.error("Get Cleaning Request By ID Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Update cleaning request status
const updateCleaningRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const cleaningRequest = await Cleaning.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!cleaningRequest) {
      return res.status(404).json({ status: "error", message: "Cleaning request not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Cleaning request status updated successfully",
      request: cleaningRequest,
    });
  } catch (error) {
    console.error("Update Cleaning Request Status Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Delete a cleaning request
const deleteCleaningRequest = async (req, res) => {
  try {
    const cleaningRequest = await Cleaning.findById(req.params.id);

    if (!cleaningRequest) {
      return res.status(404).json({ status: "error", message: "Cleaning request not found" });
    }

    await cleaningRequest.deleteOne();
    return res.status(200).json({ status: "success", message: "Cleaning request deleted successfully" });
  } catch (error) {
    console.error("Delete Cleaning Request Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Export the controller functions
module.exports = {
  createCleaningRequest,
  getAllCleaningRequests,
  getCleaningRequestById,
  updateCleaningRequestStatus,
  deleteCleaningRequest,
};
