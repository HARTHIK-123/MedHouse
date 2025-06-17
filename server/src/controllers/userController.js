const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const { name, email, gender, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "error", message: "Email already registered" });
    }

    const user = new User({ name, email, gender, password });
    await user.save();

    return res.status(201).json({ status: "success", message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: "error", message: "User not found" });
    }

    // Check password (Assuming passwords are stored in plain text, which should be hashed instead)
    if (user.password !== password) {
      return res.status(401).json({ status: "error", message: "Invalid password" });
    }

    return res.status(200).json({ status: "success", message: "Login successful", user });
  } catch (error) {
    console.error("Signin Error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ status: "error", message: "No users found" });
    }

    return res.status(200).json({ status: "success", message: "Users retrieved successfully", users });
  } catch (error) {
    console.error("Get Users Error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};