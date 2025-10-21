'use client';
import { Skeleton } from "@/components/ui/skeleton";

export default function SAMSLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur">
            <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
        </header>

        <main className="container max-w-7xl mx-auto p-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="space-y-2 rounded-xl bg-card p-4 shadow">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-2/5" />
                            <Skeleton className="h-5 w-5" />
                        </div>
                        <div className="space-y-2 pt-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    </div>
  );
}
