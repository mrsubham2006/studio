'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, BrainCircuit, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HuggingChatPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 bg-muted/20">
        <div className="container max-w-5xl h-[calc(100vh-150px)] flex flex-col">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/ai-assistant" className="flex items-center gap-2 text-muted-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to AI Zone
              </Link>
            </Button>
            <div className="text-center">
              <div className="inline-block p-3 bg-primary/10 rounded-full mb-4 relative">
                <BrainCircuit className="h-10 w-10 text-primary" />
                <div className="absolute -top-1 -right-1 p-1 bg-background rounded-full shadow-lg">
                  <Sparkles className="h-4 w-4 text-yellow-500 fill-yellow-400 animate-pulse" />
                </div>
              </div>
              <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
                HuggingChat
              </h1>
              <p className="mt-2 text-muted-foreground md:text-lg">
                Chat with leading open-source AI models.
              </p>
            </div>
          </div>

          <Card className="shadow-2xl backdrop-blur-lg bg-card/80 flex-1">
            <CardContent className="p-2 h-full">
              <iframe
                src="https://huggingface.co/chat/embed/openchat/openchat-3.5-1210"
                className="w-full h-full border-0 rounded-lg"
                title="HuggingChat"
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
