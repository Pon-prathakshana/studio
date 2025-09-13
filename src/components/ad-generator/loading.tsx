import { BotMessageSquare } from "lucide-react";

export function AdLoading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <BotMessageSquare className="h-16 w-16 text-primary animate-pulse" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-headline font-semibold text-foreground">
            Forging your ads...
          </h2>
          <p className="text-muted-foreground">
            The AI is crafting compelling ad variations for you.
          </p>
        </div>
      </div>
    </div>
  );
}
