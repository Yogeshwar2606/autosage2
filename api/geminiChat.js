const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// ✅ Set up Gemini API URL and Key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Store API key in .env file

// 📌 Chatbot API Endpoint
router.post("/chatbot", async (req, res) => {
  const { message } = req.body; // Get user query from request body

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
    res.json({ reply: botReply });
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

module.exports = router;
