'use client';

import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import SAMSLoading from './loading';

// This is a temporary redirect.
// We will build the full SAMS experience in the next steps.
export default function DashboardRedirectPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();

    const studentDocRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return doc(firestore, 'students', user.uid);
    }, [user, firestore]);

    const { data: studentData, isLoading: isStudentDataLoading } = useDoc(studentDocRef);

    useEffect(() => {
        // Wait for both user and student data to finish loading.
        if (isUserLoading || isStudentDataLoading) {
            return;
        }

        // If no user is authenticated, redirect to the login page.
        if (!user) {
             router.replace('/login');
             return;
        }
        
        // If the student document exists, they are registered in SAMS.
        if (studentData) {
            router.replace('/sams/dashboard');
        } else {
            // If the student document does not exist, they need to register.
            router.replace('/sams/register');
        }

    }, [user, isUserLoading, studentData, isStudentDataLoading, router]);

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
