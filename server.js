const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const geminiChat = require("./api/geminiChat");
const chatbotRoute = require("./routes/chatbotRoute");
const translateRoutes = require("./routes/translateRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", geminiChat);
app.use("/api/chat", chatbotRoute);
app.use("/api/translate", translateRoutes);
app.use("/api/reviews", reviewRoutes);

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/autosage")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// Import Vehicle Routes
const vehicleRoutes = require("./routes/vehicleRoutes");
app.use("/api/vehicles", vehicleRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("AutoSage Backend Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
