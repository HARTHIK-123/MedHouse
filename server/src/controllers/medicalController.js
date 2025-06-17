const Medical = require("../models/medicalModel");

// Create a new medical request
const createMedicalRequest = async (req, res) => {
  try {
    const {
      studentName,
      studentID,
      academicYear,
      roomID,
      age,
      serviceType,
      diseaseLevel,
      treatmentLevel,
      illness,
      otherMention,
      sickPeriod,
      makeAppointment,
      appointmentTime,
    } = req.body;

    const newMedicalRequest = new Medical({
      studentName,
      studentID,
      academicYear,
      roomID,
      age,
      serviceType,
      diseaseLevel,
      treatmentLevel,
      illness,
      otherMention,
      sickPeriod,
      makeAppointment,
      appointmentTime,
    });

    await newMedicalRequest.save();
    return res.status(201).json({
      status: "success",
      message: "Medical request created successfully",
      request: newMedicalRequest,
    });
  } catch (error) {
    console.error("Create Medical Request Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Get all medical requests
const getAllMedicalRequests = async (req, res) => {
  try {
    const medicalRequests = await Medical.find({});
    if (medicalRequests.length === 0) {
      return res.status(404).json({ status: "error", message: "No medical requests found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Medical requests retrieved successfully",
      requests: medicalRequests,
    });
  } catch (error) {
    console.error("Get All Medical Requests Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Update medical request status
const updateMedicalRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const medicalRequest = await Medical.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!medicalRequest) {
      return res.status(404).json({ status: "error", message: "Medical request not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Medical request status updated successfully",
      request: medicalRequest,
    });
  } catch (error) {
    console.error("Update Medical Request Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Get a single medical request by ID
const getMedicalRequestById = async (req, res) => {
  try {
    const medicalRequest = await Medical.findById(req.params.id);
    if (!medicalRequest) {
      return res.status(404).json({ status: "error", message: "Medical request not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Medical request retrieved successfully",
      request: medicalRequest,
    });
  } catch (error) {
    console.error("Get Medical Request By ID Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Delete a medical request
const deleteMedicalRequest = async (req, res) => {
  try {
    const medicalRequest = await Medical.findById(req.params.id);

    if (!medicalRequest) {
      return res.status(404).json({ status: "error", message: "Medical request not found" });
    }

    await medicalRequest.deleteOne();
    return res.status(200).json({ status: "success", message: "Medical request deleted successfully" });
  } catch (error) {
    console.error("Delete Medical Request Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// Export controller functions
module.exports = {
  createMedicalRequest,
  getAllMedicalRequests,
  getMedicalRequestById,
  updateMedicalRequestStatus,
  deleteMedicalRequest,
};
