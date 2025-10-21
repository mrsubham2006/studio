'use server';
/**
 * @fileOverview A flow for summarizing text using an AI model.
 *
 * - summarizeText - A function that takes text and a desired length to generate a summary.
 * - SummarizeTextInput - The input type for the summarizeText function.
 * - SummarizeTextOutput - The return type for the summarizeText function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeTextInputSchema = z.object({
  textToSummarize: z.string().describe('The text content that needs to be summarized.'),
  summaryLength: z.enum(['Short (approx. 50 words)', 'Medium (approx. 100 words)', 'Long (approx. 200 words)']).describe('The desired length of the summary.'),
});
export type SummarizeTextInput = z.infer<typeof SummarizeTextInputSchema>;

const SummarizeTextOutputSchema = z.object({
  summary: z.string().describe('The generated summary of the text.'),
});
export type SummarizeTextOutput = z.infer<typeof SummarizeTextOutputSchema>;

export async function summarizeText(input: SummarizeTextInput): Promise<SummarizeTextOutput> {
  return summarizeTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTextPrompt',
  input: { schema: SummarizeTextInputSchema },
  output: { schema: SummarizeTextOutputSchema },
  prompt: `Summarize the following text to a '{{summaryLength}}' length.

Text to summarize:
"""
{{textToSummarize}}
"""

Return only the summarized text.`,
});

const summarizeTextFlow = ai.defineFlow(
  {
    name: 'summarizeTextFlow',
    inputSchema: SummarizeTextInputSchema,
    outputSchema: SummarizeTextOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
