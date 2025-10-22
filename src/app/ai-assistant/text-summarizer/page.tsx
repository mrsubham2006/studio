'use client';

import { useState, useTransition } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, FileText, Wand2, Sparkles, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { getSummary } from './actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

type SummaryLength = 'Short (approx. 50 words)' | 'Medium (approx. 100 words)' | 'Long (approx. 200 words)';

export default function TextSummarizerPage() {
  const [textToSummarize, setTextToSummarize] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryLength, setSummaryLength] = useState<SummaryLength>('Medium (approx. 100 words)');
  const [isProcessing, startTransition] = useTransition();
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = () => {
    startTransition(async () => {
      try {
        const result = await getSummary(textToSummarize, summaryLength);
        setSummary(result);
        toast({
          title: 'Summary Generated!',
          description: 'Your text has been summarized successfully.',
        });
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'An error occurred.',
          description: error.message || 'Failed to generate summary. Please try again.',
        });
      }
    });
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="flex-1 py-8 bg-muted/20">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/ai-assistant" className="flex items-center gap-2 text-muted-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to AI Zone
              </Link>
            </Button>
            <div className="text-center">
              <div className="inline-block p-3 bg-primary/10 rounded-full mb-4 relative">
                <FileText className="h-10 w-10 text-primary" />
                 <div className="absolute -top-1 -right-1 p-1 bg-background rounded-full shadow-lg">
                    <Sparkles className="h-4 w-4 text-yellow-500 fill-yellow-400 animate-pulse" />
                </div>
              </div>
              <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
                AI Text Summarizer
              </h1>
              <p className="mt-2 text-muted-foreground md:text-lg">
                Paste in any text and let AI instantly summarize it for you.
              </p>
               <p className="text-xs text-muted-foreground/80 mt-1">Save time — Understand faster.</p>
            </div>
          </div>

          <Card className="shadow-2xl backdrop-blur-lg bg-card/80">
            <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Area */}
              <div className="space-y-4">
                <Label htmlFor="text-input">Text to Summarize</Label>
                <Textarea
                  id="text-input"
                  placeholder="Paste your article, notes, or any long text here..."
                  className="h-80 resize-none"
                  value={textToSummarize}
                  onChange={(e) => setTextToSummarize(e.target.value)}
                />
              </div>

              {/* Controls and Output */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Label htmlFor="summary-length" className="text-sm font-medium">Summary Length:</Label>
                    <Select value={summaryLength} onValueChange={(value: SummaryLength) => setSummaryLength(value)} disabled={isProcessing}>
                      <SelectTrigger id="summary-length" className="flex-1 sm:w-[280px]">
                        <SelectValue placeholder="Select summary length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Short (approx. 50 words)">Short (~50 words)</SelectItem>
                        <SelectItem value="Medium (approx. 100 words)">Medium (~100 words)</SelectItem>
                        <SelectItem value="Long (approx. 200 words)">Long (~200 words)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button size="lg" onClick={handleGenerateSummary} disabled={!textToSummarize || isProcessing} className="w-full sm:w-auto glow-on-hover">
                    <Wand2 className="mr-2 h-5 w-5" />
                    {isProcessing ? 'Generating...' : 'Generate Summary'}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Summary</Label>
                  <div className={cn("relative rounded-md border bg-muted/50 p-4 h-80 overflow-y-auto", summary && "text-foreground")}>
                    {isProcessing ? (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Wand2 className="h-8 w-8 mb-2 animate-pulse" />
                        <p className="font-medium">Generating your summary...</p>
                        <p className="text-sm">Please wait a moment.</p>
                      </div>
                    ) : summary ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-7 w-7"
                          onClick={handleCopy}
                        >
                          {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                        <p className="text-sm whitespace-pre-wrap">{summary}</p>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                        <Sparkles className="h-8 w-8 mb-2" />
                        <p>Your summarized content will appear here.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
