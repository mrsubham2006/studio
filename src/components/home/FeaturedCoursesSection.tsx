'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BookOpen, ShoppingCart, ArrowRight } from 'lucide-react';
import productData from '@/lib/products.json';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartProvider';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageId: string;
};

const defaultFeaturedCourseIds = ['course-phy-12', 'course-chem-12', 'cse-dsa', 'course-neet-bio'];

export default function FeaturedCoursesSection({ selectedClass }: { selectedClass: string | null }) {
    
    const allProducts: Product[] = productData.products;
    const { addItem } = useCart();
    const { toast } = useToast();
    const router = useRouter();


    const handleBuyNow = (course: Product) => {
        addItem(course, 1);
        router.push('/checkout?flow=buy_now');
    };

    const featuredCourses = useMemo(() => {
        if (selectedClass) {
            const filteredByCategory = allProducts.filter(p => 
                p.category.toLowerCase().includes(selectedClass.toLowerCase())
            );

            if (filteredByCategory.length > 0) {
                return filteredByCategory.slice(0, 4);
            }
        }
        
        // Default to showing a curated list of popular courses if no class is selected or no matches are found
        return allProducts.filter(p => defaultFeaturedCourseIds.includes(p.id));

    }, [selectedClass, allProducts]);

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
            Featured Courses
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            {selectedClass ? `Top courses for ${selectedClass}` : 'Explore our most popular courses, designed for excellence.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredCourses.map((course, index) => {
            const courseImage = PlaceHolderImages.find(img => img.id === course.imageId);
            return (
              <Card 
                key={course.id} 
                className={cn(
                  "shine-on-hover flex flex-col sm:flex-row overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 fade-in-up",
                )}
                style={{ animationDelay: `${index * 100}ms`}}
              >
                {courseImage && (
                     <Link href={`/courses/${course.id}`} className="sm:w-2/5">
                        <Image
                        src={courseImage.imageUrl}
                        alt={course.name}
                        data-ai-hint={courseImage.imageHint}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                        />
                     </Link>
                  )}
                <div className="flex flex-col sm:w-3/5">
                    <CardContent className="flex-1 p-6 space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <BookOpen className="w-4 h-4 mr-2" />
                            <span>{course.category}</span>
                        </div>
                        <CardTitle className="font-headline text-lg leading-tight">
                            <Link href={`/courses/${course.id}`} className="hover:text-primary transition-colors">{course.name}</Link>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground h-10 overflow-hidden">{course.description}</p>
                        <p className="text-2xl font-bold text-primary pt-2">₹{course.price}</p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex gap-2">
                        <Button variant="outline" asChild className="w-full">
                            <Link href={`/courses/${course.id}`}>
                                Explore
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                         <Button onClick={() => handleBuyNow(course)} className="w-full">
                            Buy Now
                            <ShoppingCart className="ml-2 h-4 w-4" />
                         </Button>
                    </CardFooter>
                </div>
              </Card>
            );
          })}
        </div>
        <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
                <Link href="/courses">View All Courses</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
