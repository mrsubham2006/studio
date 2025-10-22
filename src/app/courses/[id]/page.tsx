
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import productData from '@/lib/products.json';
import Image from 'next/image';
import { BookOpen, Clock, Film, Star, FileText } from 'lucide-react';
import CourseDetailsClient from './CourseDetailsClient';
import Link from 'next/link';

type Course = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageId: string;
};

// Mock data, this would come from a database
const courseDetailsData: { [key: string]: any } = {
  'course-phy-12': {
    instructor: 'Dr. Ankit Sharma',
    rating: 4.8,
    reviews: 1250,
    duration: 80,
    modules: [
      { title: 'Electrostatics', lectures: 10 },
      { title: 'Current Electricity', lectures: 8 },
      { title: 'Magnetic Effects of Current', lectures: 9 },
      { title: 'Optics', lectures: 12 },
    ]
  },
  'course-neet-bio': {
      instructor: 'Dr. Priya Verma',
      rating: 4.9,
      reviews: 2300,
      duration: 120,
      modules: [
          { title: 'Human Physiology', lectures: 15 },
          { title: 'Plant Physiology', lectures: 12 },
          { title: 'Genetics and Evolution', lectures: 14 },
          { title: 'Ecology', lectures: 10 },
      ]
  },
  'course-jee-math': {
      instructor: 'Prof. Rajesh Gupta',
      rating: 4.7,
      reviews: 1800,
      duration: 100,
      modules: [
          { title: 'Functions & Limits', lectures: 10 },
          { title: 'Differential Calculus', lectures: 12 },
          { title: 'Integral Calculus', lectures: 12 },
          { title: 'Differential Equations', lectures: 8 },
      ]
  }
};


export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const allCourses: Course[] = productData.products;
  const course = allCourses.find(c => c.id === params.id);
  const details = courseDetailsData[params.id] || {
      instructor: 'EduNex Expert',
      rating: 4.5,
      reviews: 100,
      duration: 40,
      modules: [
          { title: 'Introduction', lectures: 2 },
          { title: 'Core Concepts', lectures: 5 },
          { title: 'Advanced Topics', lectures: 4 },
          { title: 'Conclusion', lectures: 1},
      ]
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  const courseImage = PlaceHolderImages.find(img => img.id === course.imageId);
  const totalLectures = details.modules.reduce((sum: number, mod: any) => sum + mod.lectures, 0);

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="container max-w-5xl py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h1 className="text-3xl font-bold font-headline">{course.name}</h1>
              <p className="text-lg text-muted-foreground">{course.description}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{details.rating}</span>
                    <span className="text-muted-foreground">({details.reviews} ratings)</span>
                </div>
                <span className="text-muted-foreground">Taught by {details.instructor}</span>
              </div>
              
              <div className="border rounded-lg p-6 bg-background">
                <h3 className="text-xl font-bold font-headline mb-4">Course Content</h3>
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                  <span>{details.modules.length} modules</span>
                  <span className="h-1 w-1 bg-muted-foreground rounded-full"></span>
                  <span>{totalLectures} lectures</span>
                  <span className="h-1 w-1 bg-muted-foreground rounded-full"></span>
                  <span>{details.duration} total hours</span>
                </div>
                <ul className="space-y-2">
                  {details.modules.map((module: any) => (
                    <li key={module.title} className="p-3 bg-muted/50 rounded-md flex justify-between items-center">
                      <span className="font-medium">{module.title}</span>
                      <span className="text-sm text-muted-foreground">{module.lectures} lectures</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:col-span-1 space-y-4">
              <div className="sticky top-24">
                <div className="border rounded-lg overflow-hidden bg-background shadow-lg">
                  {courseImage && (
                    <Image
                      src={courseImage.imageUrl}
                      alt={course.name}
                      data-ai-hint={courseImage.imageHint}
                      width={400}
                      height={250}
                      className="object-cover w-full"
                    />
                  )}
                  <div className="p-6 space-y-4">
                    <p className="text-3xl font-bold">₹{course.price}</p>
                    
                    <CourseDetailsClient course={course} />
                    
                    <div className="text-xs text-muted-foreground text-center">30-Day Money-Back Guarantee</div>
                    
                    <div className="space-y-2 pt-4 border-t">
                        <h4 className="font-semibold">This course includes:</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" /> <span>{details.duration} hours of on-demand video</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="w-4 h-4" /> <span>Articles & resources</span>
                        </div>
                         <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Film className="w-4 h-4" /> <span>Access on mobile and TV</span>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
