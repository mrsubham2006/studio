'use client';

import Link from 'next/link';
import { Book, Menu, Search, User, LogOut } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/live-classes', label: 'Live Classes' },
  { href: '/ai-assistant', label: 'AI Assistant' },
  { href: '/about', label: 'About' },
  { href: '/dashboard', label: 'Dashboard' },
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
              <SheetContent side="left" className="p-0">
                <SheetHeader className='p-6'>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 px-6">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setSheetOpen(false)}>
                    <Book className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-xl">EduNex</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                        onClick={() => setSheetOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`} alt="User Avatar" />
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
                <DropdownMenuItem>Settings</DropdownMenuItem>
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
