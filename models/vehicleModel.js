const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, enum: ["Car", "Bike","Scooter"], required: true },
  price: { type: Number, required: true },
  fuelType: { type: String, enum: ["Petrol", "Diesel", "Electric", "Hybrid"], required: true },
  mileage: { type: Number }, 
  engine: { type: String },
  transmission: { type: String, enum: ["Manual", "Automatic"] },
  features: [{ type: String }],
  imageUrl: { type: String },
  launchYear: { type: Number },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
