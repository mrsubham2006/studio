
'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, BrainCircuit, Puzzle, Target, Brain, Code, Divide, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const games = [
  {
    title: 'Quiz Quest',
    description: 'Answer 5 random questions from your course topics and earn points.',
    icon: Target,
    buttonColor: '#00BFA6',
    href: '/games/quiz-quest',
    leaderboard: [
        { rank: 1, name: 'Riya Sharma', score: 450 },
        { rank: 2, name: 'Amit Kumar', score: 420 },
        { rank: 3, name: 'Sunita Devi', score: 390 },
    ]
  },
  {
    title: 'Word Match',
    description: 'Drag and drop words to match them with their correct meanings.',
    icon: Puzzle,
    buttonColor: '#00BFA6',
    href: '/games/word-match',
    leaderboard: [
        { rank: 1, name: 'Vikram Singh', score: 500 },
        { rank: 2, name: 'Priya Verma', score: 480 },
        { rank: 3, name: 'Ankit Sharma', score: 450 },
    ]
  },
  {
    title: 'Memory Challenge',
    description: 'A flip-card memory game with course keywords and concepts.',
    icon: BrainCircuit,
    buttonColor: '#00BFA6',
    href: '#',
    leaderboard: [
        { rank: 1, name: 'Neha Gupta', score: 620 },
        { rank: 2, name: 'Rajesh Kumar', score: 580 },
        { rank: 3, name: 'Pooja Singh', score: 550 },
    ]
  },
  {
    title: 'Code Rush',
    description: 'Complete short code snippets by choosing the correct piece.',
    icon: Code,
    buttonColor: '#00BFA6',
    href: '#',
    leaderboard: [
        { rank: 1, name: 'Suresh Kumar', score: 800 },
        { rank: 2, name: 'Deepika Rao', score: 750 },
        { rank: 3, name: 'Karan Mehra', score: 720 },
    ]
  },
  {
    title: 'Math Sprint',
    description: 'Timed arithmetic questions that get faster as you answer correctly.',
    icon: Divide,
    buttonColor: '#00BFA6',
    href: '#',
    leaderboard: [
        { rank: 1, name: 'Aarav Patel', score: 1250 },
        { rank: 2, name: 'Isha Reddy', score: 1100 },
        { rank: 3, name: 'Zoya Khan', score: 1050 },
    ]
  },
];

const rankColors = {
    1: 'text-yellow-400',
    2: 'text-gray-400',
    3: 'text-orange-400'
};

export default function GamesPage() {
  return (
    <div style={{ backgroundColor: '#1E1E2F' }} className="min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <Brain className="mx-auto h-12 w-12 text-white mb-4" />
            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl text-white">
              Gamified Learning Zone
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-gray-300 md:text-xl">
              Learn while you play! Select a game to get started.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {games.map((game, index) => (
              <AccordionItem 
                value={`item-${index}`} 
                key={game.title}
                className="border-b-0"
              >
                <Card 
                  className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 fade-in-up"
                  style={{ animationDelay: `${index * 100}ms`, backgroundColor: '#2A2A3E', borderColor: '#3A3A4F' }}
                >
                  <AccordionTrigger className="w-full p-0 hover:no-underline">
                    <CardHeader className="flex flex-row items-center justify-between p-6 w-full">
                      <div className="flex items-center gap-4 text-left">
                        <div className="p-3 rounded-lg" style={{ backgroundColor: `${game.buttonColor}20` }}>
                          <game.icon className="h-6 w-6" style={{ color: game.buttonColor }} />
                        </div>
                        <div>
                          <CardTitle className="font-headline text-lg text-white">{game.title}</CardTitle>
                          <p className="text-sm text-gray-400">{game.description}</p>
                        </div>
                      </div>
                      <Button asChild style={{ backgroundColor: game.buttonColor, color: 'white' }} className="shrink-0">
                        <Link href={game.href}>
                            Play
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardHeader>
                  </AccordionTrigger>
                  <AccordionContent>
                    <CardContent className="px-6 pb-6">
                        <h4 className="font-bold text-white mb-4">Leaderboard</h4>
                        <div className="space-y-3">
                            {game.leaderboard.map(player => (
                                <div 
                                    key={player.rank} 
                                    className={cn(
                                        "flex items-center justify-between p-3 rounded-md bg-[#3A3A4F]/50",
                                        player.rank === 1 && "relative overflow-hidden bg-gradient-to-r from-yellow-500/10 to-yellow-400/10 animate-shine"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <Trophy className={cn("h-5 w-5", rankColors[player.rank as keyof typeof rankColors])}/>
                                        <span className="font-medium text-white">{player.name}</span>
                                    </div>
                                    <Badge variant="secondary" style={{ backgroundColor: `${game.buttonColor}40`, color: game.buttonColor }}>{player.score} PTS</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
}
