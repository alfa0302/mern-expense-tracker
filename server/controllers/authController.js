const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const hashPassword = async (password) => {
  const salt = bcrypt.genSalt(saltRounds);
  return await bcrypt.hashSync(password, salt);
};
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
const registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newPassword = await hashPassword(password);
    const user = await User.create({
      fullName,
      email,
      password: newPassword,
      profileImageUrl,
    });
    res.status(201).json({
      id: user._id,
      fullName,
      email,
      profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ mesage: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
