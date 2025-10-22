
'use server';

import { summarizeYoutubeVideo } from '@/ai/flows/youtube-summarizer-flow';
import { transcribeAndSummarizeAudio } from '@/ai/flows/audio-summarizer-flow';
import { z } from 'zod';

const YoutubeSummaryInputSchema = z.object({
  videoUrl: z.string().url('Please enter a valid YouTube URL.'),
  summaryLength: z.enum(['Short (approx. 50 words)', 'Medium (approx. 100 words)', 'Long (approx. 200 words)']),
});

const AudioSummaryInputSchema = z.object({
    audioDataUri: z.string().startsWith('data:audio/', 'Invalid audio data URI.'),
    summaryLength: z.enum(['Short (approx. 50 words)', 'Medium (approx. 100 words)', 'Long (approx. 200 words)']),
});


export async function getYoutubeSummary(videoUrl: string, summaryLength: 'Short (approx. 50 words)' | 'Medium (approx. 100 words)' | 'Long (approx. 200 words)') {
  try {
    const validatedInput = YoutubeSummaryInputSchema.parse({ videoUrl, summaryLength });
    const result = await summarizeYoutubeVideo(validatedInput);
    return result.summary;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid input: ${error.errors.map(e => e.message).join(', ')}`);
    }
    console.error("Error getting YouTube summary:", error);
    if (error instanceof Error && error.message.includes('transcript')) {
        throw new Error("Could not retrieve a transcript for this video. It might be disabled or the video is invalid.");
    }
    throw new Error("Failed to communicate with the AI model for summarization.");
  }
}

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
