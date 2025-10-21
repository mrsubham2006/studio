
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
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center bg-gradient-to-br from-primary/20 via-background to-background">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover opacity-40 z-0"
        />
      )}
      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg">EduNex — Where knowledge meets opportunity, and dreams find direction.</p>
            {!user && (
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Login Now</Link>
              </Button>
            )}
          </div>
          <p className="text-lg text-foreground/90 md:text-xl pt-4">
            Adaptive lessons, offline access, and real-time feedback — designed for every learner.
          </p>
        </div>
      </div>
    </section>
  );
}
