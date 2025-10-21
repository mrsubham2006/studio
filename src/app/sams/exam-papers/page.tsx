
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Film } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExamPapersPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur">
        <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/sams/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to Dashboard</span>
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <FileText className="h-7 w-7 text-primary" />
              <h1 className="text-xl font-bold font-headline">Exam Papers</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-5xl mx-auto p-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Sample Technical Questions Video</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="https://www.youtube.com/watch?v=M2N3tm9pA78" target="_blank" rel="noopener noreferrer">
                <div className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group border">
                    <Image
                    src="https://i.ytimg.com/vi/M2N3tm9pA78/hq720.jpg"
                    alt="Sample video for technical questions"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Film className="h-12 w-12 text-white" />
                    </div>
                </div>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
