const express = require("express");
const router = express.Router();
const { signup, signin, getAllUsers } = require("../controllers/userController");

// User signup
router.post("/signup", signup);

// User signin
router.post("/signin", signin);

// Get all users
router.get("/getAllUsers", getAllUsers);

module.exports = router;
