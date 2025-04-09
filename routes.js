const express = require("express");
const router = express.Router();
const Shipment = require("./model");

// Get all shipments
router.get("/shipments", async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new shipment (✅ Updated with trackingNumber generation)
router.post("/shipments", async (req, res) => {
  try {
    // console.log("📦 Incoming POST data:", req.body);

    // ✅ Auto-generate a unique tracking number
    const trackingNumber = `TRK${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Create a new shipment object with trackingNumber
    const shipment = new Shipment({
      ...req.body,
      trackingNumber,
    });

    await shipment.save();
    res.status(201).json(shipment);
  } catch (err) {
    console.error("❌ Error saving shipment:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Update shipment
router.put("/shipments/:id", async (req, res) => {
  try {
    const updated = await Shipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete shipment
router.delete("/shipments/:id", async (req, res) => {
  try {
    await Shipment.findByIdAndDelete(req.params.id);
    res.json({ message: "Shipment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
