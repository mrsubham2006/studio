'use client';

import { useState, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, GraduationCap } from 'lucide-react';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  course: z.string().min(1, 'Course is required'),
  branch: z.string().min(1, 'Branch is required'),
  rollNumber: z.string().min(1, 'Roll number is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  photo: z.instanceof(File).optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});


type RegisterFormInputs = z.infer<typeof registerSchema>;

const courseBranchMap: Record<string, string[] | null> = {
    'B.Tech': ['CSE', 'Mechanical', 'Civil', 'Electrical', 'ECE', 'Mining'],
    'Class 12th': ['Science', 'Arts', 'Commerce'],
    'Class 11th': ['Science', 'Arts', 'Commerce'],
    'Class 10th': null,
    'Class 9th': null,
};


export default function SAMSRegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [branchOptions, setBranchOptions] = useState<string[] | null>([]);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('photo', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCourseChange = (value: string) => {
    setValue('course', value);
    setSelectedCourse(value);
    const branches = courseBranchMap[value]
    setBranchOptions(branches);
    if (!branches) {
      setValue('branch', 'N/A');
    } else {
      setValue('branch', '');
    }
  };

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setIsSubmitting(true);
    
    // In a real app, you would handle file uploads to Firebase Storage here.
    // For now, we'll use a placeholder URL.
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const userId = userCredential.user.uid;
        const userEmail = userCredential.user.email;

        const studentDocRef = doc(firestore, 'students', userId);
        const studentData = {
            uid: userId,
            fullName: data.fullName,
            course: data.course,
            branch: data.branch,
            rollNumber: data.rollNumber,
            email: userEmail,
            photoURL: photoPreview || `https://avatar.vercel.sh/${userId}.png`, // Placeholder
        };

        setDocumentNonBlocking(studentDocRef, studentData, { merge: true });

        toast({
            title: "Registration Successful!",
            description: "Your SAMS profile has been created.",
        });

        router.push('/sams/dashboard');

    } catch (error: any) {
        console.error("SAMS Registration failed:", error);
        toast({
            variant: "destructive",
            title: "Registration Failed",
            description: error.message || "An unexpected error occurred. Please try again.",
        });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg mx-auto shadow-2xl bg-card glow-on-hover">
        <CardHeader className="text-center space-y-2">
           <GraduationCap className="mx-auto h-10 w-10 text-primary" />
          <CardTitle className="text-3xl font-headline">SAMS Onboarding</CardTitle>
          <CardDescription>Register to access the Student Academic Management System.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-center mb-4">
                <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={photoPreview || ''} alt="Profile Photo" />
                    <AvatarFallback className="bg-muted">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                    </AvatarFallback>
                    </Avatar>
                    <Button type="button" variant="ghost" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8 border bg-card/80 backdrop-blur" onClick={() => fileInputRef.current?.click()}>
                        <Camera className="h-4 w-4 text-foreground" />
                    </Button>
                    <Input type="file" className="hidden" ref={fileInputRef} accept="image/*" onChange={handlePhotoChange} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" {...register('fullName')} />
                    {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="rollNumber">Roll Number</Label>
                    <Input id="rollNumber" {...register('rollNumber')} />
                    {errors.rollNumber && <p className="text-sm text-destructive">{errors.rollNumber.message}</p>}
                </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Course/Class</Label>
                    <Select onValueChange={handleCourseChange}>
                        <SelectTrigger><SelectValue placeholder="Select Course" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="B.Tech">B.Tech</SelectItem>
                            <SelectItem value="Class 12th">Class 12th</SelectItem>
                            <SelectItem value="Class 11th">Class 11th</SelectItem>
                            <SelectItem value="Class 10th">Class 10th</SelectItem>
                            <SelectItem value="Class 9th">Class 9th</SelectItem>
                        </SelectContent>
                    </Select>
                     {errors.course && <p className="text-sm text-destructive">{errors.course.message}</p>}
                </div>
                 {selectedCourse && branchOptions && (
                    <div className="space-y-2">
                        <Label>Branch / Stream</Label>
                        <Select onValueChange={(value) => setValue('branch', value)}>
                            <SelectTrigger><SelectValue placeholder="Select Branch" /></SelectTrigger>
                            <SelectContent>
                                {branchOptions.map(option => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.branch && <p className="text-sm text-destructive">{errors.branch.message}</p>}
                    </div>
                 )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email ID</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" {...register('password')} />
                    {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
                    {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
                </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-dashed border-primary-foreground"></div> : 'Register & Continue'}
            </Button>
             <div className="text-center text-sm">
                <p>Already have a SAMS account? <Link href="/sams/login" className="text-primary underline">Login here</Link></p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
