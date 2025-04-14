const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const shipmentRoutes = require("./routes");
const connectDB = require("./config");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS for frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Middleware
app.use(express.json());

// ✅ Root route for test
app.get("/", (req, res) => {
  res.send("✅ Backend is up and running!");
});

// ✅ Use routes correctly
app.use("/api", shipmentRoutes);

// MongoDB & Server start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at Port : ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to connect to MongoDB", err);
});