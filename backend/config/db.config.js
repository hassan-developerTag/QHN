const mongoose = require("mongoose");
const appConfig = require("../config/app.config");

// Get MongoDB URL from appConfig
const mongoUrl = appConfig.database.mongoUri;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;