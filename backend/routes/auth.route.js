const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/auth.controller");

// Register user route
router.post("/create-account", registerUser);

module.exports = router;
