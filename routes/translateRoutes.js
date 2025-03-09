const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY; // Make sure this is set in your .env

// Translation API Route
router.post("/translate", async (req, res) => {
  const { text, targetLang } = req.body;
  if (!text || !targetLang) {
    return res.status(400).json({ message: "Text and target language are required" });
  }

  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATE_API_KEY}`,
      { q: text, target: targetLang }
    );
    res.json({ translatedText: response.data.data.translations[0].translatedText });
  } catch (error) {
    console.error("Translation Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Translation failed." });
  }
});

module.exports = router;
