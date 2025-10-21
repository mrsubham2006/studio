
'use client';

import { useFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { signOut } from 'firebase/auth';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, BookOpen, FileText, CheckSquare, BarChart2, Bell, Trophy, Calendar, Upload, FileCheck } from 'lucide-react';
import SAMSLoading from './loading';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

// Mock data
const mockStudentData = {
    fullName: 'Subham Pradhan',
    course: 'B.Tech',
    branch: 'CSE',
    rollNumber: '2101340024',
    photoURL: 'https://images.unsplash.com/photo-1649768453000-07c369a51b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc21pbGluZ3xlbnwwfHx8fDE3NjA5NjgyNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

const mockAssignments = [
    { title: 'Physics: Ch 3 Problems', dueDate: '2024-08-15', pdfUrl: '#' },
    { title: 'Maths: Integration Worksheet', dueDate: '2024-08-18', pdfUrl: '#' },
];
const mockNotifications = [
    { title: 'Mid-term exams scheduled', date: '2024-08-01' },
    { title: 'Holiday: Independence Day', date: '2024-08-15' },
];
const mockAttendance = { percentage: 92 };
const mockMarks = { latestExam: 'Mid-Term 1', grade: 'A' };
const mockTimetable = [
    { day: 'Mon', time: '9:00 AM', subject: 'Physics' },
    { day: 'Tue', time: '10:00 AM', subject: 'Chemistry' },
];

export default function SAMSDashboardPage() {
    const { auth } = useFirebase();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedAssignmentTitle, setSelectedAssignmentTitle] = useState<string | null>(null);
    const [submittedAssignments, setSubmittedAssignments] = useState<string[]>([]);


    useEffect(() => {
        // Simulate loading for demo purposes
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleLogout = async () => {
        if(auth) {
            await signOut(auth);
        }
        router.push('/sams/login');
    };

    const handleUploadClick = (assignmentTitle: string) => {
        setSelectedAssignmentTitle(assignmentTitle);
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && selectedAssignmentTitle) {
            
            // For demo, we can just show a success message after a short delay
            setTimeout(() => {
                toast({
                    title: "Submission Successful!",
                    description: `Your assignment '${'\'\''}${selectedAssignmentTitle}' has been submitted.`,
                });
                setSubmittedAssignments(prev => [...prev, selectedAssignmentTitle]);
                setSelectedAssignmentTitle(null);
            }, 1000);

            // Reset file input to allow selecting the same file again
            event.target.value = '';
        }
    };


    if (isLoading) {
        return <SAMSLoading />;
    }
    
    const studentData = mockStudentData;

    return (
        <div className="min-h-screen bg-background text-foreground">
             <Input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange}
            />
            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur">
                <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-primary glow-on-hover">
                            <AvatarImage src={studentData.photoURL} alt={studentData.fullName} />
                            <AvatarFallback>{studentData.fullName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-xl font-bold font-headline">Welcome back, {studentData.fullName?.split(' ')[0]}!</h1>
                            <p className="text-sm text-muted-foreground">{studentData.course} ({studentData.branch}) - Roll: {studentData.rollNumber}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleLogout}>
                        <LogOut className="h-5 w-5" />
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container max-w-7xl mx-auto p-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Feature Cards */}
                    <DashboardCard title="Assignments" icon={BookOpen} className="md:col-span-2">
                         <div className="space-y-4">
                            {mockAssignments.map(assignment => {
                                const isSubmitted = submittedAssignments.includes(assignment.title);
                                return (
                                    <div key={assignment.title} className="p-3 bg-muted/50 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div>
                                            <p className="font-semibold">{assignment.title}</p>
                                            <Badge variant="outline" className="mt-1">Due: {assignment.dueDate}</Badge>
                                        </div>
                                        <Button size="sm" variant={isSubmitted ? "default" : "secondary"} onClick={() => !isSubmitted && handleUploadClick(assignment.title)} disabled={isSubmitted}>
                                            {isSubmitted ? <FileCheck className="mr-2 h-4 w-4"/> : <Upload className="mr-2 h-4 w-4" />}
                                            {isSubmitted ? 'Submitted!' : 'Upload Submission'}
                                        </Button>
                                    </div>
                                );
                            })}
                         </div>
                    </DashboardCard>
                     <DashboardCard title="Exam Papers" icon={FileText} href="#">
                        <p className="text-sm text-muted-foreground">Past year and upcoming exam papers.</p>
                    </DashboardCard>
                     <DashboardCard title="Notes & Syllabus" icon={CheckSquare} href="#">
                        <p className="text-sm text-muted-foreground">Downloadable materials for your courses.</p>
                    </DashboardCard>
                     <DashboardCard title="Marks & Attendance" icon={BarChart2} href="#">
                         <div className="flex justify-around text-center">
                             <div>
                                 <p className="text-2xl font-bold">{mockAttendance.percentage}%</p>
                                 <p className="text-xs text-muted-foreground">Attendance</p>
                             </div>
                             <div>
                                 <p className="text-2xl font-bold">{mockMarks.grade}</p>
                                 <p className="text-xs text-muted-foreground">{mockMarks.latestExam}</p>
                             </div>
                         </div>
                    </DashboardCard>
                     <DashboardCard title="Notifications" icon={Bell} className="lg:col-span-2">
                        <ul className="space-y-2 text-sm">
                            {mockNotifications.map(n => <li key={n.title} className="flex justify-between"><span>{n.title}</span> <span className="text-muted-foreground">{n.date}</span></li>)}
                         </ul>
                    </DashboardCard>
                     <DashboardCard title="Extra Curricular" icon={Trophy} href="#">
                        <p className="text-sm text-muted-foreground">Event notices and registrations.</p>
                    </DashboardCard>
                     <DashboardCard title="Time Table" icon={Calendar} href="#">
                        <p className="text-sm text-muted-foreground">Your weekly class schedule.</p>
                    </DashboardCard>
                </div>
            </main>
        </div>
    );
}


type DashboardCardProps = {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    href?: string;
    className?: string;
}

const DashboardCard = ({ title, icon: Icon, children, href, className }: DashboardCardProps) => {
    const content = (
        <Card className={`bg-card glow-on-hover transition-all duration-300 ${'\'\''}${href ? 'hover:-translate-y-1' : ''}${'\'\''} ${'\'\''}${className}${'\'\''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium font-headline">{title}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );

    return href ? <a href={href}>{content}</a> : content;
}
