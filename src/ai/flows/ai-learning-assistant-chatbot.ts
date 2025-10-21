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
  prompt: `You are an AI learning assistant designed to help students with their questions.

  Respond to the following query:
  {{query}}`,
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
