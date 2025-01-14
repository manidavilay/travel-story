require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth.route");
const travelStoryRoutes = require("./routes/travelStory.route");
const imageRoutes = require("./routes/image.route");

const app = express();
const port = process.env.PORT || 8000;
const DBStringConnection = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// Auth API Routes
app.use("/api/auth", authRoutes);

// Travel Story Routes
app.use("/api/travel-story", travelStoryRoutes);

// Images Upload Routes
app.use("/api/images", imageRoutes);

// Server Static Files From Uploads And Assets Directories
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", async (req, res) => {
  res.send("This is from node");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

mongoose
  .connect(DBStringConnection)
  .then(() => console.log("Successfully connected to database"))
  .catch(() => console.log("Failed to connect"));

module.exports = app;
