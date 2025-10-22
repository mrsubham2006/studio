'use server';
/**
 * @fileoverview This file creates a Next.js route handler that exposes all
 * Genkit flows as API endpoints. This is the bridge between your front-end
 * components and your server-side AI logic.
 */

import {createApi} from '@genkit-ai/next';
import '@/ai/flows/ai-learning-assistant-chatbot';
import '@/ai/flows/ai-powered-content-recommendation';
import '@/ai/flows/text-summarizer-flow';
import '@/ai/flows/youtube-summarizer-flow';
import '@/ai/flows/audio-summarizer-flow';
import '@/ai/flows/audio-summarizer-flow';

// This creates the API route handler.
// For example, a flow named `myFlow` will be available at `/api/genkit/myFlow`.
export const {GET, POST} = createApi();
