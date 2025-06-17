const Admin = require("../models/adminModel");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ status: "error", message: "Email already registered" });
    }

    const admin = new Admin({ name, email, password });
    await admin.save();

    return res.status(201).json({ status: "success", message: "Admin registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ status: "error", message: "Admin not found" });
    }

    // Check password (Assuming passwords are stored in plain text, which should be hashed instead)
    if (admin.password !== password) {
      return res.status(401).json({ status: "error", message: "Invalid password" });
    }

    return res.status(200).json({ status: "success", message: "Login successful" });
  } catch (error) {
    console.error("Signin Error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
