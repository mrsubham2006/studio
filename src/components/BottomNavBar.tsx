
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Bot, BarChart2, ShoppingCart, BookCopy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/ai-assistant', label: 'AI Zone', icon: Bot },
  { href: '/courses', label: 'Courses', icon: LayoutGrid },
  { href: '/', label: 'Home', icon: Home },
  { href: '/mylearning', label: 'My Learning', icon: BookCopy },
  { href: '/dashboard', label: 'SAMS', icon: BarChart2 },
  { href: '/edustore', label: 'EduStore', icon: ShoppingCart },
];

export default function BottomNavBar() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  // Hide nav bar on auth pages
  const authPages = ['/login', '/signup', '/sams/login', '/sams/register'];
  if (authPages.includes(pathname)) {
    return null;
  }
  
  if (!isClient) {
    return null;
  }

  const navItems = navLinks.map((link) => {
      // Special handling for SAMS dashboard to match /sams/* routes
      const isActive = link.href === '/dashboard' 
        ? pathname.startsWith('/sams') 
        : pathname === link.href;

      const IconComponent = link.icon;
      return (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'flex flex-col items-center justify-center gap-1 text-muted-foreground transition-all duration-300',
            isActive ? 'text-primary' : 'hover:text-primary'
          )}
        >
            <div className={cn(
                "flex items-center justify-center h-8 w-12 rounded-full transition-all duration-300",
                isActive ? "bg-primary/10 glow-active" : "glow-on-hover"
            )}>
                <IconComponent className={cn("h-6 w-6 transition-transform duration-300", isActive && "scale-110")} />
            </div>
          <span className="text-xs font-medium">{link.label}</span>
        </Link>
      );
  });

  // Reorder to place Home in the middle
  const homeItem = navItems.find(item => item.key === '/');
  const otherItems = navItems.filter(item => item.key !== '/');
  
  if (homeItem) {
    const middleIndex = Math.floor(otherItems.length / 2);
    otherItems.splice(middleIndex, 0, homeItem);
  }


  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="mx-auto grid h-16 grid-cols-6 items-center">
        {otherItems}
      </div>
    </nav>
  );
}
