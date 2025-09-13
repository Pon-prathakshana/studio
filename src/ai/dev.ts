import { config } from 'dotenv';
config();

import '@/ai/flows/generate-ad-copies.ts';
import '@/ai/flows/integrate-image-suggestions.ts';
import '@/ai/flows/edit-and-regenerate-ad-copy.ts';