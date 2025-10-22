
'use server';
/**
 * @fileOverview A flow for transcribing and summarizing audio files.
 *
 * - transcribeAndSummarizeAudio - A function that takes an audio data URI and generates a summary.
 * - AudioSummaryInput - The input type for the function.
 * - AudioSummaryOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { summarizeText } from './text-summarizer-flow';

const AudioSummaryInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "An audio file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  summaryLength: z.enum(['Short (approx. 50 words)', 'Medium (approx. 100 words)', 'Long (approx. 200 words)']).describe('The desired length of the summary.'),
});
export type AudioSummaryInput = z.infer<typeof AudioSummaryInputSchema>;

const AudioSummaryOutputSchema = z.object({
  transcription: z.string().describe('The transcribed text from the audio.'),
  summary: z.string().describe('The generated summary of the transcription.'),
});
export type AudioSummaryOutput = z.infer<typeof AudioSummaryOutputSchema>;

export async function transcribeAndSummarizeAudio(input: AudioSummaryInput): Promise<AudioSummaryOutput> {
  return audioSummarizerFlow(input);
}


const audioSummarizerFlow = ai.defineFlow(
  {
    name: 'audioSummarizerFlow',
    inputSchema: AudioSummaryInputSchema,
    outputSchema: AudioSummaryOutputSchema,
  },
  async (input) => {
    
    const { text: transcription } = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: [{ media: { url: input.audioDataUri } }, {text: 'Transcribe this audio.'}],
    });
    
    if (!transcription) {
      throw new Error('Could not transcribe the audio file.');
    }

    const { summary } = await summarizeText({
        textToSummarize: transcription,
        summaryLength: input.summaryLength,
    });

    return {
      transcription,
      summary,
    };
  }
);
