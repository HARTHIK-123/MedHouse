const Attendance = require("../models/attendanceModel");

// 1. Take Attendance (Single or Bulk)
exports.takeAttendance = async (req, res) => {
  try {
    const { studentId, studentName, date, status } = req.body;

    // Check if attendance already exists for the student on the given date
    const existingAttendance = await Attendance.findOne({ studentId, date });

    if (existingAttendance) {
      return res.status(400).json({ error: "Attendance already recorded for this student on the specified date." });
    }

    const newAttendance = new Attendance({
      studentId,
      studentName,
      date: date || new Date(), // Use provided date or default to today
      status,
    });

    await newAttendance.save();
    res.status(201).json({ message: "Attendance recorded successfully!", attendance: newAttendance });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// 2. Bulk Attendance (For multiple students at once)
exports.takeBulkAttendance = async (req, res) => {
  try {
    const { attendanceList } = req.body; // Array of { studentId, studentName, status }

    // Validate input
    if (!Array.isArray(attendanceList) || attendanceList.length === 0) {
      return res.status(400).json({ error: "Attendance list is required and must be a non-empty array." });
    }

    const date = req.body.date || new Date(); // Use provided date or default to today

    // Check for duplicates before saving
    const existingRecords = await Attendance.find({
      studentId: { $in: attendanceList.map(a => a.studentId) },
      date,
    });

    if (existingRecords.length > 0) {
      return res.status(400).json({ 
        error: "Some students already have attendance records for this date.",
        conflicts: existingRecords.map(r => r.studentId),
      });
    }

    const attendanceRecords = attendanceList.map(student => ({
      studentId: student.studentId,
      studentName: student.studentName,
      date,
      status: student.status,
    }));

    const savedRecords = await Attendance.insertMany(attendanceRecords);
    res.status(201).json({ message: "Bulk attendance recorded successfully!", records: savedRecords });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// 3. View Attendance (For a Student)
exports.viewStudentAttendance = async (req, res) => {
  try {
    const { studentId, startDate, endDate } = req.query;

    if (!studentId) {
      return res.status(400).json({ error: "Student ID is required." });
    }

    const query = { studentId };

    // Filter by date range (optional)
    if (startDate && endDate) {
      query.date = { 
        $gte: new Date(startDate), 
        $lte: new Date(endDate) 
      };
    }

    const attendance = await Attendance.find(query).sort({ date: -1 });

    if (!attendance.length) {
      return res.status(404).json({ message: "No attendance records found." });
    }

    res.status(200).json({ attendance });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// 4. Update Attendance (If a mistake was made)
exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params; // Attendance record ID
    const { status } = req.body;

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated record
    );

    if (!updatedAttendance) {
      return res.status(404).json({ error: "Attendance record not found." });
    }

    res.status(200).json({ message: "Attendance updated successfully!", attendance: updatedAttendance });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// 5. Get Attendance by Date (For Teachers/Admin)
exports.getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Date is required (YYYY-MM-DD)." });
    }

    const attendance = await Attendance.find({ date: new Date(date) });

    if (!attendance.length) {
      return res.status(404).json({ message: "No attendance records found for this date." });
    }

    res.status(200).json({ attendance });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};