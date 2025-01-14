const express = require("express");
const upload = require("../multer");
const router = express.Router();
const {
  handleImageUpload,
  deleteImage,
} = require("../controllers/image.controller");

// Handle Image Upload Route
router.post("/upload", upload.single("image"), handleImageUpload);

// Delete Image Route
router.delete("/delete", deleteImage);

module.exports = router;
