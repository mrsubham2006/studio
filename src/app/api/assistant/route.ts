import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
    
    if (data.candidates && data.candidates.length > 0) {
        return NextResponse.json({ reply: data.candidates[0]?.content?.parts?.[0]?.text || "No reply" });
    } else {
        // This case handles when the API returns a response with no candidates, which can happen due to safety filters.
        return NextResponse.json({ reply: "I am unable to provide a response to that prompt. Please try a different one." });
    }
    
  } catch (error) {
    console.error("Error in /api/assistant:", error);
    return NextResponse.json({ error: "Failed to communicate with the AI assistant" }, { status: 500 });
  }
}
