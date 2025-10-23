
'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, FileText, Youtube, MessageSquare, BrainCircuit, Mic, History } from 'lucide-react';
import Link from 'next/link';

type Message = {
    text: string;
    sender: 'user' | 'bot';
    timestamp: number;
};

const aiTools = [
  {
    name: 'EduNex AI Chat',
    description: 'Your personal tutor for any question, any time.',
    icon: MessageSquare,
    href: '/ai-assistant/chat',
    disabled: false,
  },
  {
    name: 'Text Summarizer',
    description: 'Get key points from long articles or documents.',
    icon: FileText,
    href: '/ai-assistant/text-summarizer',
    disabled: false,
  },
  {
    name: 'PDF Summarizer',
    description: 'Summarize entire PDF documents in seconds.',
    icon: FileText,
    href: '/ai-assistant/pdf-summarizer',
    disabled: false,
  },
  {
    name: 'Video Summarizer',
    description: 'Get a summary of YouTube videos or local video files.',
    icon: Youtube,
    href: '/ai-assistant/youtube-summarizer',
    disabled: false,
  },
  {
    name: 'Audio Summarizer',
    description: 'Upload and summarize audio files like lectures or podcasts.',
    icon: Mic,
    href: '/ai-assistant/audio-summarizer',
    disabled: false,
  },
];

export default function AiZonePage() {
    const [recentChats, setRecentChats] = useState<Message[]>([]);

    useEffect(() => {
        try {
            const savedMessages = localStorage.getItem('edunex-chat-history');
            if (savedMessages) {
                const allMessages: Message[] = JSON.parse(savedMessages);
                // Get the last 3 user messages as conversation starters
                const userMessages = allMessages.filter(m => m.sender === 'user');
                setRecentChats(userMessages.slice(-3).reverse());
            }
        } catch (error) {
            console.error("Failed to load chat history from localStorage", error);
        }
    }, []);

  return (
    <>
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <Bot className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
              AI Zone
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Explore powerful AI tools to accelerate your learning.
            </p>
          </div>

          <div className="grid gap-6">
            {aiTools.map((tool, index) => (
              <Link key={tool.name} href={tool.href} className={tool.disabled ? 'pointer-events-none' : ''} aria-disabled={tool.disabled}>
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                  <CardHeader className="flex flex-row items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <tool.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-headline text-lg">{tool.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                    </div>
                     {tool.disabled ? (
                        <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-full">Coming Soon</span>
                     ) : (
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                     )}
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

            {recentChats.length > 0 && (
                 <div className="mt-12">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold font-headline tracking-tighter flex items-center justify-center gap-2">
                           <History className="h-6 w-6 text-primary" />
                           Recent Chats
                        </h3>
                         <p className="text-muted-foreground">Pick up where you left off.</p>
                    </div>
                     <div className="space-y-3">
                        {recentChats.map((chat, index) => (
                             <Link key={index} href="/ai-assistant/chat">
                                <Card className="shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground truncate italic">"{chat.text}"</p>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 ml-4" />
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </main>
    </>
  );
}
