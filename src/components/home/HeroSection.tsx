
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useUser } from '@/firebase';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-banner');
  const { user } = useUser();

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center bg-background">
      {heroImage && (
        <>
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover opacity-30 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-black/0 dark:bg-black/50" />
        </>
      )}
      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary dark:from-chart-3 dark:to-chart-5 bg-clip-text text-transparent drop-shadow-lg animate-shine bg-[length:200%_auto]">EduNex — Where knowledge meets opportunity, and dreams find direction.</p>
          </div>
          <p className="text-lg text-foreground/90 md:text-xl pt-4">
            Adaptive lessons, offline access, and real-time feedback — designed for every learner.
          </p>
        </div>
      </div>
    </section>
  );
}
