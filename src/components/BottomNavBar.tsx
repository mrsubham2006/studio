
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Bot, BarChart2, ShoppingCart, User, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const navLinks = [
  { href: '/ai-assistant', label: 'AI', icon: Bot },
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: BarChart2 },
  { href: '/edustore', label: 'EduStore', icon: ShoppingCart },
];

const courseCategories = [
    { name: 'Class 1st-10th', href: '/courses?category=Class%201st-8th' },
    { name: 'Class 12th', href: '/courses?category=Class%2012th' },
    { name: 'JEE', href: '/courses?category=JEE' },
    { name: 'NEET', href: '/courses?category=NEET' },
    { name: 'Competitive Exams', href: '/courses?category=Competitive%20Exams' },
];

const engineeringBranches = [
    { name: 'CSE', href: '/courses/engineering/cse' },
    { name: 'Mechanical', href: '/courses/engineering/mechanical' },
    { name: 'Civil', href: '/courses/engineering/civil' },
    { name: 'Electrical', href: '/courses/engineering/electrical' },
    { name: 'ECE', href: '/courses/engineering/ece' },
    { name: 'Mining', href: '/courses/engineering/mining' },
]

const CoursesSheet = () => (
    <Sheet>
        <SheetTrigger asChild>
            <button
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary'
              )}
            >
              <LayoutGrid className="h-6 w-6" />
              <span className="text-xs font-medium">Courses</span>
            </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-lg">
            <SheetHeader className="text-left mb-4">
                <SheetTitle>Explore Courses</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1">
                 <Link href="/courses" className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary">
                    <span>All Courses</span>
                    <ChevronRight className="h-5 w-5" />
                </Link>
                {courseCategories.map((category) => (
                    <Link key={category.name} href={category.href} className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary">
                        <span>{category.name}</span>
                        <ChevronRight className="h-5 w-5" />
                    </Link>
                ))}
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="engineering" className="border-b-0">
                        <AccordionTrigger className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary hover:no-underline">
                           <span>Engineering</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-0 pl-8">
                             <div className="flex flex-col gap-1">
                                {engineeringBranches.map((branch) => (
                                    <Link key={branch.name} href={branch.href} className="flex items-center justify-between rounded-lg py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary">
                                        <span>{branch.name}</span>
                                        <ChevronRight className="h-5 w-5" />
                                    </Link>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </SheetContent>
    </Sheet>
)


export default function BottomNavBar() {
  const pathname = usePathname();

  // Hide nav bar on auth pages
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  const allNavLinks = [
    <CoursesSheet key="courses" />,
    ...navLinks.map((link) => {
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
    }),
  ];

  // Reorder to place Home in the middle
  const middleIndex = Math.floor(allNavLinks.length / 2);
  const homeItem = allNavLinks.find(item => (item as React.ReactElement)?.key === '/');
  const otherItems = allNavLinks.filter(item => (item as React.ReactElement)?.key !== '/');
  
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
