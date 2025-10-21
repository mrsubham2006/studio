import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Search } from 'lucide-react';

const allCourses = [
  { id: 1, title: 'Mastering Physics for Class 12', subject: 'Physics', imageId: 'course-physics' },
  { id: 2, title: 'Organic Chemistry Made Easy', subject: 'Chemistry', imageId: 'course-chemistry' },
  { id: 3, title: 'Calculus for Beginners', subject: 'Mathematics', imageId: 'course-maths' },
  { id: 4, title: 'The World of Biology', subject: 'Biology', imageId: 'course-biology' },
  { id: 5, title: 'Introduction to B.Tech CS', subject: 'B.Tech', imageId: 'course-btech' },
  { id: 6, title: 'Diploma in Electrical Eng.', subject: 'Diploma', imageId: 'course-diploma' },
  { id: 7, title: 'Advanced Physics Concepts', subject: 'Physics', imageId: 'course-physics' },
  { id: 8, title: 'Inorganic Chemistry', subject: 'Chemistry', imageId: 'course-chemistry' },
];

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container max-w-7xl py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">
              All Courses
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Find the perfect course to excel in your studies.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search for courses..." className="pl-9 h-12" />
            </div>
            {/* Add more filters like dropdowns for class and subject here */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allCourses.map((course) => {
              const courseImage = PlaceHolderImages.find(img => img.id === course.imageId);
              return (
                <Card key={course.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                  <CardHeader className="p-0">
                    {courseImage && (
                      <Image
                        src={courseImage.imageUrl}
                        alt={courseImage.description}
                        data-ai-hint={courseImage.imageHint}
                        width={400}
                        height={250}
                        className="object-cover w-full h-48"
                      />
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 p-6">
                    <CardTitle className="font-headline text-lg leading-tight mb-2">{course.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span>{course.subject}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button asChild className="w-full">
                      <Link href={`/courses/${course.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
