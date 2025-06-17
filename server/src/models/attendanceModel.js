const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId, 
    ref: "Student",
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    enum: ["Present", "Absent", "Late", "Half-Day", "Excused"],
    default: "Present",
  },
}, { timestamps: true });


const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;