const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");

// Register user route
router.post("/create-account", registerUser);

// Login user route
router.post("/login", loginUser);

module.exports = router;
