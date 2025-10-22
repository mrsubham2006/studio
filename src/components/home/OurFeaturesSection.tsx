import { GraduationCap, ShieldCheck, Video, Bot, Award, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'Expert Taught Courses',
    description: 'Learn from the best in the industry.',
    icon: GraduationCap,
    href: '/courses',
  },
  {
    title: 'AI Learning Assistant',
    description: 'Get instant help, 24/7.',
    icon: Bot,
    href: '/ai-assistant',
  },
  {
    title: 'Live Interactive Classes',
    description: 'Engage with instructors in real-time.',
    icon: Video,
    href: '/live-classes',
  },
  {
    title: 'Secure Online Exams',
    description: 'Test your knowledge with confidence.',
    icon: ShieldCheck,
    href: '/sams/exam-papers',
  },
  {
    title: 'Certifications',
    description: 'Earn certificates to showcase your skills.',
    icon: Award,
    href: '#',
  },
  {
    title: 'EduStore',
    description: 'All your learning materials in one place.',
    icon: ShoppingCart,
    href: '/edustore',
  },
];

export default function OurFeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Explore the powerful features that make learning with EduNex effective and fun.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link href={feature.href} key={index}>
                <div 
                    className="group p-8 rounded-lg text-center flex flex-col items-center justify-center h-full transition-all duration-300 transform hover:-translate-y-2 bg-card hover:bg-primary/5"
                    style={{ animationDelay: `${index * 100}ms`}}
                >
                    <div className="p-4 bg-primary/10 rounded-full mb-4 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <feature.icon className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold font-headline mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
