
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Wrench, HardHat, Zap, CircuitBoard, Pickaxe, GraduationCap } from 'lucide-react';
import Link from 'next/link';

const engineeringBranches = [
  {
    title: 'Computer Science (CSE)',
    description: 'Dive into algorithms, data structures, and software development.',
    icon: Code,
    href: '/courses/engineering/cse',
  },
  {
    title: 'Mechanical Engineering',
    description: 'Explore mechanics, thermodynamics, and machine design.',
    icon: Wrench,
    href: '/courses/engineering/mechanical',
  },
  {
    title: 'Civil Engineering',
    description: 'Learn about structural design, construction, and infrastructure.',
    icon: HardHat,
    href: '/courses/engineering/civil',
  },
  {
    title: 'Electrical Engineering',
    description: 'Master circuits, power systems, and electronics.',
    icon: Zap,
    href: '/courses/engineering/electrical',
  },
  {
    title: 'Electronics & Communication (ECE)',
    description: 'Focus on communication systems, semiconductors, and embedded systems.',
    icon: CircuitBoard,
    href: '/courses/engineering/ece',
  },
  {
    title: 'Mining Engineering',
    description: 'Discover the science of extracting valuable minerals from the earth.',
    icon: Pickaxe,
    href: '/courses/engineering/mining',
  },
];

export default function EngineeringPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-12 bg-muted/40">
        <div className="container max-w-5xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl flex items-center justify-center gap-4">
                    <GraduationCap className="h-10 w-10 text-primary" />
                    Engineering Disciplines
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                Choose your branch to find specialized courses.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {engineeringBranches.map((branch, index) => (
                <Link href={branch.href} key={index} className="block hover:no-underline">
                    <Card className="h-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center p-6">
                        <CardHeader className="p-0 items-center">
                            <div className="p-4 bg-primary/10 rounded-full mb-4">
                                <branch.icon className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-xl">{branch.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 mt-2">
                            <p className="text-muted-foreground text-sm">{branch.description}</p>
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
