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
              <span className="font-bold font-headline text-2xl">Pragyan Path</span>
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
              <li><Link href="/contact" className="text-base text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/help" className="text-base text-muted-foreground hover:text-primary">Help</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy" className="text-base text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-base text-muted-foreground hover:text-primary">Terms of Service</Link></li>
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
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Pragyan Path. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
