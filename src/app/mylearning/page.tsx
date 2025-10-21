
'use client';

import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookCopy, CheckCircle } from 'lucide-react';

const mockMyLearning = [
    { title: 'Mastering Physics for Class 12', progress: 75, imageId: 'course-physics' },
    { title: 'JEE Advanced Calculus', progress: 40, imageId: 'course-maths' },
    { title: 'Data Structures & Algorithms', progress: 90, imageId: 'cse-dsa' },
    { title: 'NEET Biology Crash Course', progress: 100, imageId: 'course-biology' },
];

export default function MyLearningPage() {
    return (
        <div className="flex-1 bg-muted/40">
            <Header />
            <main className="flex-1 py-8">
                <div className="container max-w-5xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                            <BookCopy className="h-8 w-8 text-primary" />
                            My Learning
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Continue your learning journey and track your progress.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {mockMyLearning.map((course, index) => (
                            <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <CardHeader>
                                    <CardTitle className="font-headline text-lg">{course.title}</CardTitle>
                                    <CardDescription>
                                        {course.progress === 100 ? (
                                            <span className="flex items-center text-green-600 font-semibold">
                                                <CheckCircle className="h-4 w-4 mr-1.5" />
                                                Completed
                                            </span>
                                        ) : (
                                            `You've completed ${course.progress}% of this course.`
                                        )}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col justify-end">
                                    <Progress value={course.progress} className="h-2" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    )
}
