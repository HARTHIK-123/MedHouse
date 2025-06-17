const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/connect");
const app = express();
const port = process.env.PORT || 8000;

// Routes
const roomInquiryRoutes = require("./routes/roomInquiryRoutes");
const accommodationRoutes = require("./routes/accommodationRoutes");
const cleaningRoutes = require("./routes/cleaningRoutes");
const medicalRoutes = require("./routes/medicalRoutes");
const clearanceRoutes = require("./routes/clearanceRoutes");
const mentoringRoutes = require("./routes/mentoringRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const complaintRoutes = require("./routes/complaintsRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/inquiries", roomInquiryRoutes);
app.use("/api/v1/accommodation", accommodationRoutes);
app.use("/api/v1/cleaning", cleaningRoutes);
app.use("/api/v1/medical", medicalRoutes);
app.use("/api/v1/clearance", clearanceRoutes);
app.use("/api/v1/mentoring", mentoringRoutes);
app.use("/api/v1/leave", leaveRoutes);
app.use("/api/v1/complaint", complaintRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use('/api/v1/attendance', attendanceRoutes);

app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);
