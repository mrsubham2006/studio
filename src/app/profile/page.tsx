
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Upload, User as UserIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const idPlaceholders: { [key: string]: string } = {
    "Aadhar": "Enter your Aadhar number",
    "PAN": "Enter your PAN number",
    "Voter ID": "Enter your Voter ID number",
    "APPAR ID": "Enter your APPAR ID"
};


export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedIdType, setSelectedIdType] = useState<string | undefined>();


  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userData, isLoading: isUserDataLoading } = useDoc(userDocRef);

  useEffect(() => {
    if (userData?.govtIdType) {
        setSelectedIdType(userData.govtIdType);
    }
  }, [userData]);


  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isUserLoading || !user || isUserDataLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12">
            <div className="container max-w-4xl">
                <Skeleton className="h-8 w-1/4 mb-2" />
                <Skeleton className="h-5 w-1/2 mb-10" />
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <Skeleton className="h-32 w-32 rounded-full" />
                            <div className="flex-1 space-y-4 w-full">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-5 w-full" />
                            </div>
                        </div>
                        <Separator className="my-8" />
                         <div className="space-y-6">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                             <div className="space-y-2">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                         </div>
                    </CardContent>
                </Card>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline">My Profile</h1>
            <p className="text-muted-foreground">View and manage your personal information.</p>
          </div>
          <Card>
            <CardHeader>
                <CardTitle>Personal Details</CardTitle>
                <CardDescription>Update your photo and personal details here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <Avatar className="h-32 w-32 border-4 border-primary/20">
                  <AvatarImage src={photoPreview || userData?.photoURL || ''} alt={userData?.name || 'User'} />
                  <AvatarFallback>
                    <UserIcon className="h-16 w-16" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold">{userData?.name}</h2>
                  <p className="text-muted-foreground">{userData?.email}</p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()}>Change Photo</Button>
                <Input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/png, image/jpeg, image/gif"
                    onChange={handlePhotoChange}
                />
              </div>
              <Separator className="my-8" />
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={userData?.name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue={userData?.email} disabled />
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input id="mobileNumber" type="tel" placeholder="+91 XXXXX XXXXX" defaultValue={userData?.mobileNumber} />
                </div>
                <div className="text-right">
                    <Button>Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
                <CardTitle>Identity Verification</CardTitle>
                <CardDescription>Upload a government-issued ID for account verification.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="govtIdType">ID Type</Label>
                            <Select value={selectedIdType} onValueChange={setSelectedIdType}>
                              <SelectTrigger id="govtIdType">
                                <SelectValue placeholder="Select ID type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Aadhar">Aadhar</SelectItem>
                                <SelectItem value="PAN">PAN</SelectItem>
                                <SelectItem value="Voter ID">Voter ID</SelectItem>
                                <SelectItem value="APPAR ID">APPAR ID</SelectItem>
                              </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="govtIdNumber">ID Number</Label>
                            <Input id="govtIdNumber" placeholder={selectedIdType ? idPlaceholders[selectedIdType] : "Enter ID number"} defaultValue={userData?.govtIdNumber} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="id-proof">Upload ID Proof</Label>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="id-proof" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                    <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">SVG, PNG, JPG or PDF (MAX. 800x400px)</p>
                                </div>
                                <Input id="id-proof" type="file" className="hidden" />
                            </label>
                        </div> 
                    </div>
                    <div className="text-right">
                        <Button>Submit for Verification</Button>
                    </div>
                </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
