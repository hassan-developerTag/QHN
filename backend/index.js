const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const routes = require("./routes");

// Load environment variables
dotenv.config();

// Import configurations
const appConfig = require("./config/app.config");
const connectDB = require("./config/db.config");

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Static file handling
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/v1", routes);

// Serve frontend static files in production
if (appConfig.app.env === "production") {
  app.use(express.static(path.join(__dirname, "dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
}

// Start the server
const port = appConfig.app.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
