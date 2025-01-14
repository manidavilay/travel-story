const express = require("express");
const upload = require("../multer");
const router = express.Router();
const { handleImageUpload } = require("../controllers/image.controller");

// Handle Image Upload Route
router.post("/upload", upload.single("image"), handleImageUpload);

module.exports = router;
