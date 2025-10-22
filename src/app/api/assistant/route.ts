
import { NextRequest, NextResponse } from 'next/server';
import { aiLearningAssistantChatbot } from '@/ai/flows/ai-learning-assistant-chatbot';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is missing.' }, { status: 400 });
    }

    // Use the Genkit flow to get the response
    const result = await aiLearningAssistantChatbot({ query: prompt });
    
    return NextResponse.json({ reply: result.response });

  } catch (error: any) {
    console.error("Error in /api/assistant:", error);
    const errorMessage = error.message || "Failed to communicate with the AI assistant";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
