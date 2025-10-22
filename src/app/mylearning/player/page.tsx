
'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Film } from 'lucide-react';
import Link from 'next/link';

export default function VideoPlayerPage() {

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('?si=')[0].split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  }
  const videoUrl = "https://youtu.be/Hb9QvSODBPY?si=8ZMfeZ8EohAVaZZC";

  return (
    <div className="flex-1 bg-muted/40 min-h-screen">
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/mylearning" className="flex items-center gap-2 text-muted-foreground">
                        <ArrowLeft className="h-4 w-4" />
                        Back to My Learning
                    </Link>
                </Button>
            </div>

            <Card className="overflow-hidden">
                <div className="aspect-video bg-black">
                     <iframe
                        className="w-full h-full"
                        src={getYouTubeEmbedUrl(videoUrl)}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
                <CardHeader>
                    <CardTitle className="text-2xl font-headline flex items-center gap-3">
                        <Film className="h-6 w-6 text-primary" />
                        Data Structures & Algorithms
                    </CardTitle>
                    <CardDescription>Lecture 1: Introduction to Data Structures</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Welcome to the first lecture. In this video, we will cover the fundamental concepts of data structures, why they are important, and the different types of data structures you will learn about in this course.
                    </p>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
