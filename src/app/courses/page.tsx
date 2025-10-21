'use client';

import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Book, Microscope, HardHat, MoreHorizontal, ChevronRight } from 'lucide-react';

const categories = [
  {
    name: 'Class 1st to 10th',
    href: '/courses/school',
    icon: Book,
    description: 'Comprehensive courses for school curriculum.',
  },
  {
    name: 'Engineering',
    href: '/courses/engineering',
    icon: HardHat,
    description: 'Explore various engineering branches.',
  },
  {
    name: 'Pharmacy',
    href: '/courses/pharmacy',
    icon: Microscope,
    description: 'Courses for pharmaceutical studies.',
  },
  {
    name: 'Others',
    href: '/courses/others',
    icon: MoreHorizontal,
    description: 'Discover a variety of other courses.',
  },
];

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container max-w-7xl py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">
              Explore Our Courses
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Choose a category to start your learning journey.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.name} href={category.href} passHref>
                  <Card className="p-6 flex items-center gap-6 hover:bg-muted hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold font-headline">{category.name}</h2>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
