const express = require("express");
const Vehicle = require("../models/vehicleModel");
const mongoose = require("mongoose");
const router = express.Router(); 
router.get("/featured", async (req, res) => {
  try {
    const vehicles = await Vehicle.find(); 
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching featured vehicles:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { search, type, fuelType, minPrice, maxPrice } = req.query;

    
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" }; 
    }
    if (type) {
      query.type = type; 
    }
    if (fuelType) {
      query.fuelType = fuelType; 
    }
    if (minPrice) {
      query.price = { $gte: minPrice }; 
    }
    if (maxPrice) {
      query.price = query.price || {}; 
      query.price.$lte = maxPrice; 
    }

   
    const vehicles = await Vehicle.find(query);
    res.json(vehicles);
  } catch (err) {
    console.error("Error fetching vehicles:", err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Received ID:", id); 

  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid vehicle ID" });
  }

  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      console.log("Vehicle not found for ID:", id); 
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router; 
