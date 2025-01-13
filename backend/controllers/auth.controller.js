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
      return res.status(400).json({ message: "User already exists !" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, fullName, password: hashedPassword });
    await newUser.save();
    const accessToken = jwt.sign(
      { user: newUser._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    return res.status(201).json({
      user: { fullName: newUser.fullName, email: newUser.email },
      accessToken,
      message: "Account successfully created !",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later" });
  }
};

module.exports = { registerUser };
