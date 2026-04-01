import { Platform } from 'react-native';

// Real API key from user
const GEMINI_API_KEY = 'AIzaSyDrP__xdPR1q6eLLoFj0BbBpLXRneOsxSg';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export interface GeminiResponse {
  text: string;
  isError?: boolean;
}

/**
 * Sends a message (and optional image) to Gemini 1.5 Flash
 */
export const askGemini = async (prompt: string, base64Image?: string): Promise<GeminiResponse> => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY.includes('YOUR_GEMINI')) {
    return {
      text: "⚠️ API Key Missing: Please provide your Gemini API key in `src/services/geminiApi.ts` to enable AI features.",
      isError: true,
    };
  }

  try {
    const contents: any[] = [
      {
        parts: [
          { text: prompt },
        ],
      },
    ];

    if (base64Image) {
      // Add image to the first content part
      contents[0].parts.push({
        inline_data: {
          mime_type: "image/jpeg",
          data: base64Image,
        },
      });
    }

    const body = {
      contents,
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 0.7,
      },
    };

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Gemini API Error:', data.error);
      return { text: `Error: ${data.error.message}`, isError: true };
    }

    const parts = data.candidates?.[0]?.content?.parts || [];
    const resultText = parts.map((p: any) => p.text).join('') || "I'm sorry, I couldn't process that.";
    return { text: resultText };
  } catch (error) {
    console.error('Gemini Service Error:', error);
    return { text: "Network error: Unable to reach Gemini AI.", isError: true };
  }
};
