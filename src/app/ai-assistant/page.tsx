'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import { Bot, Send, Sparkles, User } from 'lucide-react';
import { getChatbotResponse } from './actions';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your AI learning assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      try {
        const response = await getChatbotResponse(input);
        const assistantMessage: Message = { role: 'assistant', content: response };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred.",
          description: "Failed to get a response from the AI assistant. Please try again.",
        });
        // Optionally remove the user's message or add an error message to the chat
        setMessages(prev => prev.slice(0, prev.length - 1));
      }
    });
  };

  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-3xl h-full flex flex-col">
            <div className="text-center mb-8">
                <Sparkles className="mx-auto h-12 w-12 text-primary mb-2" />
                <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">AI Assistant</h1>
                <p className="mt-2 text-muted-foreground md:text-lg">Your personal tutor for any question, any time.</p>
            </div>

            <Card className="flex-1 flex flex-col shadow-lg">
                <CardContent className="p-0 flex-1 flex flex-col">
                    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                        {messages.map((message, index) => (
                        <div key={index} className={cn('flex items-start gap-4', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                            {message.role === 'assistant' && (
                            <Avatar className="h-9 w-9 border-2 border-primary">
                                <div className='flex h-full w-full items-center justify-center rounded-full bg-primary/20'>
                                <Bot className="h-5 w-5 text-primary" />
                                </div>
                            </Avatar>
                            )}
                            <div className={cn('max-w-[75%] rounded-lg p-3 text-sm', message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                {message.content}
                            </div>
                            {message.role === 'user' && (
                            <Avatar className="h-9 w-9 border-2 border-muted-foreground/50">
                                 <div className='flex h-full w-full items-center justify-center rounded-full bg-muted'>
                                <User className="h-5 w-5 text-muted-foreground" />
                                </div>
                            </Avatar>
                            )}
                        </div>
                        ))}
                        {isPending && (
                            <div className="flex items-start gap-4 justify-start">
                                <Avatar className="h-9 w-9 border-2 border-primary">
                                     <div className='flex h-full w-full items-center justify-center rounded-full bg-primary/20'>
                                        <Bot className="h-5 w-5 text-primary" />
                                    </div>
                                </Avatar>
                                <div className="max-w-[75%] rounded-lg p-3 text-sm bg-muted flex items-center gap-2">
                                <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 bg-background border-t">
                        <form onSubmit={handleSubmit} className="flex items-center gap-2">
                        <Input
                            className="flex-1"
                            placeholder="Type your question here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isPending}
                        />
                        <Button type="submit" size="icon" disabled={!input.trim() || isPending}>
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </>
  );
}
