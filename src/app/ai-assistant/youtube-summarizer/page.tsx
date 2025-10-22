
'use client';

import { useState, useTransition, useCallback, useRef } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Youtube, Wand2, Sparkles, Copy, Check, FileAudio, Upload } from 'lucide-react';
import Link from 'next/link';
import { getYoutubeSummary, getAudioSummary } from './actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type SummaryLength = 'Short (approx. 50 words)' | 'Medium (approx. 100 words)' | 'Long (approx. 200 words)';

export default function YoutubeSummarizerPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryLength, setSummaryLength] = useState<SummaryLength>('Medium (approx. 100 words)');
  const [isProcessing, startTransition] = useTransition();
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('youtube');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleGenerateSummary = () => {
    startTransition(async () => {
      setSummary(''); // Clear previous summary
      try {
        let result;
        if (activeTab === 'youtube') {
          if (!videoUrl) {
            toast({ variant: 'destructive', title: 'Please enter a YouTube URL.' });
            return;
          }
          result = await getYoutubeSummary(videoUrl, summaryLength);
        } else {
           if (!audioFile) {
            toast({ variant: 'destructive', title: 'Please upload an audio file.' });
            return;
          }
          const reader = new FileReader();
          reader.readAsDataURL(audioFile);
          reader.onload = async (e) => {
            const dataUri = e.target?.result as string;
            try {
               const audioResult = await getAudioSummary(dataUri, summaryLength);
               setSummary(audioResult);
               toast({
                title: 'Summary Generated!',
                description: 'Your audio file has been summarized.',
              });
            } catch (error: any) {
              toast({
                variant: 'destructive',
                title: 'An error occurred.',
                description: error.message || 'Failed to summarize audio. Please try again.',
              });
            }
          };
          // Since FileReader is async, we handle summary setting inside onload. Return here.
          return;
        }

        setSummary(result);
        toast({
          title: 'Summary Generated!',
          description: 'Your video has been summarized successfully.',
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
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload an audio file (e.g., MP3, WAV).",
        });
      }
    }
  };

  const getYouTubeVideoId = (url: string) => {
    let videoId;
    if (url.includes('youtu.be')) {
      videoId = url.split('?si=')[0].split('/').pop();
    } else if (url.includes('youtube.com/live')) {
      videoId = url.split('/live/')[1]?.split('?')[0];
    } else {
      videoId = url.split('?v=')[1]?.split('&')[0];
    }
    return videoId;
  };

  const videoId = getYouTubeVideoId(videoUrl);

  const isGenerateDisabled = (activeTab === 'youtube' && !videoUrl) || (activeTab === 'upload' && !audioFile) || isProcessing;

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
                <Youtube className="h-10 w-10 text-primary" />
                <div className="absolute -top-1 -right-1 p-1 bg-background rounded-full shadow-lg">
                  <Sparkles className="h-4 w-4 text-yellow-500 fill-yellow-400 animate-pulse" />
                </div>
              </div>
              <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
                AI Video Summarizer
              </h1>
              <p className="mt-2 text-muted-foreground md:text-lg">
                Paste a YouTube link or upload an audio file and let AI summarize it for you.
              </p>
            </div>
          </div>

          <Card className="shadow-2xl backdrop-blur-lg bg-card/80">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="youtube"><Youtube className="mr-2 h-4 w-4"/>YouTube URL</TabsTrigger>
                  <TabsTrigger value="upload"><FileAudio className="mr-2 h-4 w-4"/>Upload Audio</TabsTrigger>
                </TabsList>
                <TabsContent value="youtube" className="mt-6">
                  <div className="flex flex-col gap-4 mb-8">
                    <Label htmlFor="youtube-url">YouTube Video URL</Label>
                    <Input
                      id="youtube-url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                    />
                  </div>
                   {videoId && (
                    <div className="mb-8 aspect-video">
                      <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="upload" className="mt-6">
                    <div className="flex flex-col items-center justify-center w-full">
                        <label 
                            htmlFor="audio-upload" 
                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors bg-muted/50 hover:bg-muted"
                        >
                            {audioFile ? (
                                <div className="flex flex-col items-center justify-center text-center p-4">
                                    <FileAudio className="w-12 h-12 mb-4 text-primary" />
                                    <p className="font-semibold text-lg break-all">{audioFile.name}</p>
                                    <p className="text-sm text-muted-foreground">({(audioFile.size / 1024 / 1024).toFixed(2)} MB)</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <Upload className="w-10 h-10 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">MP3, WAV, M4A, etc.</p>
                                </div>
                            )}
                        </label>
                         <input 
                            id="audio-upload" 
                            type="file" 
                            className="hidden" 
                            ref={audioInputRef} 
                            onChange={handleFileChange}
                            accept="audio/*"
                        />
                    </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-8">
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
                <Button size="lg" onClick={handleGenerateSummary} disabled={isGenerateDisabled} className="w-full sm:w-auto glow-on-hover">
                  <Wand2 className="mr-2 h-5 w-5" />
                  {isProcessing ? 'Generating...' : 'Generate Summary'}
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Summary</Label>
                <div className={cn("relative rounded-md border bg-muted/50 p-4 min-h-[200px] overflow-y-auto", summary && "text-foreground")}>
                  {isProcessing ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <Wand2 className="h-8 w-8 mb-2 animate-pulse" />
                      <p className="font-medium">Generating your summary...</p>
                      <p className="text-sm">This may take a moment.</p>
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
                      <p>Your video or audio summary will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
