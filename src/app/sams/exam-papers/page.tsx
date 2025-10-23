
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExamPapersPage() {
  const pdfEmbedUrl = "https://drive.google.com/file/d/1mclrwBQYrJstaNcro5dpiyCxLn4cXphy/preview";

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
              <FileText className="h-7 w-7 text-primary" />
              <h1 className="text-xl font-bold font-headline">Exam Papers</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-5xl mx-auto p-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>B.Tech 1st Semester Examination Paper</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
              <iframe
                src={pdfEmbedUrl}
                className="w-full h-full"
                title="Exam Paper PDF"
                allow="autoplay"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
