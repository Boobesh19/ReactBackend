const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  recipientName: { type: String, required: true },
  trackingNumber: { type: String, required: true, unique: true },
  status: { type: String, enum: ["Pending", "In Transit", "Delivered"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Shipment", shipmentSchema);
