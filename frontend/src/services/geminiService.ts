type ChatMessage = {
  role: "user" | "model";
  text: string;
};
import API_BASE_URL from '../config';


// frontend/src/services/geminiService.ts
// geminiService.ts
// frontend/src/services/geminiService.ts
export const sendMessageToGemini = async (prompt: string, history: any[]) => {
  try {
    const payload = {
      // System instructions tell the AI how to behave
      system_instruction: {
        parts: [{ text: "You are a helpful virtual assistant for Dental & maxillofacial clinic, managed by Dr. Md S T Khan. Provide professional, friendly dental advice and encourage users to book a consultation for specific medical concerns." }]
      },
      contents: history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }))
    };

    const response = await fetch(`${API_BASE_URL}/api/gemini`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error(data.error?.message || "Invalid response structure");
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};