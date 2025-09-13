"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Download, FileText, Pencil, Save } from "lucide-react";

import { type AdData } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

type AdCardProps = {
  ad: AdData;
  index: number;
};

export function AdCard({ ad, index }: AdCardProps) {
  const [editedHeadline, setEditedHeadline] = useState(ad.headline);
  const [editedBody, setEditedBody] = useState(ad.bodyText);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleCopyText = () => {
    navigator.clipboard.writeText(`${editedHeadline}\n\n${editedBody}`);
    toast({
      title: "Copied to Clipboard",
      description: "The ad copy has been copied.",
    });
  };
  
  const handleToggleEdit = () => {
    if (isEditing) {
      toast({
        title: "Changes Saved",
        description: "Your edits to the ad have been saved locally.",
      });
    }
    setIsEditing(!isEditing);
  }

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex-row justify-between items-center">
        <Badge variant="secondary">Ad {String.fromCharCode(65 + index)}</Badge>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleToggleEdit}>
          {isEditing ? <Save className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
          <span className="sr-only">{isEditing ? "Save" : "Edit"}</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <div className="aspect-[3/4] relative rounded-lg overflow-hidden w-full flex-shrink-0">
          <Image
            src={ad.imageUrl}
            alt={ad.imageHint}
            fill
            className="object-cover"
            data-ai-hint={ad.imageHint}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4 text-white">
            <Textarea
              value={editedHeadline}
              onChange={(e) => setEditedHeadline(e.target.value)}
              readOnly={!isEditing}
              className={cn("font-headline text-2xl font-bold bg-transparent border-0 p-0 h-auto resize-none focus-visible:ring-0 focus-visible:ring-offset-0 text-shadow shadow-black/50", isEditing ? "ring-1 ring-white/50 rounded-md p-1" : "")}
            />
             <Textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              readOnly={!isEditing}
              className={cn("text-sm mt-2 bg-transparent border-0 p-0 h-auto resize-none focus-visible:ring-0 focus-visible:ring-offset-0 text-shadow-sm shadow-black/50", isEditing ? "ring-1 ring-white/50 rounded-md p-1 mt-2" : "")}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col sm:flex-row gap-2">
        <Button onClick={handleCopyText} className="w-full">
          <Copy className="mr-2" />
          Copy Text
        </Button>
        <div className="flex w-full sm:w-auto gap-2">
           <Button variant="outline" className="w-full sm:w-auto" disabled>
              <Download className="mr-2" /> PNG
           </Button>
           <Button variant="outline" className="w-full sm:w-auto" disabled>
              <FileText className="mr-2" /> PDF
           </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
