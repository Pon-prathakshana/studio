'use server';

/**
 * @fileOverview A flow that suggests relevant images for ad copy, using the Unsplash API.
 *
 * - generateImageSuggestions - A function that generates image suggestions based on the product description.
 * - GenerateImageSuggestionsInput - The input type for the generateImageSuggestions function.
 * - GenerateImageSuggestionsOutput - The return type for the generateImageSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageSuggestionsInputSchema = z.object({
  productDescription: z
    .string()
    .describe('The description of the product for which to generate ads.'),
  adCopy: z.string().describe('The generated ad copy to find an image for.'),
});
export type GenerateImageSuggestionsInput = z.infer<typeof GenerateImageSuggestionsInputSchema>;

const GenerateImageSuggestionsOutputSchema = z.object({
  imageSuggestion: z
    .string()
    .describe(
      'A suggestion for an image to use with the ad copy, based on the product description. This should describe what the image should depict.'
    ),
  unsplashQuery: z
    .string()
    .describe(
      'A query to use with the Unsplash API to find a relevant image. Keep it short.'
    ),
});
export type GenerateImageSuggestionsOutput = z.infer<typeof GenerateImageSuggestionsOutputSchema>;

export async function generateImageSuggestions(
  input: GenerateImageSuggestionsInput
): Promise<GenerateImageSuggestionsOutput> {
  return generateImageSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImageSuggestionsPrompt',
  input: {schema: GenerateImageSuggestionsInputSchema},
  output: {schema: GenerateImageSuggestionsOutputSchema},
  prompt: `You are an expert marketing assistant, skilled at suggesting images for advertisements.

  Based on the product description and ad copy provided, suggest an image that would be visually appealing and relevant to the ad.

  Product Description: {{{productDescription}}}
  Ad Copy: {{{adCopy}}}

  Consider what kind of image would capture the attention of the target audience and effectively communicate the value proposition of the product. Be specific about the image content, colors, and overall style.

  Also suggest a short query to be used with the Unsplash API to find a relevant image.
  `,
});

const generateImageSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateImageSuggestionsFlow',
    inputSchema: GenerateImageSuggestionsInputSchema,
    outputSchema: GenerateImageSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
