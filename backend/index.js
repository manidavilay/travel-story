require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("This is from node");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

module.exports = app;
