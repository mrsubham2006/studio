import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Riya Sharma', location: 'Rural Rajasthan', text: 'Pragyan Path made learning complex topics so easy. The AI assistant is a game-changer!', imageId: 'testimonial-1' },
  { id: 2, name: 'Amit Kumar', location: 'Semi-urban UP', text: 'The personalized courses helped me focus on my weak areas. My scores have improved dramatically.', imageId: 'testimonial-2' },
  { id: 3, name: 'Sunita Devi', location: 'Village in Bihar', text: 'I can now study even without a constant internet connection. Thank you for this amazing platform!', imageId: 'testimonial-3' },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
            Impact Stories
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Hear from students who have transformed their learning journey with us.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const testimonialImage = PlaceHolderImages.find(img => img.id === testimonial.imageId);
            return (
              <Card key={testimonial.id} className="p-6 shadow-lg transform hover:-translate-y-2 transition-transform duration-300 fade-in-up" style={{ animationDelay: `${index * 150}ms`}}>
                <CardContent className="p-0 text-center flex flex-col items-center">
                  {testimonialImage && (
                    <Image
                      src={testimonialImage.imageUrl}
                      alt={`Avatar of ${testimonial.name}`}
                      data-ai-hint={testimonialImage.imageHint}
                      width={80}
                      height={80}
                      className="rounded-full mb-4 border-4 border-primary/20"
                    />
                  )}
                  <p className="text-foreground/80 italic mb-4">"{testimonial.text}"</p>
                  <div className="flex gap-0.5 text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                  </div>
                  <h3 className="font-bold font-headline">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
