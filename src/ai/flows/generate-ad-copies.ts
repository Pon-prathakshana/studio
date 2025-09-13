'use server';

/**
 * @fileOverview Ad copy generation flow.
 *
 * - generateAdCopies - A function that generates multiple ad copy variations with headlines, body text, and suggested background visuals.
 * - GenerateAdCopiesInput - The input type for the generateAdCopies function.
 * - GenerateAdCopiesOutput - The return type for the generateAdCopies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAdCopiesInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productDescription: z.string().describe('A detailed description of the product.'),
  targetAudience: z.string().describe('The target audience for the product.'),
  tone: z
    .enum(['Funny', 'Professional', 'Bold', 'Friendly'])
    .optional()
    .describe('The desired tone or style for the ad copies.'),
});
export type GenerateAdCopiesInput = z.infer<typeof GenerateAdCopiesInputSchema>;

const AdCopySchema = z.object({
  headline: z.string().describe('A short headline for the ad copy (maximum 10 words).'),
  bodyText: z.string().describe('Persuasive body text for the ad copy (2-3 sentences).'),
  suggestedVisuals: z
    .string()
    .describe(
      'Suggestions for the type of image or background that would best fit the ad copy (e.g., product photo, abstract design, lifestyle image).'
    ),
});

const GenerateAdCopiesOutputSchema = z.array(AdCopySchema).describe('An array of ad copy variations.');
export type GenerateAdCopiesOutput = z.infer<typeof GenerateAdCopiesOutputSchema>;

export async function generateAdCopies(input: GenerateAdCopiesInput): Promise<GenerateAdCopiesOutput> {
  return generateAdCopiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAdCopiesPrompt',
  input: {schema: GenerateAdCopiesInputSchema},
  output: {schema: GenerateAdCopiesOutputSchema},
  prompt: `You are a marketing expert skilled in creating compelling ad copies.

  Generate 5 different ad copy variations based on the following product information:

  Product Name: {{{productName}}}
  Product Description: {{{productDescription}}}
  Target Audience: {{{targetAudience}}}
  Tone/Style: {{#if tone}}{{{tone}}}{{else}}Neutral{{/if}}

  Each ad copy should include:
  - A headline (maximum 10 words)
  - Body text (2-3 sentences, persuasive)
  - Suggestions for visuals (image or background) that would best fit the copy, making it colourful and visually attractive for poster-style ads.

  Make the ad copies colourful, visually attractive, and suitable for use in poster-style ads. Suggest what type of image or background would best fit each copy (e.g., product photo, abstract design, lifestyle image).
  The output should be a JSON array of ad copy variations.
  `, // Added instructions for colourful and visually attractive ads
});

const generateAdCopiesFlow = ai.defineFlow(
  {
    name: 'generateAdCopiesFlow',
    inputSchema: GenerateAdCopiesInputSchema,
    outputSchema: GenerateAdCopiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
