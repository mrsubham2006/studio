import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function AiAssistantPreview() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container max-w-7xl">
        <div className="bg-gradient-to-r from-primary to-accent p-8 md:p-12 rounded-lg shadow-xl text-center flex flex-col items-center">
            <div className="p-4 bg-primary-foreground/20 rounded-full mb-4">
                <Sparkles className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary-foreground">
                Your 24x7 Learning Companion
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">
                Stuck on a problem? Get instant help from our AI Assistant, anytime, anywhere.
            </p>
            <Button size="lg" variant="secondary" asChild className="mt-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
                <Link href="/ai-assistant">Ask AI</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
