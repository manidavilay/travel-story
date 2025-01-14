const TravelStory = require("../models/travelStory.model");

// Add Travel Story API
const addTravelStory = async (req, res) => {
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
  const { userId } = req.user;
  try {
    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const parsedVisitedDate = new Date(parseInt(visitedDate));

    const newTravelStory = new TravelStory({
      userId,
      title,
      story,
      visitedLocation,
      imageUrl,
      visitedDate: parsedVisitedDate,
    });
    await newTravelStory.save();

    return res
      .status(201)
      .json({ message: "Travel story successfully created !" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again" });
  }
};

// Get All Travel Stories API
const getAllStories = async (req, res) => {
  const { userId } = req.user;
  try {
    const travelStories = await TravelStory.find({ userId: userId }).sort({
      isFavorite: -1,
    });
    res.status(200).json({ stories: travelStories });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again" });
  }
};

module.exports = { addTravelStory, getAllStories };
