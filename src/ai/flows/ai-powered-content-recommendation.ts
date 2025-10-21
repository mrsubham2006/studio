'use server';
/**
 * @fileOverview AI-powered content recommendation flow.
 *
 * - recommendContent - A function that recommends courses and learning materials based on student performance.
 * - RecommendContentInput - The input type for the recommendContent function.
 * - RecommendContentOutput - The return type for the recommendContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendContentInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  quizResults: z.array(
    z.object({
      quizId: z.string().describe('The ID of the quiz.'),
      score: z.number().describe('The score achieved on the quiz.'),
      topic: z.string().describe('The topic of the quiz'),
    })
  ).describe('The results of the quizzes taken by the student.'),
  learningHistory: z.array(z.string()).describe('The learning history of the student (list of course IDs).'),
});
export type RecommendContentInput = z.infer<typeof RecommendContentInputSchema>;

const RecommendContentOutputSchema = z.object({
  recommendedCourses: z.array(
    z.object({
      courseId: z.string().describe('The ID of the recommended course.'),
      reason: z.string().describe('The reason for recommending this course.'),
    })
  ).describe('The list of recommended courses for the student.'),
  recommendedTopics: z.array(
    z.object({
      topic: z.string().describe('The recommended topic.'),
      reason: z.string().describe('The reason for recommending this topic.'),
    })
  ).describe('The list of recommended topics for the student.'),
});
export type RecommendContentOutput = z.infer<typeof RecommendContentOutputSchema>;

export async function recommendContent(input: RecommendContentInput): Promise<RecommendContentOutput> {
  return recommendContentFlow(input);
}

const recommendContentPrompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: {schema: RecommendContentInputSchema},
  output: {schema: RecommendContentOutputSchema},
  prompt: `You are an AI learning assistant that recommends courses and topics to students based on their quiz results and learning history.

  Analyze the student's quiz results and learning history to identify areas where they need the most improvement.

  Quiz Results:
  {{#each quizResults}}
  - Quiz ID: {{quizId}}, Score: {{score}}, Topic: {{topic}}
  {{/each}}

  Learning History: {{learningHistory}}

  Based on this information, recommend courses and topics that will help the student improve their understanding of the subject matter. Provide a reason for each recommendation.

  Output the recommendations in the following JSON format:
  {{json examples=[{"recommendedCourses": [{"courseId": "course1", "reason": "The student scored low on quizzes related to this course\'s topic."}], "recommendedTopics": [{"topic": "topic1", "reason": "The student has not yet studied this topic."}]}]}}
  `,
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: RecommendContentInputSchema,
    outputSchema: RecommendContentOutputSchema,
  },
  async input => {
    const {output} = await recommendContentPrompt(input);
    return output!;
  }
);
