import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      console.error("Gemini API key is missing from .env.local");
      return NextResponse.json({ error: "API key is missing." }, { status: 500 });
    }

    if (!prompt) {
        return NextResponse.json({ error: "Prompt is missing." }, { status: 400 });
    }

    // Corrected the API endpoint from v1beta to v1
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Google API Error:", errorText);
        throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
        return NextResponse.json({ reply: data.candidates[0].content.parts[0].text || "I am unable to provide a response to that prompt. Please try a different one." });
    } else {
        // This case handles situations where the API returns a 200 OK but with no valid candidates (e.g., due to safety filters)
        console.warn("Google API returned no valid candidates. Response:", data);
        return NextResponse.json({ reply: "I am unable to provide a response to that prompt. Please try a different one." });
    }
    
  } catch (error) {
    console.error("Error in /api/assistant:", error);
    return NextResponse.json({ error: "Failed to communicate with the AI assistant" }, { status: 500 });
  }
}
