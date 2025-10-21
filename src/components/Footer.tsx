import Link from 'next/link';
import { Book, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Book className="h-7 w-7 text-primary" />
              <span className="font-bold font-headline text-2xl">EduNex</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              AI-Powered personalization for every learner.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-base text-muted-foreground hover:text-primary">About</Link></li>
              <li>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="courses" className="border-b-0">
                    <AccordionTrigger className="p-0 text-base text-muted-foreground hover:text-primary hover:no-underline">Courses</AccordionTrigger>
                    <AccordionContent className="pt-2 pl-4">
                      <ul className="space-y-2">
                        <li><Link href="/courses?category=Class%201st-8th" className="text-base text-muted-foreground hover:text-primary">Class 1-10th</Link></li>
                        <li><Link href="/courses?category=Class%2012th" className="text-base text-muted-foreground hover:text-primary">Class 12th</Link></li>
                        <li><Link href="/courses?category=JEE" className="text-base text-muted-foreground hover:text-primary">JEE</Link></li>
                        <li><Link href="/courses?category=NEET" className="text-base text-muted-foreground hover:text-primary">NEET</Link></li>
                        <li><Link href="/courses?category=Competitive%20Exams" className="text-base text-muted-foreground hover:text-primary">Competitive Exams</Link></li>
                        <li>
                          <Accordion type="single" collapsible>
                            <AccordionItem value="engineering" className="border-b-0">
                              <AccordionTrigger className="p-0 text-base text-muted-foreground hover:text-primary hover:no-underline">Engineering</AccordionTrigger>
                              <AccordionContent className="pt-2 pl-4">
                                <ul className="space-y-2">
                                  <li><Link href="/courses/engineering/cse" className="text-base text-muted-foreground hover:text-primary">CSE</Link></li>
                                  <li><Link href="/courses/engineering/mechanical" className="text-base text-muted-foreground hover:text-primary">Mechanical</Link></li>
                                  <li><Link href="/courses/engineering/civil" className="text-base text-muted-foreground hover:text-primary">Civil</Link></li>
                                  <li><Link href="/courses/engineering/electrical" className="text-base text-muted-foreground hover:text-primary">Electrical</Link></li>
                                  <li><Link href="/courses/engineering/ece" className="text-base text-muted-foreground hover:text-primary">ECE</Link></li>
                                  <li><Link href="/courses/engineering/mining" className="text-base text-muted-foreground hover:text-primary">Mining</Link></li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} EduNex. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
