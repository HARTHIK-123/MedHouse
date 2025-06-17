const MentoringRequest = require("../models/mentoringModel");

const createMentoringRequest = async (req, res) => {
  try {
    const {
      studentID,
      academicYear,
      roomID,
      requestTime,
      mentoringType,
      reason,
    } = req.body;

    const newMentoringRequest = new MentoringRequest({
      studentID,
      academicYear,
      roomID,
      requestTime,
      mentoringType,
      reason,
    });

    await newMentoringRequest.save();
    return res.status(201).json({
      status: "success",
      message: "Mentoring request created successfully",
      request: newMentoringRequest,
    });
  } catch (error) {
    console.error("Create Mentoring Request Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const getAllMentoringRequests = async (req, res) => {
  try {
    const mentoringRequests = await MentoringRequest.find({});
    if (mentoringRequests.length === 0) {
      return res.status(404).json({ status: "error", message: "No mentoring requests found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Mentoring requests retrieved successfully",
      requests: mentoringRequests,
    });
  } catch (error) {
    console.error("Get All Mentoring Requests Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const updateMentoringRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const mentoringRequest = await MentoringRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!mentoringRequest) {
      return res.status(404).json({ status: "error", message: "Mentoring request not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Mentoring request status updated successfully",
      request: mentoringRequest,
    });
  } catch (error) {
    console.error("Update Mentoring Request Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = {
  createMentoringRequest,
  getAllMentoringRequests,
  updateMentoringRequestStatus,
};
