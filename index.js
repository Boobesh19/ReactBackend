const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const shipmentRoutes = require("./routes");
const connectDB = require("./config");

// Load environment variables from .env file
dotenv.config();

// Create express app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for your frontend (React at port 5173)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Middleware to parse JSON requests
app.use(express.json());

// API Routes
app.use("/api", shipmentRoutes);

// MongoDB Connection & Server Start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server is running at Port :${PORT}`);
  });
}).catch((err) => {
  console.error(" Failed to connect to MongoDB", err);
});
