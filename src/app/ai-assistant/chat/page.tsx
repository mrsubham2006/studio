
'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function AiAssistantChatPage() {

  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-7xl h-[calc(100vh-150px)] flex flex-col">
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/ai-assistant" className="flex items-center gap-2 text-muted-foreground">
                        <ArrowLeft className="h-4 w-4" />
                        Back to AI Zone
                    </Link>
                </Button>
                <div className="text-center fade-in-up">
                    <Sparkles className="mx-auto h-12 w-12 text-primary mb-2" />
                    <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">AI Assistant</h1>
                    <p className="mt-2 text-muted-foreground md:text-lg">Powered by ChatGPT.</p>
                </div>
            </div>

            <Card className="flex-1 flex flex-col shadow-lg fade-in-up" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-0 flex-1 flex flex-col">
                   <iframe
                        src="https://chatgpt.com/"
                        className="w-full h-full border-0 rounded-lg"
                        title="AI Assistant - ChatGPT"
                    ></iframe>
                </CardContent>
            </Card>
        </div>
      </main>
    </>
  );
}
