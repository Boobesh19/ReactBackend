const express = require("express");
const Shipment = require("./model");

const router = express.Router();

// ➤ CREATE a new shipment
router.post("/shipments", async (req, res) => {
  try {
    const newShipment = new Shipment(req.body);
    await newShipment.save();
    res.status(201).json(newShipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ➤ READ all shipments
router.get("/shipments", async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ READ a single shipment by ID
router.get("/shipments/:id", async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ error: "Shipment not found" });
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ UPDATE a shipment
router.put("/shipments/:id", async (req, res) => {
  try {
    const updatedShipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedShipment) return res.status(404).json({ error: "Shipment not found" });
    res.json(updatedShipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ➤ DELETE a shipment
router.delete("/shipments/:id", async (req, res) => {
  try {
    const deletedShipment = await Shipment.findByIdAndDelete(req.params.id);
    if (!deletedShipment) return res.status(404).json({ error: "Shipment not found" });
    res.json({ message: "Shipment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
