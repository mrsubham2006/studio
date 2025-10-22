
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';

type Course = {
  id: string;
  name: string;
  price: number;
  imageId: string;
  quantity: number;
};

const allSchedules = [
  { courseId: 'course-phy-12', day: 'Monday', time: '09:00 - 10:00', subject: 'Physics', teacher: 'Dr. Sharma' },
  { courseId: 'course-jee-math', day: 'Monday', time: '10:00 - 11:00', subject: 'Mathematics', teacher: 'Prof. Gupta' },
  { courseId: 'course-chem-12', day: 'Tuesday', time: '11:00 - 12:00', subject: 'Chemistry', teacher: 'Dr. Verma' },
  { courseId: 'cse-dsa', day: 'Wednesday', time: '09:00 - 10:00', subject: 'Data Structures', teacher: 'Prof. Singh' },
  { courseId: 'course-phy-12', day: 'Wednesday', time: '14:00 - 16:00', subject: 'Physics Lab', teacher: 'Dr. Sharma' },
  { courseId: 'course-jee-math', day: 'Thursday', time: '10:00 - 11:00', subject: 'Mathematics', teacher: 'Prof. Gupta' },
  { courseId: 'course-chem-12', day: 'Friday', time: '11:00 - 12:00', subject: 'Chemistry', teacher: 'Dr. Verma' },
  { courseId: 'cse-dsa', day: 'Friday', time: '13:00 - 15:00', subject: 'Algorithm Lab', teacher: 'Prof. Singh' },
  { courseId: 'course-neet-bio', day: 'Tuesday', time: '09:00 - 11:00', subject: 'Biology', teacher: 'Dr. Priya Verma' },
  { courseId: 'course-neet-bio', day: 'Thursday', time: '14:00 - 16:00', subject: 'Biology Lab', teacher: 'Dr. Priya Verma' },
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function TimetablePage() {
    const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const savedPurchases = localStorage.getItem('purchasedCourses');
            if (savedPurchases) {
                setPurchasedCourses(JSON.parse(savedPurchases));
            }
        } catch (error) {
            console.error("Failed to load purchased courses from localStorage", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const userSchedule = purchasedCourses.length > 0
        ? allSchedules.filter(schedule => purchasedCourses.some(course => course.id === schedule.courseId))
        : [];
    
    if (isLoading) {
        return (
            <>
                <Header />
                 <div className="flex h-screen w-full items-center justify-center bg-background">
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-dashed border-primary"></div>
                        <p className="text-muted-foreground">Loading your schedule...</p>
                    </div>
                </div>
            </>
        )
    }

  return (
    <>
    <Header />
    <div className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur">
        <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between p-4">
          <div className="flex items-center gap-3">
              <Calendar className="h-7 w-7 text-primary" />
              <h1 className="text-xl font-bold font-headline">My Class Time Table</h1>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto p-4 py-8">
        <Card>
          <CardContent className="p-4 md:p-6">
            {purchasedCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {daysOfWeek.map(day => (
                    <div key={day}>
                    <h3 className="text-lg font-semibold text-center mb-4 p-2 bg-muted rounded-md">{day}</h3>
                    <div className="space-y-3">
                        {userSchedule.filter(item => item.day === day).length > 0 ? (
                            userSchedule.filter(item => item.day === day).map(item => (
                            <div key={`${'\'\''}${day}-${item.time}-${item.subject}${'\'\''}`} className="p-3 border rounded-lg bg-background shadow-sm">
                                <p className="font-bold">{item.subject}</p>
                                <p className="text-sm text-muted-foreground">{item.teacher}</p>
                                <Badge variant="outline" className="mt-2">{item.time}</Badge>
                            </div>
                            ))
                        ) : (
                            <div className="p-3 border-dashed border-2 rounded-lg text-center text-muted-foreground text-sm h-24 flex items-center justify-center">
                                No classes today!
                            </div>
                        )
                        }
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="text-center py-16 text-muted-foreground rounded-lg">
                    <ShoppingCart className="mx-auto h-12 w-12 mb-4" />
                    <h3 className="text-lg font-semibold">Your time table is empty!</h3>
                    <p>Purchase courses to see your schedule here.</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/edustore">Explore Courses</Link>
                    </Button>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
    </>
  );
}
