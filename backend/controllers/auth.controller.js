const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const registerUser = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists !" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, fullName, password: hashedPassword });
    await newUser.save();

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    return res.status(201).json({
      user: { fullName: newUser.fullName, email: usnewUserer.email },
      accessToken,
      message: "Account successfully created !",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: existingUser._id },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      message: "Login successful !",
      user: { fullName: existingUser.fullName, email: existingUser.email },
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later" });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.user;
  try {
    const existingUser = await User.findOne({ _id: userId });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      user: existingUser,
      message: "User successfully found !",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later" });
  }
};

module.exports = { registerUser, loginUser, getUser };
