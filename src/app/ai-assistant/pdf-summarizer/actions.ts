'use server';

import { summarizeText } from '@/ai/flows/text-summarizer-flow';
import { z } from 'zod';

const PdfSummaryInputSchema = z.object({
  textToSummarize: z.string().min(1, 'Extracted text cannot be empty.'),
  summaryLength: z.enum(['Short (approx. 50 words)', 'Medium (approx. 100 words)', 'Long (approx. 200 words)']),
});

export async function getPdfSummary(extractedText: string, summaryLength: 'Short (approx. 50 words)' | 'Medium (approx. 100 words)' | 'Long (approx. 200 words)') {
  try {
    const validatedInput = PdfSummaryInputSchema.parse({ textToSummarize: extractedText, summaryLength });
    const result = await summarizeText(validatedInput);
    return result.summary;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid input: ${error.errors.map(e => e.message).join(', ')}`);
    }
    console.error("Error getting PDF summary:", error);
    throw new Error("Failed to communicate with the AI model for PDF summarization.");
  }
}
