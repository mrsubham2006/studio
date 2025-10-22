

'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Film, BookOpen, CheckCircle, X, Download } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

const courseVideoData = {
    'cse-dsa': {
        title: 'Data Structures & Algorithms',
        description: 'Lecture 1: Introduction to Data Structures',
        videoUrl: 'https://youtu.be/Hb9QvSODBPY?si=8ZMfeZ8EohAVaZZC',
        notesUrl: 'https://drive.google.com/file/d/1z75J0qPI0WDgVrJ-701durmYMWWrBrvc/preview',
        icon: Film,
    },
    'course-math-10': {
        title: 'Foundation Mathematics Class 10',
        description: 'Live Session: Important Questions for Board Exams',
        videoUrl: 'https://www.youtube.com/live/zNMIK2vLHGM?si=T8ldKdmSZl-hSoTe',
        notesUrl: 'https://drive.google.com/file/d/1z75J0qPI0WDgVrJ-701durmYMWWrBrvc/preview',
        icon: BookOpen,
    },
    'course-phy-12': {
        title: 'Mastering Physics for Class 12',
        description: 'Chapter 1: Electric Charges and Fields',
        videoUrl: 'https://youtu.be/2Qie6DbS63o?si=bifiLy7IaGV-9Lb4',
        notesUrl: 'https://drive.google.com/file/d/1z75J0qPI0WDgVrJ-701durmYMWWrBrvc/preview',
        icon: Film,
    },
    'course-chem-12': {
        title: 'Organic Chemistry Made Easy',
        description: 'Lecture 1: Introduction to Organic Chemistry',
        videoUrl: 'https://youtu.be/-h0drKJnGrE?si=Y6fFnqLQYs0DxYEE',
        notesUrl: 'https://drive.google.com/file/d/1z75J0qPI0WDgVrJ-701durmYMWWrBrvc/preview',
        icon: Film,
    },
    'course-neet-bio': {
        title: 'NEET Biology Crash Course',
        description: 'Lecture 1: The Living World',
        videoUrl: 'https://youtu.be/vlfLv0fAWNI?si=lwcSbAz0he0T_JTM',
        notesUrl: 'https://drive.google.com/file/d/1z75J0qPI0WDgVrJ-701durmYMWWrBrvc/preview',
        icon: Film,
    },
    'course-sci-9': {
        title: 'Science for Class 9',
        description: 'Chapter 1: Matter in Our Surroundings',
        videoUrl: 'https://youtu.be/7Uy_yonHhAg?si=D7bATzaLsv6xNB8V',
        notesUrl: 'https://drive.google.com/file/d/1z75J0qPI0WDgVrJ-701durmYMWWrBrvc/preview',
        icon: BookOpen,
    },
    'course-eng-8': {
        title: 'English Grammar for Class 8',
        description: 'Chapter 1: The Sentence',
        videoUrl: 'https://youtu.be/bgHHZ4Arl4A?si=kZGbEScpOpN6uda2',
        notesUrl: 'https://drive.google.com/file/d/1z75J0qPI0WDgVrJ-701durmYMWWrBrvc/preview',
        icon: BookOpen,
    }
};

type CourseKeys = keyof typeof courseVideoData;

function VideoPlayer() {
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId') as CourseKeys | null;
    const [showNotes, setShowNotes] = useState(false);

    const data = courseId && courseVideoData[courseId] ? courseVideoData[courseId] : null;

    const getYouTubeEmbedUrl = (url: string) => {
        let videoId;
        if (url.includes('youtu.be')) {
             videoId = url.split('?si=')[0].split('/').pop();
        } else if (url.includes('youtube.com/live')) {
            videoId = url.split('/live/')[1].split('?')[0];
        } else {
             videoId = url.split('?v=')[1]?.split('&')[0];
        }
       
        return `https://www.youtube.com/embed/${videoId}`;
    };

    if (!data) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Video not found</CardTitle>
                    <CardDescription>The requested course video could not be loaded.</CardDescription>
                </CardHeader>
            </Card>
        )
    }
    
    const getGoogleDriveDownloadUrl = (url: string) => {
        const fileId = url.split('/d/')[1].split('/')[0];
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }

    const Icon = data.icon;

    return (
        <Card className="overflow-hidden">
            <div className="aspect-video bg-black">
                <iframe
                    className="w-full h-full"
                    src={getYouTubeEmbedUrl(data.videoUrl)}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    {data.title}
                </CardTitle>
                <CardDescription>{data.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Welcome to the lecture. In this video, we will cover the fundamental concepts of the topic.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                    <Button variant="outline" onClick={() => setShowNotes(!showNotes)}>
                       {showNotes ? <X className="mr-2 h-4 w-4" /> : <BookOpen className="mr-2 h-4 w-4" />}
                        {showNotes ? 'Close Notes' : 'View Notes'}
                    </Button>
                     <a href={getGoogleDriveDownloadUrl(data.notesUrl)} download target="_blank" rel="noopener noreferrer">
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download Notes
                        </Button>
                    </a>
                    <Button>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Complete
                    </Button>
                </div>
                {showNotes && (
                    <div className="mt-6 border rounded-lg overflow-hidden">
                         <iframe
                            src={data.notesUrl}
                            className="w-full h-[600px]"
                            title="Course Notes PDF"
                        ></iframe>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}


export default function VideoPlayerPage() {
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
            <Suspense fallback={<div>Loading video...</div>}>
                <VideoPlayer />
            </Suspense>
        </div>
      </main>
    </div>
  );
}
