import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Target, Lightbulb, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-7xl py-12 md:py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">
              About EduNex
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
              Our mission is to make quality education accessible to every student, everywhere, through the power of AI.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8 text-lg text-foreground/80">
            <p>
              EduNex was born from a simple yet powerful idea: that a student's potential should not be limited by their geography. In many rural and semi-urban areas, access to quality teaching, personalized attention, and modern learning tools remains a significant challenge. We are here to bridge that gap.
            </p>
            <p>
              Inspired by the impact of platforms like Physics Wallah, we are leveraging cutting-edge Artificial Intelligence to create a learning experience that is personalized, adaptive, and effective. Our AI-driven platform understands each student's unique learning pace and style, offering tailored content, real-time doubt resolution, and intelligent recommendations to help them master any subject.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16 text-center">
            <div className="p-6">
              <Target className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-headline font-semibold">Our Mission</h3>
              <p className="mt-2 text-muted-foreground">To democratize education by providing a personalized, AI-powered learning assistant to every student, regardless of their location or background.</p>
            </div>
            <div className="p-6">
              <Lightbulb className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-headline font-semibold">Our Vision</h3>
              <p className="mt-2 text-muted-foreground">To become the most trusted learning companion for millions of students, helping them achieve their academic goals and unlock their full potential.</p>
            </div>
            <div className="p-6">
              <Heart className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-headline font-semibold">Our Values</h3>
              <p className="mt-2 text-muted-foreground">Accessibility, Affordability, and Quality. We believe in putting the student first and creating technology that truly serves their needs.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
