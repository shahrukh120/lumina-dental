import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

async function listModels() {
  const key = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      console.error("Error from Google:", data.error.message);
      return;
    }

    console.log("--- Available Models for your API Key ---");
    data.models.forEach(m => {
      // Only show models that support generating content
      if (m.supportedGenerationMethods.includes("generateContent")) {
        console.log(`Model ID: ${m.name.split('/').pop()}`); 
      }
    });
  } catch (err) {
    console.error("Connection Error:", err);
  }
}

listModels();