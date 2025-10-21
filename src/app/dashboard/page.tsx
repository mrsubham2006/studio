'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { recommendContent } from '@/ai/flows/ai-powered-content-recommendation';
import type { RecommendContentInput, RecommendContentOutput } from '@/ai/flows/ai-powered-content-recommendation';
import { BarChart, BookCheck, Lightbulb, Target } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, Bar, BarChart as RechartsBarChart } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/firebase';
import Loading from './loading';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--primary))",
  },
} satisfies import('@/components/ui/chart').ChartConfig;

export default function DashboardPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const [recommendations, setRecommendations] = useState<RecommendContentOutput | null>(null);
    const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.replace('/login');
        }
    }, [user, isUserLoading, router]);

    // Mock student data for the AI recommendation flow
    const mockStudentData: RecommendContentInput = {
        studentId: user?.uid || 'student-123',
        quizResults: [
            { quizId: 'physics-01', score: 65, topic: 'Kinematics' },
            { quizId: 'chem-01', score: 85, topic: 'Stoichiometry' },
            { quizId: 'math-01', score: 50, topic: 'Integration' },
        ],
        learningHistory: ['course-chem-101'],
    };

    useEffect(() => {
        if(user) {
            setIsLoadingRecommendations(true);
            recommendContent(mockStudentData)
                .then(setRecommendations)
                .finally(() => setIsLoadingRecommendations(false));
        }
    }, [user]);
    
    const chartData = mockStudentData.quizResults;

  if (isUserLoading || !user) {
    return <Loading />;
  }

  return (
    <div className="bg-muted/40">
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-7xl">
            <div className='mb-8'>
                <h1 className="text-3xl font-bold font-headline">Welcome back, {user.displayName || 'Student'}!</h1>
                <p className='text-muted-foreground'>Here's a summary of your learning journey.</p>
            </div>
          
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
                        <BookCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">+1 this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">78%</div>
                        <p className="text-xs text-muted-foreground">Up 5% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">65%</div>
                        <Progress value={65} />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className='font-headline'>Recent Quiz Performance</CardTitle>
                        <CardDescription>Your scores on the latest quizzes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-64 w-full">
                            <RechartsBarChart accessibilityLayer data={chartData}>
                                <defs>
                                <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-score)" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="var(--color-score)" stopOpacity={0.1}/>
                                </linearGradient>
                                </defs>
                                <RechartsPrimitive.XAxis dataKey="topic" tickLine={false} axisLine={false} tickMargin={8} />
                                <RechartsPrimitive.YAxis domain={[0, 100]} unit="%" tickLine={false} axisLine={false} tickMargin={8}/>
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="score" fill="url(#fillScore)" radius={8} />
                            </RechartsBarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Lightbulb className="h-6 w-6 text-primary" />
                            <CardTitle className='font-headline'>AI Recommendations</CardTitle>
                        </div>
                        <CardDescription>Personalized suggestions to boost your learning.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {isLoadingRecommendations ? (
                            <div className="space-y-4">
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-16 w-full" />
                            </div>
                        ) : (
                            <>
                                {recommendations?.recommendedTopics?.length > 0 && (
                                    <div>
                                        <h4 className='font-semibold mb-2'>Topics to focus on</h4>
                                        <div className='space-y-2'>
                                        {recommendations.recommendedTopics.map(topic => (
                                            <div key={topic.topic} className='p-3 bg-muted rounded-md'>
                                                <p className='font-medium'>{topic.topic}</p>
                                                <p className='text-sm text-muted-foreground'>{topic.reason}</p>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                )}
                                <Separator />
                                {recommendations?.recommendedCourses?.length > 0 && (
                                    <div>
                                        <h4 className='font-semibold mb-2'>Suggested Courses</h4>
                                        <div className='space-y-2'>
                                        {recommendations.recommendedCourses.map(course => (
                                            <div key={course.courseId} className='p-3 bg-muted rounded-md'>
                                                <p className='font-medium'>{course.courseId}</p>
                                                <p className='text-sm text-muted-foreground'>{course.reason}</p>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}

// Re-exporting recharts components for server-side rendering
import * as RechartsPrimitive from 'recharts';
