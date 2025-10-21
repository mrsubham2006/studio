
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Bot, BarChart2, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/ai-assistant', label: 'AI', icon: Bot },
  { href: '/', label: 'Home', icon: Home },
  { href: '/courses', label: 'Courses', icon: LayoutGrid },
  { href: '/dashboard', label: 'SAMS', icon: BarChart2 },
  { href: '/edustore', label: 'EduStore', icon: ShoppingCart },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  // Hide nav bar on auth pages
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  const navItems = navLinks.map((link) => {
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
  });

  // Reorder to place Home in the middle
  const middleIndex = Math.floor(navItems.length / 2);
  const homeItem = navItems.find(item => item.key === '/');
  const otherItems = navItems.filter(item => item.key !== '/');
  
  if (homeItem) {
    otherItems.splice(middleIndex, 0, homeItem);
  }


  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="mx-auto grid h-16 grid-cols-5 items-center">
        {otherItems}
      </div>
    </nav>
  );
}
