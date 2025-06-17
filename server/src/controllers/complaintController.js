const Complaint = require("../models/complaintModel");

// Create a new complaint
const createComplaint = async (req, res) => {
  try {
    const requiredFields = [
      "studentName", "studentID", "studentEmail", 
      "year", "branch", "complaintText"
    ];
    
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields
      });
    }

    const complaint = new Complaint({
      ...req.body,
      status: "pending" // Default status
    });

    const savedComplaint = await complaint.save();
    
    res.status(201).json({
      success: true,
      data: savedComplaint
    });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get all complaints with optional status filter
const getAllComplaints = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    
    if (status && ["pending", "accepted", "rejected"].includes(status)) {
      query.status = status;
    }

    const complaints = await Complaint.find(query)
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Search complaints by student ID or name
const searchComplaints = async (req, res) => {
  try {
    const { search } = req.query;
    
    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search query parameter is required"
      });
    }

    const complaints = await Complaint.find({
      $or: [
        { studentID: { $regex: search, $options: "i" } },
        { studentName: { $regex: search, $options: "i" } }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    console.error("Error searching complaints:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Get complaint by ID
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    res.status(200).json({
      success: true,
      data: complaint
    });
  } catch (error) {
    console.error("Error fetching complaint:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Update complaint status
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "accepted", "rejected"];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedComplaint
    });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Delete complaint
const deleteComplaint = async (req, res) => {
  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);
    
    if (!deletedComplaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
  searchComplaints
};