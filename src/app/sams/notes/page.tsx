
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookCopy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur">
        <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/sams/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to Dashboard</span>
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <BookCopy className="h-7 w-7 text-primary" />
              <h1 className="text-xl font-bold font-headline">Notes & Syllabus</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-5xl mx-auto p-4 py-8">
        <div className="space-y-8">
            <Card>
            <CardHeader>
                <CardTitle>Sample JavaScript Notes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative w-full overflow-hidden rounded-lg border">
                <Image
                    src="https://i9.ytimg.com/vi/aveu0krAGvU/hq720_custom_1.jpg?sqp=CJzY38cG-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDCs4SNEyb9al3B5nV6LISsEmhffA"
                    alt="Sample JavaScript notes for exam preparation"
                    width={1280}
                    height={720}
                    className="w-full h-auto"
                    priority
                />
                </div>
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle>Sample CSS Notes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative w-full overflow-hidden rounded-lg border">
                <Image
                    src="https://i.postimg.cc/vmDhcwfQ/hq720-custom-1.avif"
                    alt="Sample CSS notes for exam preparation"
                    width={1280}
                    height={720}
                    className="w-full h-auto"
                />
                </div>
            </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
