'use server';

/**
 * @fileOverview An AI learning assistant chatbot flow.
 *
 * - aiLearningAssistantChatbot - A function that handles the chatbot interactions.
 * - AiLearningAssistantChatbotInput - The input type for the aiLearningAssistantChatbot function.
 * - AiLearningAssistantChatbotOutput - The return type for the aiLearningAssistantChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiLearningAssistantChatbotInputSchema = z.object({
  query: z.string().describe('The query from the student.'),
});
export type AiLearningAssistantChatbotInput = z.infer<typeof AiLearningAssistantChatbotInputSchema>;

const AiLearningAssistantChatbotOutputSchema = z.object({
  response: z.string().describe('The response from the AI learning assistant.'),
});
export type AiLearningAssistantChatbotOutput = z.infer<typeof AiLearningAssistantChatbotOutputSchema>;

export async function aiLearningAssistantChatbot(input: AiLearningAssistantChatbotInput): Promise<AiLearningAssistantChatbotOutput> {
  return aiLearningAssistantChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiLearningAssistantChatbotPrompt',
  input: {schema: AiLearningAssistantChatbotInputSchema},
  output: {schema: AiLearningAssistantChatbotOutputSchema},
  prompt: `You are an AI learning assistant for a platform called EduNex. You are friendly, helpful, and an expert in all educational subjects. Your goal is to help students learn and understand topics better.

You should answer questions clearly and concisely. If a student asks a question you don't know the answer to, you should say that you are still learning and will try to find the answer.

Here is the student's query:
"{{query}}"

Please provide a helpful and encouraging response.`,
});

const aiLearningAssistantChatbotFlow = ai.defineFlow(
  {
    name: 'aiLearningAssistantChatbotFlow',
    inputSchema: AiLearningAssistantChatbotInputSchema,
    outputSchema: AiLearningAssistantChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
