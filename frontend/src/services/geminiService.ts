import API_BASE_URL from '../config';

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

// --- 1. FILL IN YOUR REAL DETAILS HERE ---
const CLINIC_DETAILS = `
CLINIC INFO:
- Doctor: Dr. Md S T Khan (Expert in Dental Procedures, Maxillofacial Surgery, Radiology)
- Clinic Name: Dental & Maxillofacial Clinic
- Location: Apoorva Hospital And Research Centre Pvt Ltd in Bansdih Road Area Ballia, Uttar Pradesh
- Phone: +91 87917 85177 
- Email: mdsulemanarchie@gmail.com
- Timings: Mon - Sat: 10:00 AM - 5:00 PM , Sunday: Only Emergency

KEY SERVICES:
- Dental Implants
- Root Canal Treatment
- Orthodontics (Braces/Aligners)
- Maxillofacial Surgery
- Cosmetic Dentistry (Veneers, Whitening)
- Radiology & Diagnostics
- TOOTH EXTRACTION
`;

export const sendMessageToGemini = async (prompt: string, history: any[]) => {
  try {
    const payload = {
      // System instructions now include the specific details above
      system_instruction: {
        parts: [{ 
          text: `You are a helpful, professional virtual assistant for Dr. Md S T Khan's clinic. 
          
          Here are the specific details you MUST use when answering questions:
          ${CLINIC_DETAILS}
          
          Guidelines:
          1. If asked for contact info, provide the exact phone number and address listed above.
          2. Keep answers concise and friendly.
          3. Always encourage booking a consultation for specific medical advice.
          4. Do not invent placeholder numbers.` 
        }]
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