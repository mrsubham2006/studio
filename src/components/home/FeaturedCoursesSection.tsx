import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BookOpen } from 'lucide-react';

const featuredCourses = [
  { id: 1, title: 'Mastering Physics for Class 12', subject: 'Physics', imageId: 'course-physics' },
  { id: 2, title: 'Organic Chemistry Made Easy', subject: 'Chemistry', imageId: 'course-chemistry' },
  { id: 3, title: 'Calculus for Beginners', subject: 'Mathematics', imageId: 'course-maths' },
  { id: 4, title: 'Introduction to B.Tech CS', subject: 'B.Tech', imageId: 'course-btech' },
];

export default function FeaturedCoursesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
            Featured Courses
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Explore our most popular courses, designed for excellence.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course, index) => {
            const courseImage = PlaceHolderImages.find(img => img.id === course.imageId);
            return (
              <Card key={course.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
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
        <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
                <Link href="/courses">View All Courses</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
