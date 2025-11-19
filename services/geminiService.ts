
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

const RETREAT_CONTEXT = `
You are the Virtual Concierge for 'SR Retreat', a luxury farmhouse and homestay located in Muthur, Periyapatna, Mysuru.
Your tone is: Sophisticated, Zen, Warm, and Extremely Helpful. Keep responses concise (under 100 words) and elegant.

Property Details:
- Type: Farmhouse / Homestay set in a coffee and Areca nut farm.
- Year Built: 2025 (Brand new).
- Units: 
  1. 1 BHK House (1 Bedroom, Hall, Kitchen). Capacity: 4 pax.
  2. 2 Individual Rooms with attached bathrooms. Capacity: 2 pax each.
- Amenities: WiFi, Kitchen appliances (Kettle, etc.), TV, Garden, Fire camp place, Free Parking.
- Policy: No pets, Smoking outside only. Quiet hours apply.
- Check-in: 12:00 PM | Check-out: 10:00 AM.
- Pricing: Seasonal. Security deposit ₹1000. Extra guest ₹600/bed.
- Location: Near Coorg borders. 6km from city center.
- Nearby Attractions: Golden Temple (9km), Dubare Elephant Camp (20km), Nisargadhama (8km), Harangi Dam (15km).

Contact:
- Phone: +91 6362859209, +91 8951867147
- Email: s.r.retreat.queries@gmail.com

If asked about booking, encourage them to call or email directly for the most personalized rates.
`;

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

export const sendMessageToConcierge = async (history: ChatMessage[], userMessage: string): Promise<string> => {
  try {
    const ai = getClient();
    // We use a fresh chat session for simplicity in this demo structure, 
    // but passing history effectively simulates a continuous conversation.
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: RETREAT_CONTEXT,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "I apologize, I am currently meditating. Please try again in a moment.";
  } catch (error) {
    console.error("Concierge Error:", error);
    return "I am having trouble connecting to the sanctuary network. Please contact our front desk directly.";
  }
};
