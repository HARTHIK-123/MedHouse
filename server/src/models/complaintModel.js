const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    studentID: {
      type: String,
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      enum: ["1st", "2nd", "3rd", "4th"],
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    complaintText: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaints", complaintSchema);