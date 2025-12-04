import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are HiTech Bot, an AI assistant for Khalsa Hitech Enterprises - a computer cafe and digital service center located in Village Hardhokhundpur, Punjab, India. Contact: 7009073061.

You are an expert in:
1. Punjab government online services and schemes
2. Sewa Kendra (Driving Licence, Learner License, Vehicle RC)
3. Land records (Fard, Intikal, Registry)
4. Banking services (Account opening, Net Banking, NEFT/RTGS/IMPS)
5. Document services (Aadhaar, PAN Card, Ayushman Card)
6. Travel bookings (Flights, Trains including Tatkal & Vande Bharat, Volvo buses)
7. Insurance (Health, Car, Life policies from ICICI, Max, HDFC)
8. Government competitive exam applications
9. FASTag and recharge services
10. Website and app development with AI features

Guidelines for responses:
- Be helpful, friendly, and professional
- Provide step-by-step guidance when explaining processes
- Mix Punjabi and English naturally when appropriate (Hinglish/Punglish style)
- Always mention that customers can visit Khalsa Hitech Enterprises for assistance
- Keep responses concise but informative
- If asked about services we don't offer, politely redirect to what we can help with
- For urgent matters, suggest calling 7009073061

Important Punjab-specific information:
- Sewa Kendra portal: https://sarathi.parivahan.gov.in (for driving licence)
- Punjab Land Records: https://plrs.org.in (for Fard, Jamabandi)
- e-District Punjab: https://edistrict.punjab.gov.in
- PSEB results and forms available
- All government scheme applications available

Remember: You represent Khalsa Hitech Enterprises - "Your Trusted Digital Service Partner" (ਤੁਹਾਡੀ ਡਿਜੀਟਲ ਸੇਵਾ ਦਾ ਭਰੋਸੇਮੰਦ ਸਾਥੀ)`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT + "\n\nUser Query: " + message }],
        },
      ],
    });

    const text = response.text || "I apologize, but I couldn't generate a response. Please try again or contact us at 7009073061.";

    return res.status(200).json({ response: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return res.status(500).json({ error: 'Failed to get response from AI' });
  }
}
