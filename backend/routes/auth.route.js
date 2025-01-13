const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/auth.controller");

// Register User Route
router.post("/create-account", registerUser);

// Login User Route
router.post("/login", loginUser);

// Get User Route
router.get("/get-user", authenticateToken, getUser);

module.exports = router;
