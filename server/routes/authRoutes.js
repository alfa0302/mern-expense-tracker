const express = require("express");
const router = express.Router();
const { protect } = require("../utils/protect");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, getUser);

module.exports = router;
