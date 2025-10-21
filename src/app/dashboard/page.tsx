'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// This is a temporary redirect.
// We will build the full SAMS experience in the next steps.
export default function DashboardRedirectPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        // Wait for user to finish loading.
        if (isUserLoading) {
            return;
        }

        // If no user is authenticated, redirect to the login page.
        if (!user) {
             router.replace('/login');
             return;
        }
        
        // If a user is logged in, always redirect to the SAMS dashboard for this demo.
        router.replace('/sams/dashboard');

    }, [user, isUserLoading, router]);

    // Show a loading state until redirection happens to avoid a blank screen.
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-dashed border-primary"></div>
                <p className="text-muted-foreground">Redirecting to SAMS...</p>
            </div>
        </div>
    );
}
