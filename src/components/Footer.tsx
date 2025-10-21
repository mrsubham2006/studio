import Link from 'next/link';
import { Book, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
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
              <li><Link href="/courses" className="text-base text-muted-foreground hover:text-primary">Courses</Link></li>
              <li><Link href="#contact-support" className="text-base text-muted-foreground hover:text-primary">Help</Link></li>
            </ul>
          </div>
          <div>
            <h3 id="contact-support" className="text-sm font-semibold text-foreground tracking-wider uppercase scroll-mt-24">Contact Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="tel:7848049774" className="text-base text-muted-foreground hover:text-primary">Call: 7848049774</a></li>
              <li><a href="mailto:support@edunex.demo" className="text-base text-muted-foreground hover:text-primary">Email: support@edunex.demo</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Connect</h3>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Twitter</span><Twitter/></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Facebook</span><Facebook/></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Instagram</span><Instagram/></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">LinkedIn</span><Linkedin/></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} EduNex. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
