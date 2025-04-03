require("dotenv").config(); // Load environment variables first
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// Check if MONGO_URI is set
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

// Define Schema & Model
const fsdSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const FsdModel = mongoose.model("fsd", fsdSchema, "fsd"); // <-- Explicitly set collection name

// Get All Documents from "fsd"
app.get("/fsd", async (req, res) => {
  try {
    const data = await FsdModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connect to MongoDB and Start Server
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Connection Failed", err);
    process.exit(1); // Exit if DB connection fails
  });
