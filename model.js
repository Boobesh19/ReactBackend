const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  receiverName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  packageDetails: { type: String, required: true },
  trackingNumber: { type: String, required: true, unique: true }, // ✅ Add this
}, { timestamps: true });

module.exports = mongoose.model("Shipment", shipmentSchema);
