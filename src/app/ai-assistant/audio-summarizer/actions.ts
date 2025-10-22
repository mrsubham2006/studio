'use server';

import { transcribeAndSummarizeAudio } from '@/ai/flows/audio-summarizer-flow';
import { z } from 'zod';

const AudioSummaryInputSchema = z.object({
  audioDataUri: z.string().startsWith('data:audio/', 'Invalid audio data URI.'),
  summaryLength: z.enum(['Short (approx. 50 words)', 'Medium (approx. 100 words)', 'Long (approx. 200 words)']),
});

export async function getAudioSummary(audioDataUri: string, summaryLength: 'Short (approx. 50 words)' | 'Medium (approx. 100 words)' | 'Long (approx. 200 words)') {
    try {
        const validatedInput = AudioSummaryInputSchema.parse({ audioDataUri, summaryLength });
        const result = await transcribeAndSummarizeAudio(validatedInput);
        return result.summary;
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(`Invalid input: ${error.errors.map(e => e.message).join(', ')}`);
        }
        console.error("Error getting audio summary:", error);
        throw new Error("Failed to process the audio file. Please ensure it's a valid format and try again.");
    }
}
