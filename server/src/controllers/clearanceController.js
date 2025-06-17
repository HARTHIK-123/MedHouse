const Clearance = require("../models/clearanceModel");

// Create a new clearance request
const createClearanceRequest = async (req, res) => {
  try {
    const newClearanceRequest = await Clearance.create(req.body);
    return res.status(201).json({
      status: "success",
      message: "Clearance request created successfully",
      request: newClearanceRequest,
    });
  } catch (error) {
    console.error("Create Clearance Request Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Get all clearance requests
const getAllClearanceRequests = async (req, res) => {
  try {
    const clearanceRequests = await Clearance.find({});
    if (clearanceRequests.length === 0) {
      return res.status(404).json({ status: "error", message: "No clearance requests found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Clearance requests retrieved successfully",
      requests: clearanceRequests,
    });
  } catch (error) {
    console.error("Get All Clearance Requests Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Get a single clearance request by ID
const getClearanceRequestById = async (req, res) => {
  try {
    const clearanceRequest = await Clearance.findById(req.params.id);
    if (!clearanceRequest) {
      return res.status(404).json({ status: "error", message: "Clearance request not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Clearance request retrieved successfully",
      request: clearanceRequest,
    });
  } catch (error) {
    console.error("Get Clearance Request By ID Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Update clearance request status
const updateClearanceRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const clearanceRequest = await Clearance.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!clearanceRequest) {
      return res.status(404).json({ status: "error", message: "Clearance request not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Clearance request status updated successfully",
      request: clearanceRequest,
    });
  } catch (error) {
    console.error("Update Clearance Request Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Delete a clearance request
const deleteClearanceRequest = async (req, res) => {
  try {
    const clearanceRequest = await Clearance.findById(req.params.id);

    if (!clearanceRequest) {
      return res.status(404).json({ status: "error", message: "Clearance request not found" });
    }

    await clearanceRequest.deleteOne();
    return res.status(200).json({ status: "success", message: "Clearance request deleted successfully" });
  } catch (error) {
    console.error("Delete Clearance Request Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Export controller functions
module.exports = {
  createClearanceRequest,
  getAllClearanceRequests,
  getClearanceRequestById,
  updateClearanceRequestStatus,
  deleteClearanceRequest,
};
