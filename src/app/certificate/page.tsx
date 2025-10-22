'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Check, Download, BookOpen, Trophy, ListChecks, Star } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Course = {
  id: string;
  name: string;
  imageId: string;
};

type Certificate = {
    courseId: string;
    courseName: string;
    awardedOn: Date;
}

export default function CertificatePage() {
    const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const certificateImage = PlaceHolderImages.find(img => img.id === 'certificate-template');

    useEffect(() => {
        try {
            const savedPurchases = localStorage.getItem('purchasedCourses');
            if (savedPurchases) {
                setPurchasedCourses(JSON.parse(savedPurchases));
            }
            const savedCerts = localStorage.getItem('edunex-certificates');
            if (savedCerts) {
                setCertificates(JSON.parse(savedCerts).map((c: any) => ({...c, awardedOn: new Date(c.awardedOn)})));
            }
        } catch (error) {
            console.error("Failed to load data from localStorage", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleAwardCertificate = (course: Course) => {
        const newCertificate: Certificate = {
            courseId: course.id,
            courseName: course.name,
            awardedOn: new Date(),
        };
        const updatedCerts = [...certificates, newCertificate];
        setCertificates(updatedCerts);
        localStorage.setItem('edunex-certificates', JSON.stringify(updatedCerts));
    }
    
    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-dashed border-primary"></div>
                    <p className="text-muted-foreground">Loading your certificate status...</p>
                </div>
            </div>
        )
    }

  return (
    <>
      <Header />
      <main className="flex-1 py-12 bg-muted/40">
        <div className="container max-w-7xl">
            <div className="text-center mb-12">
                <Award className="mx-auto h-12 w-12 text-primary mb-4" />
                <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
                    Certificates
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                    Complete your course tasks to earn and download your certificates.
                </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {purchasedCourses.length > 0 ? purchasedCourses.map(course => {
                        const certificate = certificates.find(c => c.courseId === course.id);
                        return (
                            <Card key={course.id} className="shadow-lg">
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl">{course.name}</CardTitle>
                                    <CardDescription>Complete the final assessment to receive your certificate of completion.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {certificate ? (
                                        <div className="p-4 border-2 border-dashed rounded-lg text-center bg-green-500/5">
                                            {certificateImage && (
                                                <Image 
                                                    src={certificateImage.imageUrl} 
                                                    alt={`Certificate for ${course.name}`}
                                                    data-ai-hint={certificateImage.imageHint}
                                                    width={400} 
                                                    height={250}
                                                    className="mx-auto rounded-md shadow-md"
                                                />
                                            )}
                                            <p className="mt-4 font-semibold text-green-600">
                                                Congratulations! You earned this certificate on {certificate.awardedOn.toLocaleDateString()}.
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground">Status: Task Not Completed</p>
                                    )}
                                </CardContent>
                                <CardFooter>
                                    {certificate ? (
                                        <a href={certificateImage?.imageUrl} download={`Certificate-${course.id}.jpg`}>
                                            <Button>
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Certificate
                                            </Button>
                                        </a>
                                    ) : (
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="secondary">Complete Task & Get Certificate</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Are you ready to complete the task?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will mark the final task for "{course.name}" as complete. You will be awarded a certificate upon confirmation. This action cannot be undone.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleAwardCertificate(course)}>Confirm & Get Certificate</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    )}
                                </CardFooter>
                            </Card>
                        )
                    }) : (
                        <div className="text-center py-16 text-muted-foreground rounded-lg border-2 border-dashed col-span-full">
                            <BookOpen className="mx-auto h-12 w-12 mb-4" />
                            <h3 className="text-lg font-semibold">No Courses Purchased</h3>
                            <p>Purchase a course from the EduStore to start earning certificates.</p>
                        </div>
                    )}
                </div>
                
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ListChecks className="h-6 w-6 text-primary"/>
                                <span>Selected Courses</span>
                            </CardTitle>
                             <CardDescription>Courses you have enrolled in.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           {purchasedCourses.length > 0 ? (
                                <ul className="space-y-3">
                                {purchasedCourses.map(course => {
                                    const hasCert = certificates.some(c => c.courseId === course.id);
                                    return (
                                    <li key={course.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                                        <span className="font-medium text-sm">{course.name}</span>
                                        {hasCert ? (
                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                        ) : (
                                            <div className="h-4 w-4" />
                                        )}
                                    </li>
                                )})}
                            </ul>
                           ) : (
                            <p className="text-sm text-muted-foreground">No courses selected yet.</p>
                           )}
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
      </main>
    </>
  );
}
