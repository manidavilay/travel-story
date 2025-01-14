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

// Edit Travel Story API
const editTravelStory = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
  try {
    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
      res.status(400).json({ message: "All fields are required" });
    }

    const existingTravelStory = await TravelStory.findOne({
      _id: id,
      userId: userId,
    });
    if (!existingTravelStory) {
      return res.status(404).json({ message: "Travel story not found" });
    }

    const parsedVisitedDate = new Date(parseInt(visitedDate));
    const placeholderImageUrl = `http://localhost:8000/assets/placeholder.png`;

    existingTravelStory.title = title;
    existingTravelStory.story = story;
    existingTravelStory.visitedLocation = visitedLocation;
    existingTravelStory.imageUrl = imageUrl || placeholderImageUrl;
    existingTravelStory.visitedDate = parsedVisitedDate;

    await existingTravelStory.save();
    return res
      .status(200)
      .json({ message: "Travel story successfully updated !" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again" });
  }
};

module.exports = { addTravelStory, getAllStories, editTravelStory };
