const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

// Take Attendance (Single)
router.post("/take", attendanceController.takeAttendance);

// Bulk Attendance (Multiple Students)
router.post("/take/bulk", attendanceController.takeBulkAttendance);

// View Attendance (For a Student)
router.get("/student", attendanceController.viewStudentAttendance);

// Update Attendance
router.put("/update/:id", attendanceController.updateAttendance);

// Get Attendance by Date (Admin/Teacher)
router.get("/date", attendanceController.getAttendanceByDate);

module.exports = router;