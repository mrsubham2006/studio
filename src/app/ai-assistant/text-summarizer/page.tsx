'use client';

import { useState, useTransition } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, FileText, Copy, Check, Sparkles, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { getSummary } from './actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

type SummaryLength = 'Short (approx. 50 words)' | 'Medium (approx. 100 words)' | 'Long (approx. 200 words)';

export default function TextSummarizerPage() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryLength, setSummaryLength] = useState<SummaryLength>('Medium (approx. 100 words)');
  const [isPending, startTransition] = useTransition();
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = () => {
    if (!inputText.trim()) {
      toast({
        variant: 'destructive',
        title: 'Input Required',
        description: 'Please enter some text to summarize.',
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await getSummary(inputText, summaryLength);
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
                Summarize long articles, essays, or notes instantly using AI.
              </p>
              <p className="text-xs text-muted-foreground/80 mt-1">Powered by advanced natural language processing for smarter learning.</p>
            </div>
          </div>

          <Card className="shadow-2xl backdrop-blur-lg bg-card/80">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Area */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Your Text</h3>
                    <Textarea
                        placeholder="Enter or paste your text here..."
                        className="h-72 resize-none"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </div>
                
                {/* Controls and Output Area */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Summary</h3>
                    <div className={cn("relative rounded-md border bg-muted/50 p-4 h-72 overflow-y-auto", summary && "text-foreground")}>
                        {isPending ? (
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
                                <p>Your summarized text will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                 <div className="flex items-center gap-2">
                    <Label htmlFor="summary-length" className="text-sm font-medium">Summary Length:</Label>
                    <Select value={summaryLength} onValueChange={(value: SummaryLength) => setSummaryLength(value)}>
                        <SelectTrigger id="summary-length" className="w-[280px]">
                            <SelectValue placeholder="Select summary length" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Short (approx. 50 words)">Short (~50 words)</SelectItem>
                            <SelectItem value="Medium (approx. 100 words)">Medium (~100 words)</SelectItem>
                            <SelectItem value="Long (approx. 200 words)">Long (~200 words)</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
                 <Button size="lg" onClick={handleGenerateSummary} disabled={isPending} className="w-full sm:w-auto glow-on-hover">
                    <Wand2 className="mr-2 h-5 w-5" />
                    {isPending ? 'Generating...' : 'Generate Summary'}
                 </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
