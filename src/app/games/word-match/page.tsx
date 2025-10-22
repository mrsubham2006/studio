
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Puzzle, Grab, RotateCw, LayoutDashboard, Check, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const mockWords = [
    { word: 'Mitochondrion', definition: 'The powerhouse of the cell.' },
    { word: 'useState', definition: 'A React hook used to manage state.' },
    { word: 'Variable', definition: 'A storage location with a symbolic name.' },
    { word: 'Photosynthesis', definition: 'Process used by plants to convert light into energy.' },
];

// Simple shuffle function
const shuffleArray = (array: any[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const shuffledDefinitions = shuffleArray([...mockWords.map(w => w.definition)]);

export default function WordMatchPage() {
    const { toast } = useToast();
    const [score, setScore] = useState(0);
    const [matchedCount, setMatchedCount] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    
    // In a real app, this would be complex state for drag & drop
    const [matches, setMatches] = useState<Record<string, string | null>>({});

    const handleMatch = (word: string, definition: string) => {
        // This is a mock function to simulate a correct match
        const correctDefinition = mockWords.find(w => w.word === word)?.definition;
        if (correctDefinition === definition && !matches[word]) {
            setMatches(prev => ({ ...prev, [word]: definition }));
            setScore(s => s + 10);
            setMatchedCount(mc => mc + 1);
            toast({ title: "Correct Match!", description: "+10 points", duration: 1500 });
            if (matchedCount + 1 === mockWords.length) {
                setIsFinished(true);
            }
        } else if (matches[word]) {
            toast({ title: "Already Matched!", variant: 'destructive', description: "This word has already been matched.", duration: 1500 });
        } else {
             toast({ title: "Incorrect Match!", variant: 'destructive', description: "Try again.", duration: 1500 });
        }
    };
    
    const handlePlayAgain = () => {
        setScore(0);
        setMatchedCount(0);
        setIsFinished(false);
        setMatches({});
    }

    const progress = (matchedCount / mockWords.length) * 100;

    return (
        <div style={{ backgroundColor: '#1E1E2F' }} className="min-h-screen text-white">
            <Header />
            <main className="flex-1 py-8">
                <div className="container max-w-4xl">
                    <Button variant="ghost" asChild className="mb-4 text-gray-300 hover:text-white">
                        <Link href="/games" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Games
                        </Link>
                    </Button>

                    <Card className="bg-[#2A2A3E] border-[#3A3A4F] shadow-2xl">
                        <CardHeader className="text-center">
                            <Puzzle className="mx-auto h-12 w-12 text-[#00BFA6] mb-2" />
                            <CardTitle className="text-3xl font-headline text-white">Word Match</CardTitle>
                            <div className="flex items-center justify-between text-lg mt-4 text-white">
                                <p>Matches: <span className="font-bold">{matchedCount} / {mockWords.length}</span></p>
                                <p>Score: <span className="font-bold">{score}</span></p>
                            </div>
                            <Progress value={progress} className="mt-2 h-2 [&>div]:bg-[#00BFA6]" />
                        </CardHeader>
                        <CardContent>
                            {isFinished ? (
                                <div className="text-center py-8 fade-in-up">
                                  <Trophy className="mx-auto h-16 w-16 text-yellow-400 mb-4"/>
                                  <h2 className="text-4xl font-bold font-headline text-white">Game Complete!</h2>
                                  <p className="text-2xl mt-2 text-gray-300">Your Final Score: <span className="font-bold text-white">{score}</span></p>
                                  <div className="mt-8 flex justify-center gap-4">
                                     <Button onClick={handlePlayAgain} style={{ backgroundColor: '#00BFA6', color: 'white' }} className="hover:bg-[#00a18e]">
                                       <RotateCw className="mr-2 h-4 w-4"/>
                                        Play Again
                                     </Button>
                                     <Button variant="outline" asChild className="border-[#00BFA6] text-[#00BFA6] hover:bg-[#00BFA6]/10 hover:text-white">
                                        <Link href="/games">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            More Games
                                        </Link>
                                     </Button>
                                  </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Words Column */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-center text-white">Words</h3>
                                        {mockWords.map(({ word }) => (
                                            <Card 
                                                key={word} 
                                                className={cn(
                                                    "bg-[#3A3A4F] p-4 flex items-center justify-between cursor-grab active:cursor-grabbing",
                                                    matches[word] && "bg-green-500/20 border-green-500"
                                                )}
                                            >
                                                <span className="font-medium text-white">{word}</span>
                                                {matches[word] ? <Check className="h-5 w-5 text-green-500" /> : <Grab className="h-5 w-5 text-gray-400" />}
                                            </Card>
                                        ))}
                                    </div>
                                    {/* Definitions Column */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-center text-white">Definitions</h3>
                                        {shuffledDefinitions.map((def, i) => (
                                            <Card key={i} className="bg-[#3A3A4F] border-2 border-dashed border-gray-500 p-4 min-h-[76px] flex items-center justify-center text-center text-gray-300">
                                                {/* This is a static representation */}
                                                <p>{def}</p>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
