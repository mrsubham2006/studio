'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import productData from '@/lib/products.json';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Search } from 'lucide-react';
import { cn } from '@/lib/utils';


const allCourses = productData.products;

const categories = [
  "All",
  "Class 1st-8th",
  "Class 9th",
  "Class 10th",
  "Class 12th",
  "JEE",
  "NEET",
  "Competitive Exams",
];

const categoryMap: { [key: string]: string[] } = {
  "All": allCourses.map(c => c.category),
  "Class 1st-8th": ["Class 8th"], // Simplified for demo
  "Class 9th": ["Class 9th"],
  "Class 10th": ["Class 10th"],
  "Class 12th": ["Class 12th"],
  "JEE": ["JEE"],
  "NEET": ["NEET"],
  "Competitive Exams": ["Competitive Exams"],
};


export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCourses = allCourses.filter(course => {
    const termMatch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = activeCategory === 'All' || categoryMap[activeCategory].includes(course.category);
    return termMatch && categoryMatch;
  });

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
              <Input
                placeholder="Search for courses..."
                className="pl-9 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => {
              const courseImage = PlaceHolderImages.find(img => img.id === course.imageId);
              return (
                <Card key={course.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                  <CardHeader className="p-0">
                    {courseImage && (
                      <Image
                        src={courseImage.imageUrl}
                        alt={course.name}
                        data-ai-hint={courseImage.imageHint}
                        width={400}
                        height={250}
                        className="object-cover w-full h-48"
                      />
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 p-6">
                    <CardTitle className="font-headline text-lg leading-tight mb-2 h-14 overflow-hidden">{course.title || course.name}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span>{course.category}</span>
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

          {filteredCourses.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
                <p className='text-lg font-semibold'>No courses found</p>
                <p>Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
