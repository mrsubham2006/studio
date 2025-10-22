
'use server';

import { summarizeYoutubeVideo } from '@/ai/flows/youtube-summarizer-flow';
import { transcribeAndSummarizeAudio } from '@/ai/flows/audio-summarizer-flow';
import { z } from 'zod';

const YoutubeSummaryInputSchema = z.object({
  videoUrl: z.string().url('Please enter a valid YouTube URL.'),
  summaryLength: z.enum(['Short (approx. 50 words)', 'Medium (approx. 100 words)', 'Long (approx. 200 words)']),
});

const VideoSummaryInputSchema = z.object({
    videoDataUri: z.string().startsWith('data:video/', 'Invalid video data URI.'),
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

export async function getVideoSummary(videoDataUri: string, summaryLength: 'Short (approx. 50 words)' | 'Medium (approx. 100 words)' | 'Long (approx. 200 words)') {
    try {
        const validatedInput = VideoSummaryInputSchema.parse({ videoDataUri: videoDataUri, summaryLength });
        const result = await transcribeAndSummarizeAudio({audioDataUri: validatedInput.videoDataUri, summaryLength: validatedInput.summaryLength});
        return result.summary;
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(`Invalid input: ${error.errors.map(e => e.message).join(', ')}`);
        }
        console.error("Error getting video summary:", error);
        throw new Error("Failed to process the video file. Please ensure it's a valid format and try again.");
    }
}
