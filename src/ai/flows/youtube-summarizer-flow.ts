'use server';
/**
 * @fileOverview A flow for summarizing YouTube videos.
 *
 * - summarizeYoutubeVideo - A function that takes a YouTube video URL and generates a summary.
 * - SummarizeYoutubeVideoInput - The input type for the summarizeYoutubeVideo function.
 * - SummarizeYoutubeVideoOutput - The return type for the summarizeYoutubeVideo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { YoutubeTranscript } from 'youtube-transcript';

const SummarizeYoutubeVideoInputSchema = z.object({
  videoUrl: z.string().url().describe('The URL of the YouTube video to summarize.'),
  summaryLength: z.enum(['Short (approx. 50 words)', 'Medium (approx. 100 words)', 'Long (approx. 200 words)']).describe('The desired length of the summary.'),
});
export type SummarizeYoutubeVideoInput = z.infer<typeof SummarizeYoutubeVideoInputSchema>;

const SummarizeYoutubeVideoOutputSchema = z.object({
  summary: z.string().describe('The generated summary of the video transcript.'),
  title: z.string().describe('The title of the video.'),
});
export type SummarizeYoutubeVideoOutput = z.infer<typeof SummarizeYoutubeVideoOutputSchema>;

export async function summarizeYoutubeVideo(input: SummarizeYoutubeVideoInput): Promise<SummarizeYoutubeVideoOutput> {
  return youtubeSummarizerFlow(input);
}

const youtubeSummarizerFlow = ai.defineFlow(
  {
    name: 'youtubeSummarizerFlow',
    inputSchema: SummarizeYoutubeVideoInputSchema,
    outputSchema: SummarizeYoutubeVideoOutputSchema,
  },
  async (input) => {
    
    const transcriptData = await YoutubeTranscript.fetchTranscript(input.videoUrl);
    
    if (!transcriptData || transcriptData.length === 0) {
      throw new Error('Could not retrieve transcript for this video.');
    }

    const fullTranscript = transcriptData.map(item => item.text).join(' ');

    const prompt = ai.definePrompt({
      name: 'youtubeSummarizePrompt',
      prompt: `Summarize the following video transcript to a '{{summaryLength}}' length.

      Transcript:
      """
      {{transcript}}
      """

      Return only the summarized text.`,
    });

    const { output } = await prompt({
      summaryLength: input.summaryLength,
      transcript: fullTranscript,
    });
    
    // In a real app, we would also fetch the video title via YouTube's API
    // For this demo, we'll return a placeholder.
    return {
        summary: output!.summary,
        title: "YouTube Video"
    };
  }
);
