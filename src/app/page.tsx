
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/home/HeroSection';
import ClassSelectorSection from '@/components/home/ClassSelectorSection';
import FeaturedCoursesSection from '@/components/home/FeaturedCoursesSection';
import AiAssistantPreview from '@/components/home/AiAssistantPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import Header from '@/components/Header';
import { useUser } from '@/firebase';
import Loading from './dashboard/loading';
import { useToast } from '@/hooks/use-toast';
import { Rocket } from 'lucide-react';

const motivationalMessages = [
  "Believe you can and you're halfway there.",
  "The secret of getting ahead is getting started.",
  "It’s not whether you get knocked down, it’s whether you get up.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts."
];

export default function Home() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);


  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if(user) {
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      setTimeout(() => {
        toast({
          title: (
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              <span className="font-semibold">Daily Motivation</span>
            </div>
          ),
          description: randomMessage,
          duration: 5000,
        });
      }, 1000);
    }
  }, [user, toast]);

  if (isUserLoading || !user) {
    return <Loading />;
  }
  
  return (
    <>
      <Header />
      <HeroSection />
      <div className="relative z-10 mt-[60vh] md:mt-[70vh] bg-background">
        <main className="flex-1">
          <ClassSelectorSection onClassChange={setSelectedClass} />
          <FeaturedCoursesSection selectedClass={selectedClass} />
          <AiAssistantPreview />
          <TestimonialsSection />
        </main>
      </div>
    </>
  );
}
