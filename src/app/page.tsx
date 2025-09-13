"use client";

import { useState } from 'react';
import { AdHeader } from '@/components/ad-generator/header';
import { AdInputForm } from '@/components/ad-generator/input-form';
import { AdDisplay } from '@/components/ad-generator/ad-display';
import { AdLoading } from '@/components/ad-generator/loading';
import { type AdData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type AppState = 'input' | 'loading' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('input');
  const [ads, setAds] = useState<AdData[]>([]);
  const { toast } = useToast();

  const handleAdsGenerated = (generatedAds: AdData[] | null) => {
    if (generatedAds && generatedAds.length > 0) {
      setAds(generatedAds);
      setAppState('results');
    } else {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description:
          'The AI could not generate ads with the provided input. Please try again.',
      });
      setAppState('input');
    }
  };

  const handleSetLoading = () => {
    setAppState('loading');
  };

  const handleReset = () => {
    setAds([]);
    setAppState('input');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AdHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        {appState === 'input' && (
          <AdInputForm
            onAdsGenerated={handleAdsGenerated}
            onSetLoading={handleSetLoading}
          />
        )}
        {appState === 'loading' && <AdLoading />}
        {appState === 'results' && (
          <AdDisplay ads={ads} onRegenerate={handleReset} />
        )}
      </main>
    </div>
  );
}
