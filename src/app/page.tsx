'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/home/HeroSection';
import ClassSelectorSection from '@/components/home/ClassSelectorSection';
import FeaturedCoursesSection from '@/components/home/FeaturedCoursesSection';
import AiAssistantPreview from '@/components/home/AiAssistantPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BottomNavBar from '@/components/BottomNavBar';
import { useUser } from '@/firebase';
import Loading from './dashboard/loading';

export default function Home() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return <Loading />;
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ClassSelectorSection />
        <FeaturedCoursesSection />
        <AiAssistantPreview />
        <TestimonialsSection />
      </main>
      <Footer />
      <BottomNavBar />
    </div>
  );
}
