const fs = require("fs");
const path = require("path");

// Handle Upload Image API
const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;

    res.status(201).json({ imageUrl, message: "Image successfully uploaded" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again" });
  }
};

module.exports = { handleImageUpload };
