
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, GraduationCap, Microscope, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

const courseCategories = [
  {
    title: 'Class 1st to 10th',
    description: 'Comprehensive courses for school-level subjects.',
    icon: Book,
    href: '/courses/school',
  },
  {
    title: 'Engineering',
    description: 'Courses for various engineering disciplines.',
    icon: GraduationCap,
    href: '/courses/engineering/cse',
  },
  {
    title: 'Pharmacy',
    description: 'Specialized courses for pharmacy students.',
    icon: Microscope,
    href: '/courses/pharmacy',
  },
  {
    title: 'Others',
    description: 'Competitive exams, and other specialized courses.',
    icon: MoreHorizontal,
    href: '/edustore?category=Competitive%20Exams',
  },
];

export default function AllCoursesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-12 bg-muted/40">
        <div className="container max-w-5xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">
                Explore Our Courses
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                Choose a category to start your learning journey.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {courseCategories.map((category, index) => (
                <Link href={category.href} key={index} className="block hover:no-underline">
                    <Card className="h-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center p-8">
                        <CardHeader className="p-0 items-center">
                            <div className="p-4 bg-primary/10 rounded-full mb-4">
                                <category.icon className="h-10 w-10 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-2xl">{category.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 mt-2">
                            <p className="text-muted-foreground">{category.description}</p>
                        </CardContent>
                    </Card>
                </Link>
                ))}
            </div>
        </div>
      </main>
    </>
  );
}
