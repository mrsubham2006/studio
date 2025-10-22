
'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BrainCircuit, Puzzle, Target, Brain, Code, Divide } from 'lucide-react';
import Link from 'next/link';

const games = [
  {
    title: 'Quiz Quest',
    description: 'Answer 5 random questions from your course topics and earn points.',
    icon: Target,
    buttonColor: '#00BFA6',
  },
  {
    title: 'Word Match',
    description: 'Drag and drop words to match them with their correct meanings.',
    icon: Puzzle,
    buttonColor: '#00BFA6',
  },
  {
    title: 'Memory Challenge',
    description: 'A flip-card memory game with course keywords and concepts.',
    icon: BrainCircuit,
    buttonColor: '#00BFA6',
  },
  {
    title: 'Code Rush',
    description: 'Complete short code snippets by choosing the correct piece.',
    icon: Code,
    buttonColor: '#00BFA6',
  },
  {
    title: 'Math Sprint',
    description: 'Timed arithmetic questions that get faster as you answer correctly.',
    icon: Divide,
    buttonColor: '#00BFA6',
  },
];

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

          <div className="grid gap-6">
            {games.map((game, index) => (
              <Card 
                key={game.title}
                className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, backgroundColor: '#2A2A3E', borderColor: '#3A3A4F' }}
              >
                <CardHeader className="flex flex-row items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${game.buttonColor}20` }}>
                      <game.icon className="h-6 w-6" style={{ color: game.buttonColor }} />
                    </div>
                    <div>
                      <CardTitle className="font-headline text-lg text-white">{game.title}</CardTitle>
                      <p className="text-sm text-gray-400">{game.description}</p>
                    </div>
                  </div>
                  <Button style={{ backgroundColor: game.buttonColor, color: 'white' }} className="shrink-0">
                    Play
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
