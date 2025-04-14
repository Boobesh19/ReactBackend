const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error(" MONGO_URI not found in .env file.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURI); // removed deprecated options
    console.log(` MongoDB connected: ${conn.connection.name} at ${conn.connection.host}`);
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;