

'use client';

import Link from 'next/link';
import { Book, Menu, Search, User, LogOut, Briefcase, GraduationCap, Award, Calendar, Bell, LifeBuoy, Mail, Phone, Package, X, BookCopy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

const mobileNavLinks = [
  { href: '/', label: 'Home', icon: Book },
  { href: '/about', label: 'About', icon: Book },
  { href: '/internship', label: 'Internship', icon: Briefcase },
  { href: '/scholarship', label: 'Scholarship', icon: GraduationCap },
  { href: '/certificate', label: 'Certificate', icon: Award },
  { href: '/time-table', label: 'Time Table', icon: Calendar },
  { href: '/orders', label: 'My Orders', icon: Package },
  { href: '/notification', label: 'Notification', icon: Bell },
];


export default function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs p-0">
                <SheetHeader className='p-6 pb-2'>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2" onClick={() => setSheetOpen(false)}>
                      <Book className="h-6 w-6 text-primary" />
                      <span className="font-bold font-headline text-xl">EduNex</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex h-full flex-col">
                  <div className="flex-1 overflow-y-auto px-4 py-2">
                    <nav className="flex flex-col gap-1">
                      {mobileNavLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                          onClick={() => setSheetOpen(false)}
                        >
                          <link.icon className="h-5 w-5" />
                          {link.label}
                        </Link>
                      ))}
                    </nav>

                    <Accordion type="single" collapsible className="w-full mt-2">
                      <AccordionItem value="help" className="border-b-0">
                        <AccordionTrigger className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary hover:no-underline">
                          <LifeBuoy className="h-5 w-5" />
                          Help & Support
                        </AccordionTrigger>
                        <AccordionContent className="pb-0 pl-8">
                          <div className="flex flex-col gap-2 text-foreground/70">
                              <h4 className="font-semibold text-foreground/90 mt-2">Customer Support</h4>
                              <a href="tel:7848049774" className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium transition-colors hover:text-primary">
                                  <Phone className="h-5 w-5" />
                                  <span>7848049774</span>
                              </a>
                              <a href="mailto:support@edunex.demo" className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium transition-colors hover:text-primary">
                                  <Mail className="h-5 w-5" />
                                  <span>support@edunex.demo</span>
                              </a>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <Book className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-xl hidden sm:inline-block">EduNex</span>
          </Link>
        </div>

        {/* Center Section (Search) */}
        <div className="flex-1 flex justify-center px-4">
          <div className={cn(
              "relative w-full max-w-[200px] transition-all duration-300 ease-in-out",
              isSearchFocused && "max-w-sm"
            )}>
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Input 
                placeholder="Search..." 
                className="pl-10 h-10 w-full rounded-full bg-muted/50 border-transparent focus:bg-background focus:border-border"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {user && (
            <Button variant="ghost" asChild>
                <Link href="/mylearning">
                    <BookCopy className="h-5 w-5" />
                    <span>My Learning</span>
                </Link>
            </Button>
          )}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${'\'\''}${user.uid}/100/100`} alt="User Avatar" />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || 'Student'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <ThemeToggle />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/login" className='gap-1'>
                <User className="h-5 w-5" />
                <span className='text-sm font-medium'>Login</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
