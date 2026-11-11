const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db"); // Database connection එක මෙතැනින් සම්බන්ධ වේ

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware setup
app.use(cors()); // Allow cross-origin requests from React frontend
app.use(express.json()); // Parse JSON data in request bodies

// Basic test route to check if the API is running
app.get("/", (req, res) => {
  res.send("GizmoHub Backend API is running successfully!");
});

// Define the port from environment variables or use 5000 as default
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});