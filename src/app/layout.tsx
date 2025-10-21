import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import Header from '@/components/Header';
import BottomNavBar from '@/components/BottomNavBar';

export const metadata: Metadata = {
  title: 'Pragyan Path – AI Learning Assistant',
  description: 'Learn Smartly with AI-Powered Personalization. Adaptive lessons, offline access, and real-time feedback — designed for every learner.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex-1 overflow-y-auto pb-20">
            {children}
          </main>
          <BottomNavBar />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
