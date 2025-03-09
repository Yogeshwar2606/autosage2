const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post("/", async (req, res) => {
  const { query, language } = req.body;
  if (!query) return res.status(400).json({ message: "Query is required" });

  
  const languageMap = {
    en: "English",
    hi: "Hindi",
    te: "Telugu"
  };
  const selectedLanguage = languageMap[language] || "English";

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: `Respond in ${selectedLanguage}: ${query}` }] }],
        generationConfig: { maxOutputTokens: 50 } // 👈 Shorten response
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response available.";

    res.json({ reply });
  } catch (error) {
    console.error("AI API Error:", error);
    res.status(500).json({ message: "AI response failed." });
  }
});

module.exports = router;
