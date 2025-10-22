import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      // Use a more specific error message for missing API key
      return NextResponse.json({ error: "API key is missing." }, { status: 500 });
    }

    if (!prompt) {
        return NextResponse.json({ error: "Prompt is missing." }, { status: 400 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
        // This will be caught by the frontend's catch block
        throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Handle cases where the API returns a response with no candidates (e.g., due to safety filters)
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
        return NextResponse.json({ reply: data.candidates[0].content.parts[0].text || "I am unable to provide a response to that prompt. Please try a different one." });
    } else {
        // This handles cases like safety blocks where there are no candidates.
        return NextResponse.json({ reply: "I am unable to provide a response to that prompt. Please try a different one." });
    }
    
  } catch (error) {
    console.error("Error in /api/assistant:", error);
    // The frontend will show the "temporarily unavailable" message
    return NextResponse.json({ error: "Failed to communicate with the AI assistant" }, { status: 500 });
  }
}
