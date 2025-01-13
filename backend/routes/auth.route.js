const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Register user route
router.post("/create-account", registerUser);

// Login user route
router.post("/login", loginUser);

// Get user route
router.get("/get-user", authenticateToken, getUser);

module.exports = router;
