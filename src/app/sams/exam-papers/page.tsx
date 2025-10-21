
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExamPapersPage() {
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
            <CardTitle>Sample Technical Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-hidden rounded-lg border">
              <Image
                src="https://i.postimg.cc/3rb1Tm7G/General-Technical-Questions.png"
                alt="Sample technical questions for exam preparation"
                width={1200}
                height={1600}
                className="w-full h-auto"
                priority
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
