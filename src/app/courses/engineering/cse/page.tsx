import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';

export default function CsePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container max-w-7xl py-12 text-center">
            <Code className="mx-auto h-16 w-16 text-primary mb-4"/>
            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">
                Computer Science Engineering
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                Courses for CSE are coming soon. Stay tuned!
            </p>
            <Button size="lg" className="mt-8">Notify Me</Button>
        </div>
      </main>
    </>
  );
}
