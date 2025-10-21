
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Bot, BarChart2, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

const navLinks = [
  { href: '/courses', label: 'Courses', icon: LayoutGrid },
  { href: '/ai-assistant', label: 'AI', icon: Bot },
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: BarChart2 },
  { href: '/edustore', label: 'EduStore', icon: ShoppingCart },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  // Hide nav bar on auth pages
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-5 items-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const IconComponent = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary',
                isActive && 'text-primary'
              )}
            >
              <IconComponent className="h-6 w-6" />
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
