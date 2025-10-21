
'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, MapPin, Trophy, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Mock data - in a real app, this would be fetched from a database
const mockActivities = [
    { 
        id: 'workshop-ai', 
        title: 'AI & Machine Learning Workshop', 
        description: 'Join us for a hands-on workshop on the fundamentals of AI and Machine Learning. Learn to build your first model from scratch, guided by industry experts. No prior experience required!',
        date: '2024-08-25',
        time: '10:00 AM - 4:00 PM',
        venue: 'Main Auditorium',
        imageId: 'activity-workshop'
    },
    { 
        id: 'hackathon-24', 
        title: 'InnovateX Hackathon 2024',
        description: 'A 24-hour coding marathon to solve real-world problems using technology. Form a team, build a project, and present to a panel of judges. Exciting prizes and internship opportunities to be won!',
        date: '2024-09-05',
        time: 'Starts 9:00 AM',
        venue: 'CSE Department Labs (Block C)',
        imageId: 'activity-hackathon'
    },
    { 
        id: 'robotics-expo', 
        title: 'Robotics Expo',
        description: 'Witness the future of automation. A showcase of student-built robots, drones, and automation projects. Come see live demonstrations and interact with the creators.',
        date: '2024-09-12',
        time: '11:00 AM - 3:00 PM',
        venue: 'Central Quadrangle',
        imageId: 'activity-robotics'
    },
];

export default function ActivityDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const activityId = params.id;

    const activity = mockActivities.find(a => a.id === activityId);
    const activityImage = activity ? PlaceHolderImages.find(img => img.id === activity.imageId) : null;
    
    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegister = () => {
        setIsRegistered(true);
        toast({
            title: "Registration Successful!",
            description: `You have been registered for ${activity?.title}.`,
        });
    };

    if (!activity) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="text-center">
                    <Trophy className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h1 className="mt-4 text-2xl font-bold">Activity Not Found</h1>
                    <p className="text-muted-foreground">The activity you are looking for does not exist.</p>
                    <Button onClick={() => router.back()} className="mt-6">Go Back</Button>
                </div>
            </div>
        );
    }

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
                            <Trophy className="h-7 w-7 text-primary" />
                            <h1 className="text-xl font-bold font-headline truncate">{activity.title}</h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container max-w-5xl mx-auto p-4 py-8">
                <Card className="overflow-hidden">
                    {activityImage && (
                        <div className="relative h-64 w-full">
                            <Image
                                src={activityImage.imageUrl}
                                alt={activity.title}
                                data-ai-hint={activityImage.imageHint}
                                layout="fill"
                                objectFit="cover"
                                className="bg-muted"
                            />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline">{activity.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-lg text-muted-foreground">
                            {activity.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg border p-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-6 w-6 text-primary" />
                                <div>
                                    <h4 className="font-semibold">Date</h4>
                                    <p className="text-muted-foreground">{activity.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="h-6 w-6 text-primary" />
                                <div>
                                    <h4 className="font-semibold">Time</h4>
                                    <p className="text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-6 w-6 text-primary" />
                                <div>
                                    <h4 className="font-semibold">Venue</h4>
                                    <p className="text-muted-foreground">{activity.venue}</p>
                                </div>
                            </div>
                        </div>
                         <div className="text-center pt-4">
                            <Button size="lg" onClick={handleRegister} disabled={isRegistered}>
                                {isRegistered ? (
                                    <>
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Registered
                                    </>
                                ) : (
                                    'Register Now'
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
