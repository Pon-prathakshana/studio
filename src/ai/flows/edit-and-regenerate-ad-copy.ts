'use server';

/**
 * @fileOverview This flow allows users to edit the generated ad copy and provide feedback to the AI for regeneration.
 *
 * - editAndRegenerateAdCopy - A function that handles the ad copy editing and regeneration process.
 * - EditAndRegenerateAdCopyInput - The input type for the editAndRegenerateAdCopy function.
 * - EditAndRegenerateAdCopyOutput - The return type for the editAndRegenerateAdCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EditAndRegenerateAdCopyInputSchema = z.object({
  originalHeadline: z.string().describe('The original headline of the ad copy.'),
  originalBodyText: z.string().describe('The original body text of the ad copy.'),
  feedback: z.string().describe('The feedback provided by the user for regeneration.'),
  productName: z.string().describe('The name of the product.'),
  targetAudience: z.string().describe('The target audience for the ad.'),
  tone: z.string().optional().describe('The desired tone/style of the ad (e.g., Funny, Professional, Bold, Friendly).'),
});
export type EditAndRegenerateAdCopyInput = z.infer<typeof EditAndRegenerateAdCopyInputSchema>;

const EditAndRegenerateAdCopyOutputSchema = z.object({
  regeneratedHeadline: z.string().describe('The regenerated headline of the ad copy.'),
  regeneratedBodyText: z.string().describe('The regenerated body text of the ad copy.'),
  suggestedImage: z.string().describe('Suggested image or background that fits the ad copy.'),
});
export type EditAndRegenerateAdCopyOutput = z.infer<typeof EditAndRegenerateAdCopyOutputSchema>;

export async function editAndRegenerateAdCopy(input: EditAndRegenerateAdCopyInput): Promise<EditAndRegenerateAdCopyOutput> {
  return editAndRegenerateAdCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'editAndRegenerateAdCopyPrompt',
  input: {schema: EditAndRegenerateAdCopyInputSchema},
  output: {schema: EditAndRegenerateAdCopyOutputSchema},
  prompt: `You are an AI copywriter specializing in creating advertisements.

You will regenerate the ad copy based on user feedback, while adhering to the specified product, target audience, and tone.

Product Name: {{{productName}}}
Target Audience: {{{targetAudience}}}
Tone/Style: {{{tone}}}

Original Headline: {{{originalHeadline}}}
Original Body Text: {{{originalBodyText}}}

Feedback: {{{feedback}}}

Regenerate the ad copy (headline and body text) based on the feedback. Also, suggest a type of image or background that would best fit the ad copy (e.g., product photo, abstract design, lifestyle image).

Output:
Headline:
Body Text:
Suggested Image:
`,
});

const editAndRegenerateAdCopyFlow = ai.defineFlow(
  {
    name: 'editAndRegenerateAdCopyFlow',
    inputSchema: EditAndRegenerateAdCopyInputSchema,
    outputSchema: EditAndRegenerateAdCopyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
