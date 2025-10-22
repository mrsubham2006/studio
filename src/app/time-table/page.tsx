
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';

const mockTimetable = [
  { day: 'Monday', time: '09:00 - 10:00', subject: 'Physics', teacher: 'Dr. Sharma' },
  { day: 'Monday', time: '10:00 - 11:00', subject: 'Mathematics', teacher: 'Prof. Gupta' },
  { day: 'Tuesday', time: '11:00 - 12:00', subject: 'Chemistry', teacher: 'Dr. Verma' },
  { day: 'Wednesday', time: '09:00 - 10:00', subject: 'Computer Science', teacher: 'Prof. Singh' },
  { day: 'Wednesday', time: '14:00 - 16:00', subject: 'Physics Lab', teacher: 'Dr. Sharma' },
  { day: 'Thursday', time: '10:00 - 11:00', subject: 'Mathematics', teacher: 'Prof. Gupta' },
  { day: 'Friday', time: '11:00 - 12:00', subject: 'Chemistry', teacher: 'Dr. Verma' },
  { day: 'Friday', time: '13:00 - 15:00', subject: 'Computer Science Lab', teacher: 'Prof. Singh' },
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function TimetablePage() {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-muted/40">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur">
        <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between p-4">
          <div className="flex items-center gap-3">
              <Calendar className="h-7 w-7 text-primary" />
              <h1 className="text-xl font-bold font-headline">Class Time Table</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto p-4 py-8">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {daysOfWeek.map(day => (
                <div key={day}>
                  <h3 className="text-lg font-semibold text-center mb-4 p-2 bg-muted rounded-md">{day}</h3>
                  <div className="space-y-3">
                    {mockTimetable.filter(item => item.day === day).length > 0 ? (
                        mockTimetable.filter(item => item.day === day).map(item => (
                        <div key={`${'\'\''}${day}-${item.time}${'\'\''}`} className="p-3 border rounded-lg bg-background shadow-sm">
                            <p className="font-bold">{item.subject}</p>
                            <p className="text-sm text-muted-foreground">{item.teacher}</p>
                            <Badge variant="outline" className="mt-2">{item.time}</Badge>
                        </div>
                        ))
                    ) : (
                        <div className="p-3 border-dashed border-2 rounded-lg text-center text-muted-foreground text-sm h-24 flex items-center justify-center">
                            No classes
                        </div>
                    )
                    }
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
    </>
  );
}
