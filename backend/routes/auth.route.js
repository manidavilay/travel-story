const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Register User Route
router.post("/register", registerUser);

// Login User Route
router.post("/login", loginUser);

// Get User Route
router.get("/get-user", authenticateToken, getUser);

module.exports = router;
