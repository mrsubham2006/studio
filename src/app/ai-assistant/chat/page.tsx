'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, ArrowLeft, SendHorizontal, User, Bot, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

async function getChatbotResponse(prompt: string) {
  const res = await fetch("/api/assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: "Failed to get response from server." }));
    throw new Error(errorData.error || "An unknown error occurred.");
  }

  const data = await res.json();
  return data.reply;
}

export default function AiAssistantChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const [apiError, setApiError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [userMessageForRetry, setUserMessageForRetry] = useState<Message | null>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to the bottom after the DOM updates
        setTimeout(() => {
             if(scrollAreaRef.current) {
                scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
             }
        }, 100);
    }
  }, [messages]);


  const handleSendMessage = (messageText: string) => {
    if (messageText.trim() === '') return;

    setApiError(null); // Clear previous errors
    const userMessage: Message = { text: messageText, sender: 'user' };
    
    // Add user message to chat, unless it's a retry of the same message
    if (userMessageForRetry?.text !== messageText) {
       setMessages(prev => [...prev, userMessage]);
    }
    
    setUserMessageForRetry(userMessage); // Store for potential retry
    setInput('');

    startTransition(async () => {
      try {
        const botResponse = await getChatbotResponse(messageText);
        const botMessage: Message = { text: botResponse, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
        setUserMessageForRetry(null); // Clear on success
      } catch (error: any) {
        console.error(error);
        setApiError(error.message || "⚠️ AI Assistant is temporarily unavailable. Please try again later.");
      }
    });
  };

  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-3xl h-[calc(100vh-150px)] flex flex-col">
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/ai-assistant" className="flex items-center gap-2 text-muted-foreground">
                        <ArrowLeft className="h-4 w-4" />
                        Back to AI Zone
                    </Link>
                </Button>
                <div className="text-center fade-in-up">
                    <Sparkles className="mx-auto h-12 w-12 text-primary mb-2" />
                    <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">EduNex AI Chat</h1>
                    <p className="mt-2 text-muted-foreground md:text-lg">Your personal AI-powered tutor.</p>
                </div>
            </div>

            <Card className="flex-1 flex flex-col shadow-lg fade-in-up" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-0 flex-1 flex flex-col">
                   <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                     <div className="space-y-6">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={cn(
                              'flex items-start gap-3',
                              message.sender === 'user' ? 'justify-end' : 'justify-start'
                            )}
                          >
                            {message.sender === 'bot' && (
                              <div className="bg-primary text-primary-foreground p-2 rounded-full">
                                <Bot className="h-5 w-5" />
                              </div>
                            )}
                            <div
                              className={cn(
                                'max-w-xs md:max-w-md rounded-2xl p-3 text-sm whitespace-pre-wrap',
                                message.sender === 'user'
                                  ? 'bg-primary text-primary-foreground rounded-br-none'
                                  : 'bg-muted rounded-bl-none'
                              )}
                            >
                              {message.text}
                            </div>
                            {message.sender === 'user' && (
                              <div className="bg-muted text-foreground p-2 rounded-full">
                                <User className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                        ))}
                         {isPending && (
                            <div className="flex items-start gap-3 justify-start">
                                <div className="bg-primary text-primary-foreground p-2 rounded-full">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div className="bg-muted rounded-2xl p-3 rounded-bl-none">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="h-2 w-2 bg-foreground rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </div>
                         )}
                      </div>
                   </ScrollArea>
                    {apiError && (
                      <div className="p-4 border-t text-destructive bg-destructive/10 text-sm flex items-center justify-between">
                          <div className='flex items-center gap-2'>
                            <AlertTriangle className="h-4 w-4" />
                            {apiError}
                          </div>
                          {userMessageForRetry && (
                            <Button variant="ghost" className='text-destructive' onClick={() => handleSendMessage(userMessageForRetry.text)}>
                                Retry
                            </Button>
                          )}
                      </div>
                    )}
                    <div className="p-4 border-t bg-background/80">
                        <div className="relative">
                            <Input
                                placeholder="Ask anything about your studies..."
                                className="pr-12 h-11"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
                                disabled={isPending}
                            />
                            <Button 
                                type="submit" 
                                size="icon" 
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8" 
                                onClick={() => handleSendMessage(input)}
                                disabled={isPending || input.trim() === ''}
                            >
                                <SendHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </>
  );
}
