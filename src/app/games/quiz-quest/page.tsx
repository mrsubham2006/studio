
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Check, X, Award, Target, Trophy, RotateCw, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const quizQuestions = [
  {
    question: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondrion', 'Ribosome', 'Chloroplast'],
    answer: 'Mitochondrion',
  },
  {
    question: 'In React, what hook is used to manage state?',
    options: ['useEffect', 'useState', 'useContext', 'useReducer'],
    answer: 'useState',
  },
  {
    question: 'What is the value of `x` after `let x = 10; x += 5;`?',
    options: ['5', '10', '15', '20'],
    answer: '15',
  },
  {
    question: 'Which of these is not a primary color?',
    options: ['Red', 'Yellow', 'Blue', 'Green'],
    answer: 'Green',
  },
  {
    question: 'What is the capital of Japan?',
    options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'],
    answer: 'Tokyo',
  },
];

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export default function QuizQuestPage() {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Preload audio for better performance
    new Audio('/sounds/correct.mp3');
    new Audio('/sounds/incorrect.mp3');
  }, []);

  const playSound = (sound: 'correct' | 'incorrect') => {
    new Audio(`/sounds/${sound}.mp3`).play();
  };

  const handleAnswer = (option: string) => {
    if (answerState !== 'unanswered') return;

    setSelectedAnswer(option);
    if (option === quizQuestions[currentQuestionIndex].answer) {
      setAnswerState('correct');
      setScore(s => s + 10);
      playSound('correct');
      toast({ title: "Correct!", description: "+10 points", duration: 1500 });
    } else {
      setAnswerState('incorrect');
      playSound('incorrect');
      toast({ title: "Incorrect!", variant: 'destructive', description: "Better luck next time.", duration: 1500 });
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
        setAnswerState('unanswered');
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswerState('unanswered');
    setIsFinished(false);
  };
  
  const progress = ((currentQuestionIndex + (isFinished ? 1 : 0)) / quizQuestions.length) * 100;

  return (
    <div style={{ backgroundColor: '#1E1E2F' }} className="min-h-screen text-white">
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-3xl">
          <Button variant="ghost" asChild className="mb-4 text-gray-300 hover:text-white">
            <Link href="/games" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Games
            </Link>
          </Button>

          <Card className="bg-[#2A2A3E] border-[#3A3A4F] shadow-2xl">
            <CardHeader className="text-center">
              <Target className="mx-auto h-12 w-12 text-[#00BFA6] mb-2" />
              <CardTitle className="text-3xl font-headline">Quiz Quest</CardTitle>
              <div className="flex items-center justify-between text-lg mt-4">
                <p>Question: <span className="font-bold">{currentQuestionIndex + 1} / {quizQuestions.length}</span></p>
                <p>Score: <span className="font-bold">{score}</span></p>
              </div>
              <Progress value={progress} className="mt-2 h-2 [&>div]:bg-[#00BFA6]" />
            </CardHeader>
            <CardContent>
              {isFinished ? (
                <div className="text-center py-8 fade-in-up">
                  <Award className="mx-auto h-16 w-16 text-yellow-400 mb-4"/>
                  <h2 className="text-4xl font-bold font-headline">Quiz Complete!</h2>
                  <p className="text-2xl mt-2 text-gray-300">Your Final Score: <span className="font-bold text-white">{score}</span></p>
                  
                  <Card className="mt-8 bg-[#1E1E2F] border-[#3A3A4F]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 justify-center"><Trophy className="text-yellow-500"/>Leaderboard</CardTitle>
                        <CardDescription>Top scores from players.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-gray-400">
                        <p>(Leaderboard feature coming soon)</p>
                    </CardContent>
                  </Card>

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
                <div className="space-y-6">
                  <p className="text-center text-xl min-h-[60px] flex items-center justify-center text-white">
                    {quizQuestions[currentQuestionIndex].question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quizQuestions[currentQuestionIndex].options.map((option, i) => {
                      const isCorrect = option === quizQuestions[currentQuestionIndex].answer;
                      const isSelected = option === selectedAnswer;
                      
                      return (
                        <Button
                          key={i}
                          onClick={() => handleAnswer(option)}
                          disabled={answerState !== 'unanswered'}
                          className={cn(
                            "h-auto py-4 text-lg whitespace-normal justify-start transition-all duration-300 transform",
                            "bg-[#3A3A4F] hover:bg-[#4a4a6a]",
                            answerState !== 'unanswered' && isCorrect && "bg-green-500 hover:bg-green-500 scale-105",
                            answerState === 'incorrect' && isSelected && "bg-red-500 hover:bg-red-500"
                          )}
                        >
                          <div className="flex items-center w-full">
                            <div className={cn(
                                "flex items-center justify-center h-6 w-6 rounded-full mr-3",
                                "bg-[#1E1E2F] border-2 border-[#00BFA6]",
                                answerState !== 'unanswered' && isCorrect && "bg-white border-green-500",
                                answerState === 'incorrect' && isSelected && "bg-white border-red-500"
                            )}>
                                {answerState !== 'unanswered' && isCorrect && <Check className="h-4 w-4 text-green-500" />}
                                {answerState === 'incorrect' && isSelected && <X className="h-4 w-4 text-red-500" />}
                            </div>
                            <span>{option}</span>
                          </div>
                        </Button>
                      )
                    })}
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
