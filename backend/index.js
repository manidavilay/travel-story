require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const travelStoryRoutes = require("./routes/travelStory.route");

const app = express();
const port = process.env.PORT || 8000;
const DBStringConnection = process.env.MONGODB_URI;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/travel-story", travelStoryRoutes);

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
