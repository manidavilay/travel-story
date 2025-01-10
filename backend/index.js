require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

const port = process.env.PORT || 8000;
const DBStringConnection = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("This is from node");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

mongoose
  .connect(DBStringConnection)
  .then(() => console.log("Successfully connected to database !"))
  .catch(() => console.log("Failed to connect to database"));

module.exports = app;
