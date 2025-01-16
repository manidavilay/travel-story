const fs = require("fs");
const path = require("path");

// Handle Upload Image API
const handleImageUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  try {
    const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;

    res.status(201).json({ imageUrl, message: "Image successfully uploaded" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again" });
  }
};

// Delete Image API
const deleteImage = async (req, res) => {
  const { imageUrl } = req.query;

  if (!imageUrl) {
    return res.status(400).json({ message: "imageUrl parameter is required" });
  }

  try {
    const filename = path.basename(imageUrl);
    const filePath = path.join(__dirname, "..", "uploads", filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).json({ message: "Image successfully deleted !" });
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again" });
  }
};

module.exports = { handleImageUpload, deleteImage };
