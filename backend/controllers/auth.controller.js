const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Register User API
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "72h" }
    );
    return res.status(201).json({
      fullName: newUser.fullName,
      email: newUser.email,
      accessToken,
      message: "User successfully registered !",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again" });
  }
};

// Login User API
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = jwt.sign(
      { userId: existingUser._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: "Login successful !",
      user: { fullName: existingUser.fullName, email: existingUser.email },
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again" });
  }
};

// Get User API
const getUser = async (req, res) => {
  const { userId } = req.user;
  try {
    const existingUser = await User.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ user: existingUser, message: "User successfully found !" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again" });
  }
};

module.exports = { registerUser, loginUser, getUser };
