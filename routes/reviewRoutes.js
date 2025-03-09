const express = require("express");
const Review = require("../models/reviewModel");

const router = express.Router();

router.post("/:vehicleId", async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { vehicleId } = req.params;

    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment are required" });
    }

    const newReview = new Review({ vehicleId, rating, comment });
    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:vehicleId", async (req, res) => {
  try {
    const reviews = await Review.find({ vehicleId: req.params.vehicleId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
