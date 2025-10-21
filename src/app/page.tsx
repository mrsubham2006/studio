
import HeroSection from '@/components/home/HeroSection';
import ClassSelectorSection from '@/components/home/ClassSelectorSection';
import FeaturedCoursesSection from '@/components/home/FeaturedCoursesSection';
import AiAssistantPreview from '@/components/home/AiAssistantPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BottomNavBar from '@/components/BottomNavBar';

export default function Home() {
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
