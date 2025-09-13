"use server";

import { generateAdCopies, GenerateAdCopiesInput } from "@/ai/flows/generate-ad-copies";
import { generateImageSuggestions } from "@/ai/flows/integrate-image-suggestions";
import { AdData } from "@/lib/types";

export async function generateAds(input: GenerateAdCopiesInput): Promise<AdData[] | null> {
  try {
    const adCopies = await generateAdCopies(input);

    if (!adCopies || adCopies.length === 0) {
      console.error("Failed to generate ad copies.");
      return null;
    }

    const adDataPromises = adCopies.map(async (copy, index) => {
      const imageSuggestion = await generateImageSuggestions({
        productDescription: input.productDescription,
        adCopy: `${copy.headline} ${copy.bodyText}`,
      });
      
      const imageQuery = imageSuggestion.unsplashQuery || `ad-visual-${index}`;
      
      return {
        id: `ad-${Date.now()}-${index}`,
        headline: copy.headline,
        bodyText: copy.bodyText,
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(imageQuery)}/600/800`,
        imageHint: imageSuggestion.unsplashQuery,
      };
    });

    const adData = await Promise.all(adDataPromises);
    return adData;

  } catch (error) {
    console.error("Error generating ads:", error);
    return null;
  }
}
