'use server';

import { summarizeText } from '@/ai/flows/text-summarizer-flow';
import { z } from 'zod';

const SummaryInputSchema = z.object({
  textToSummarize: z.string().min(20, 'Text must be at least 20 characters long.').max(50000, 'Text is too long (max 50,000 characters).'),
  summaryLength: z.enum(['Short (approx. 50 words)', 'Medium (approx. 100 words)', 'Long (approx. 200 words)']),
});

export async function getSummary(textToSummarize: string, summaryLength: 'Short (approx. 50 words)' | 'Medium (approx. 100 words)' | 'Long (approx. 200 words)') {
  try {
    const validatedInput = SummaryInputSchema.parse({ textToSummarize, summaryLength });
    const result = await summarizeText(validatedInput);
    return result.summary;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid input: ${error.errors.map(e => e.message).join(', ')}`);
    }
    console.error("Error getting summary:", error);
    // Re-throw a generic error to be handled by the client
    throw new Error("Failed to communicate with the AI model.");
  }
}
