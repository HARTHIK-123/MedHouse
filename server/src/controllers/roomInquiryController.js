const RoomInquiry = require("../models/RoomInquiry");

const createRoomInquiry = async (req, res) => {
  try {
    const {
      studentId,
      roomId,
      inquireType,
      inquiriesCategory,
      contactNumber,
      reason,
    } = req.body;

    const newRoomInquiry = new RoomInquiry({
      studentId,
      roomId,
      inquireType,
      inquiriesCategory,
      contactNumber,
      reason,
    });

    await newRoomInquiry.save();
    return res.status(201).json({
      status: "success",
      message: "Room inquiry created successfully",
      inquiry: newRoomInquiry,
    });
  } catch (error) {
    console.error("Create Inquiry Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const getAllRoomInquiries = async (req, res) => {
  try {
    const inquiries = await RoomInquiry.find({});
    if (inquiries.length === 0) {
      return res.status(404).json({ status: "error", message: "No room inquiries found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Room inquiries retrieved successfully",
      inquiries,
    });
  } catch (error) {
    console.error("Get All Inquiries Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const getRoomInquiryById = async (req, res) => {
  try {
    const inquiry = await RoomInquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ status: "error", message: "Inquiry not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Inquiry retrieved successfully",
      inquiry,
    });
  } catch (error) {
    console.error("Get Inquiry By ID Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const updateRoomInquiry = async (req, res) => {
  try {
    const { status } = req.body; // Assuming you send the new status in the request body

    const inquiry = await RoomInquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // To return the updated inquiry after the update
    );

    if (!inquiry) {
      return res.status(404).json({ status: "error", message: "Inquiry not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Inquiry status updated successfully",
      inquiry,
    });
  } catch (error) {
    console.error("Update Inquiry Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const deleteRoomInquiry = async (req, res) => {
  try {
    const inquiry = await RoomInquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ status: "error", message: "Inquiry not found" });
    }

    await inquiry.deleteOne();
    return res.status(200).json({
      status: "success",
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete Inquiry Error:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = {
  createRoomInquiry,
  getAllRoomInquiries,
  getRoomInquiryById,
  updateRoomInquiry,
  deleteRoomInquiry,
};
