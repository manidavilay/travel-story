const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  addTravelStory,
  getAllStories,
  editTravelStory,
} = require("../controllers/travelStory.controller");

// Add Travel Story Route
router.post("/add", authenticateToken, addTravelStory);

// Get All Travel Stories Route
router.get("/get-all", authenticateToken, getAllStories);

// Edit Travel Story By Id Route
router.put("/edit/:id", authenticateToken, editTravelStory);

module.exports = router;
