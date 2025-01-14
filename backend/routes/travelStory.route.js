const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authMiddleware");
const { addTravelStory } = require("../controllers/travelStory.controller");

// Add Travel Story Route
router.post("/add", authenticateToken, addTravelStory);

module.exports = router;
