'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function SAMSLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Login Successful",
        description: "Welcome back to SAMS!",
      });
      router.push('/sams/dashboard');
    } catch (error: any) {
      console.error("SAMS Login failed:", error);
      let description = "An unexpected error occurred. Please try again.";
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        description = "The email or password you entered is incorrect. Please check your credentials and try again.";
      }
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: description,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
        toast({ variant: "destructive", title: "Email required", description: "Please enter your email address to reset password."});
        return;
    }
    try {
        await sendPasswordResetEmail(auth, resetEmail);
        toast({ title: "Password Reset Email Sent", description: "Check your inbox for instructions."});
    } catch (error: any) {
        toast({ variant: "destructive", title: "Error", description: error.message });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl bg-card glow-on-hover">
        <CardHeader className="text-center space-y-2">
          <GraduationCap className="mx-auto h-10 w-10 text-primary" />
          <CardTitle className="text-3xl font-headline">SAMS Login</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email ID</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="link" type="button" className="p-0 h-auto text-xs text-primary">Forgot Password?</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Reset Your Password</AlertDialogTitle>
                            <AlertDialogDescription>
                                Enter your email address and we'll send you a link to reset your password.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                             <Input placeholder="Enter your email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handlePasswordReset}>Send Reset Link</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-dashed border-primary-foreground"></div> : 'Login'}
            </Button>
            <div className="text-center text-sm">
                <p>New to SAMS? <Link href="/sams/register" className="text-primary underline">Register here</Link></p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
