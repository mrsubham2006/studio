'use server';

import { aiLearningAssistantChatbot } from '@/ai/flows/ai-learning-assistant-chatbot';
import { z } from 'zod';

const QuerySchema = z.string().min(1, 'Query cannot be empty.').max(500, 'Query is too long.');

export async function getChatbotResponse(query: string) {
  try {
    const validatedQuery = QuerySchema.parse(query);
    const result = await aiLearningAssistantChatbot({ query: validatedQuery });
    return result.response;
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid query provided.");
    }
    // Re-throw a generic error to be handled by the client
    throw new Error("Failed to communicate with the AI assistant.");
  }
}
