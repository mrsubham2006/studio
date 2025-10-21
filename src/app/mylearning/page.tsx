
'use client';

import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookCopy, CheckCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartProvider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Mock progress for demo purposes
const mockProgress: { [key: string]: number } = {
    'course-phy-12': 75,
    'course-jee-math': 40,
    'cse-dsa': 90,
    'course-neet-bio': 100,
    'course-chem-12': 25,
    'mech-thermo': 55,
};

export default function MyLearningPage() {
    const { items: purchasedCourses } = useCart();

    return (
        <div className="flex-1 bg-muted/40 min-h-screen">
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

                    {purchasedCourses.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {purchasedCourses.map((course) => {
                                const courseImage = PlaceHolderImages.find(img => img.id === course.imageId);
                                const progress = mockProgress[course.id] || Math.floor(Math.random() * 81); // Random progress if not in mock
                                return (
                                <Link href={`/courses/${course.id}`} key={course.id} className="block hover:no-underline">
                                    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                                        {courseImage && (
                                            <Image
                                                src={courseImage.imageUrl}
                                                alt={course.name}
                                                data-ai-hint={courseImage.imageHint}
                                                width={400}
                                                height={200}
                                                className="object-cover w-full h-40"
                                            />
                                        )}
                                        <CardHeader>
                                            <CardTitle className="font-headline text-lg">{course.name}</CardTitle>
                                            <CardDescription>
                                                {progress === 100 ? (
                                                    <span className="flex items-center text-green-600 font-semibold">
                                                        <CheckCircle className="h-4 w-4 mr-1.5" />
                                                        Completed
                                                    </span>
                                                ) : (
                                                    `You've completed ${progress}% of this course.`
                                                )}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-1 flex flex-col justify-end">
                                            <Progress value={progress} className="h-2" />
                                        </CardContent>
                                    </Card>
                                </Link>
                                )
                            })}
                        </div>
                    ) : (
                         <div className="text-center py-16 text-muted-foreground rounded-lg border-2 border-dashed">
                            <ShoppingCart className="mx-auto h-12 w-12 mb-4" />
                            <h3 className="text-lg font-semibold">Your learning list is empty!</h3>
                            <p>Courses you purchase will appear here so you can track your progress.</p>
                            <Button variant="outline" className="mt-4" asChild>
                                <Link href="/edustore">Explore Courses</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
