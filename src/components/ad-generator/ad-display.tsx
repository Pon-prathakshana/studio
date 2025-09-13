"use client";

import { type AdData } from "@/lib/types";
import { AdCard } from "./ad-card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

type AdDisplayProps = {
  ads: AdData[];
  onRegenerate: () => void;
};

export function AdDisplay({ ads, onRegenerate }: AdDisplayProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-headline">Your AI-Generated Ads</h2>
          <p className="text-muted-foreground">
            Here are 5 variations. You can edit the text directly on the cards.
          </p>
        </div>
        <Button onClick={onRegenerate} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Ads
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad, index) => (
          <AdCard key={ad.id} ad={ad} index={index} />
        ))}
      </div>
    </div>
  );
}
