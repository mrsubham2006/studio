
'use client';

import { useState, useTransition, useCallback, useRef } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Mic, Upload, Trash2, Copy, Check, Wand2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { getAudioSummary } from './actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

type SummaryLength = 'Short (approx. 50 words)' | 'Medium (approx. 100 words)' | 'Long (approx. 200 words)';

export default function AudioSummarizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [summaryLength, setSummaryLength] = useState<SummaryLength>('Medium (approx. 100 words)');
  const [isProcessing, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('audio/')) {
      toast({
        variant: 'destructive',
        title: 'Invalid File Type',
        description: 'Please upload an audio file.',
      });
      return;
    }
    setFile(selectedFile);
    setSummary('');
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleFileChange(event.dataTransfer.files?.[0] || null);
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleRemoveFile = () => {
    setFile(null);
    setSummary('');
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleGenerateSummary = () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No File Found',
        description: 'Please upload an audio file to summarize.',
      });
      return;
    }

    startTransition(async () => {
        setIsUploading(true);
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                const audioDataUri = reader.result as string;
                try {
                    const result = await getAudioSummary(audioDataUri, summaryLength);
                    setSummary(result);
                    toast({
                        title: 'Summary Generated!',
                        description: 'Your audio file has been summarized successfully.',
                    });
                } catch (error: any) {
                     toast({
                        variant: 'destructive',
                        title: 'An error occurred.',
                        description: error.message || 'Failed to generate summary. Please try again.',
                    });
                } finally {
                    setIsUploading(false);
                }
            };
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'An error occurred.',
                description: error.message || 'Failed to read file. Please try again.',
            });
            setIsUploading(false);
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
                <Mic className="h-10 w-10 text-primary" />
                 <div className="absolute -top-1 -right-1 p-1 bg-background rounded-full shadow-lg">
                    <Sparkles className="h-4 w-4 text-yellow-500 fill-yellow-400 animate-pulse" />
                </div>
              </div>
              <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
                AI Audio Summarizer
              </h1>
              <p className="mt-2 text-muted-foreground md:text-lg">
                Upload your audio file and let AI instantly summarize it for you.
              </p>
               <p className="text-xs text-muted-foreground/80 mt-1">Save time — Understand faster.</p>
            </div>
          </div>

          <Card className="shadow-2xl backdrop-blur-lg bg-card/80">
            <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Area */}
                <div 
                  className="flex flex-col items-center justify-center w-full"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                    <label 
                        htmlFor="audio-upload" 
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                            file ? "border-primary/50 bg-primary/5" : "bg-muted/50 hover:bg-muted"
                        )}
                    >
                        {file ? (
                            <div className="flex flex-col items-center justify-center text-center p-4">
                                <Mic className="w-12 h-12 mb-4 text-primary" />
                                <p className="font-semibold text-lg break-all">{file.name}</p>
                                <p className="text-sm text-muted-foreground">({(file.size / 1024).toFixed(2)} KB)</p>
                                <Button variant="destructive" size="sm" className="mt-4" onClick={(e) => { e.preventDefault(); handleRemoveFile(); }}>
                                    <Trash2 className="mr-2 h-4 w-4"/>
                                    Remove File
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <Upload className="w-10 h-10 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-muted-foreground">MP3, WAV, etc.</p>
                            </div>
                        )}
                    </label>
                    <input 
                        id="audio-upload" 
                        type="file" 
                        className="hidden" 
                        ref={fileInputRef} 
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                        accept="audio/*"
                    />
                </div>

                {/* Controls and Output */}
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Label htmlFor="summary-length" className="text-sm font-medium">Summary Length:</Label>
                            <Select value={summaryLength} onValueChange={(value: SummaryLength) => setSummaryLength(value)} disabled={!file || isProcessing}>
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
                        <Button size="lg" onClick={handleGenerateSummary} disabled={!file || isProcessing || isUploading} className="w-full sm:w-auto glow-on-hover">
                            <Wand2 className="mr-2 h-5 w-5" />
                            {isProcessing ? 'Generating...' : (isUploading ? 'Processing Audio...' : 'Generate Summary')}
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
                                    <p>Your summarized audio content will appear here.</p>
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
