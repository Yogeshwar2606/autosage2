import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";

function GeminiChat() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleChat = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", { query });
      let reply = res.data.reply;

      if (language !== "en") {
        reply = await translateText(reply, language);
      }

      setResponse(reply);
      speak(reply);
    } catch (error) {
      setResponse("❌ Error: Unable to fetch response.");
    }

    setLoading(false);
  };

  const translateText = async (text, targetLang) => {
    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
      );
      const data = await res.json();
      return data[0][0][0]; 
    } catch (error) {
      console.error("Translation error:", error);
      return text; 
    }
  };

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = language === "hi" ? "hi-IN" : language === "te" ? "te-IN" : "en-US";
      speech.voice = voices.find((v) => v.lang.includes(speech.lang)) || null;
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <Container className="mt-4 d-flex flex-column align-items-center">
      <h2 className="mb-4">🚗 AutoSage Chatbot</h2>

      <Form.Select className="mb-3 w-50" value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="te">Telugu</option>
      </Form.Select>

      <Card className="p-4 shadow-lg w-75">
        <Form.Control
          type="text"
          placeholder="Ask about vehicles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-3"
        />
        <Button onClick={handleChat} disabled={loading} variant="primary">
          {loading ? <Spinner animation="border" size="sm" /> : "Ask"}
        </Button>
      </Card>

      {response && (
        <Card className="mt-3 p-3 w-75">
          <strong>🔹 Chatbot:</strong> {response}
          <Button variant="secondary" className="mt-2" onClick={() => speak(response)}>
            🔊 Listen
          </Button>
        </Card>
      )}
    </Container>
  );
}

export default GeminiChat;
