import { BotMessageSquare } from 'lucide-react';

export function AdHeader() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b">
      <div className="container mx-auto flex items-center gap-3">
        <BotMessageSquare className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-headline font-bold text-foreground">
          AdForge AI
        </h1>
      </div>
    </header>
  );
}
