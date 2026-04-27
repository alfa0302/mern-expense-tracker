const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("CONNECTED TO MONGODB");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
