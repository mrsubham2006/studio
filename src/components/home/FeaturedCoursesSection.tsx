'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BookOpen } from 'lucide-react';
import productData from '@/lib/products.json';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageId: string;
};

const defaultFeaturedCourseIds = ['course-phy-12', 'course-chem-12', 'cse-dsa', 'course-neet-bio'];

export default function FeaturedCoursesSection({ selectedClass }: { selectedClass: string | null }) {
    
    const allProducts: Product[] = productData.products;

    const featuredCourses = useMemo(() => {
        if (selectedClass) {
            const filteredByCategory = allProducts.filter(p => 
                p.category.toLowerCase().includes(selectedClass.toLowerCase())
            );

            if (filteredByCategory.length > 0) {
                return filteredByCategory.slice(0, 4);
            }
        }
        
        // Default to showing a curated list of popular courses if no class is selected or no matches are found
        return allProducts.filter(p => defaultFeaturedCourseIds.includes(p.id));

    }, [selectedClass, allProducts]);

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
            Featured Courses
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            {selectedClass ? `Top courses for ${selectedClass}` : 'Explore our most popular courses, designed for excellence.'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course, index) => {
            const courseImage = PlaceHolderImages.find(img => img.id === course.imageId);
            return (
              <Card 
                key={course.id} 
                className={cn(
                  "shine-on-hover flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 fade-in-up",
                )}
                style={{ animationDelay: `${index * 100}ms`}}
              >
                <CardHeader className="p-0">
                  {courseImage && (
                     <Link href={`/courses/${course.id}`}>
                        <Image
                        src={courseImage.imageUrl}
                        alt={course.name}
                        data-ai-hint={courseImage.imageHint}
                        width={400}
                        height={250}
                        className="object-cover w-full h-48"
                        />
                     </Link>
                  )}
                </CardHeader>
                <CardContent className="flex-1 p-6 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>{course.category}</span>
                  </div>
                  <CardTitle className="font-headline text-lg leading-tight h-12 overflow-hidden">
                     <Link href={`/courses/${course.id}`} className="hover:text-primary transition-colors">{course.name}</Link>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground h-10 overflow-hidden">{course.description}</p>
                   <p className="text-2xl font-bold text-primary pt-2">₹{course.price}</p>
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
