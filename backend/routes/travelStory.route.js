const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  addTravelStory,
  getAllStories,
  editTravelStory,
  deleteTravelStory,
} = require("../controllers/travelStory.controller");

// Add Travel Story Route
router.post("/add", authenticateToken, addTravelStory);

// Get All Travel Stories Route
router.get("/get-all", authenticateToken, getAllStories);

// Edit Travel Story By Id Route
router.put("/edit/:id", authenticateToken, editTravelStory);

// Delete Travel Story By Id Route
router.delete("/delete/:id", authenticateToken, deleteTravelStory);

module.exports = router;
