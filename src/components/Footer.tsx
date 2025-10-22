import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Gamepad2 className="h-7 w-7 text-primary" />
              <span className="font-bold font-headline text-2xl">EduNex</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md text-center">
              AI-Powered personalization for every learner.
            </p>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} EduNex. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
