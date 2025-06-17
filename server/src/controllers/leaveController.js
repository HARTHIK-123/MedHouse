const Leave = require("../models/leave");

// Create Leave Request
const createLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await Leave.create(req.body);
    return res.status(201).json({
      status: "success",
      message: "Leave request created successfully",
      request: leaveRequest,
    });
  } catch (error) {
    console.error("Create Leave Request Error:", error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

// Get All Leave Requests
const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await Leave.find();
    if (leaveRequests.length === 0) {
      return res.status(404).json({ status: "error", message: "No leave requests found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Leave requests retrieved successfully",
      requests: leaveRequests,
    });
  } catch (error) {
    console.error("Get All Leave Requests Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Get a Single Leave Request by ID
const getLeaveRequestById = async (req, res) => {
  try {
    const leaveRequest = await Leave.findById(req.params.id);
    if (!leaveRequest) {
      return res.status(404).json({ status: "error", message: "Leave request not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Leave request retrieved successfully",
      request: leaveRequest,
    });
  } catch (error) {
    console.error("Get Leave Request By ID Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Update Leave Request Status
const updateLeaveRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leaveRequest = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!leaveRequest) {
      return res.status(404).json({ status: "error", message: "Leave request not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Leave request status updated successfully",
      request: leaveRequest,
    });
  } catch (error) {
    console.error("Update Leave Request Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Delete Leave Request
const deleteLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await Leave.findById(req.params.id);

    if (!leaveRequest) {
      return res.status(404).json({ status: "error", message: "Leave request not found" });
    }

    await leaveRequest.deleteOne();
    return res.status(200).json({ status: "success", message: "Leave request deleted successfully" });
  } catch (error) {
    console.error("Delete Leave Request Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequestStatus,
  deleteLeaveRequest,
};
