import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';

export default function LiveClassesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container max-w-7xl py-12 text-center">
            <Video className="mx-auto h-16 w-16 text-primary mb-4"/>
            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">
                Live Classes
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                Join our interactive live classes with expert educators. This feature is coming soon!
            </p>
            <Button size="lg" className="mt-8">Notify Me</Button>
        </div>
      </main>
    </>
  );
}
