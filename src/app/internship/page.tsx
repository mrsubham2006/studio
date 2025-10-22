
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Briefcase, MapPin, IndianRupee, Calendar, Search, ExternalLink, Building, PlayCircle, Star, Sparkles, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useNotification } from '@/context/NotificationProvider';

const mockInternships = [
    {
        id: 1,
        title: 'Frontend Developer Intern',
        company: 'InnovateTech',
        logo: 'https://placehold.co/100x100/6300EE/FFFFFF/png?text=IT',
        location: 'Work From Home',
        stipend: '15,000 - 20,000',
        duration: '3 Months',
        applyBy: '30 Aug 2024',
        type: 'Internship',
        aboutCompany: 'InnovateTech is a leading provider of cloud-based solutions, helping businesses transform their operations. We are a fast-paced, innovative company looking for talented individuals to join our team.',
        description: 'This is an exciting opportunity for a Frontend Developer Intern to work on our flagship product. You will be involved in developing new user-facing features, building reusable components, and optimizing applications for maximum speed and scalability.',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
        responsibilities: [
            'Develop new user-facing features using React.js',
            'Build reusable components and front-end libraries for future use',
            'Translate designs and wireframes into high-quality code',
            'Collaborate with other team members and stakeholders'
        ],
        perks: ['Certificate', 'Letter of recommendation', 'Flexible work hours']
    },
    {
        id: 2,
        title: 'Backend Developer (Node.js)',
        company: 'DataSolutions',
        logo: 'https://placehold.co/100x100/2962FF/FFFFFF/png?text=DS',
        location: 'Bhubaneswar',
        stipend: '18,000',
        duration: '4 Months',
        applyBy: '25 Aug 2024',
        type: 'Internship',
        aboutCompany: 'DataSolutions specializes in big data analytics and business intelligence. We help companies make data-driven decisions.',
        description: 'We are looking for a Backend Developer Intern to join our team. You will work with our team of engineers to build and maintain our data processing pipelines and APIs.',
        skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
        responsibilities: [
            'Design and implement RESTful APIs',
            'Work with databases to store and retrieve data',
            'Write clean, maintainable, and efficient code',
            'Participate in code reviews'
        ],
        perks: ['Certificate', '5 days a week', 'Informal dress code']
    },
    {
        id: 3,
        title: 'UI/UX Design Intern',
        company: 'CreativeMinds',
        logo: 'https://placehold.co/100x100/F3E5F5/6200EE/png?text=CM',
        location: 'Work From Home',
        stipend: '12,000',
        duration: '2 Months',
        applyBy: '5 Sep 2024',
        type: 'Internship',
        aboutCompany: 'A digital design agency that helps startups and established companies create beautiful and user-friendly products.',
        description: 'As a UI/UX Design Intern, you will work closely with our product team to design and prototype new features. You will be responsible for creating user flows, wireframes, and high-fidelity mockups.',
        skills: ['Figma', 'Adobe XD', 'UI/UX Design Principles'],
        responsibilities: [
            'Create wireframes, storyboards, user flows, and site maps',
            'Design graphic user interface elements, like menus, tabs, and widgets',
            'Conduct user research and evaluate user feedback'
        ],
        perks: ['Certificate', 'Flexible work hours']
    },
    {
        id: 4,
        title: 'Civil Engineering Intern',
        company: 'InfraBuilders',
        logo: 'https://placehold.co/100x100/455A64/FFFFFF/png?text=IB',
        location: 'Cuttack',
        stipend: '10,000',
        duration: '6 Months',
        applyBy: '1 Sep 2024',
        type: 'Internship',
        aboutCompany: 'InfraBuilders is a leading construction company in Odisha, specializing in large-scale infrastructure projects.',
        description: 'This internship offers hands-on experience at a live construction site. You will assist site engineers in project execution, quality control, and daily monitoring.',
        skills: ['AutoCAD', 'Site Supervision', 'Structural Basics'],
        responsibilities: [
            'Assist in site supervision and management',
            'Help with material quantity estimation and quality checks',
            'Prepare daily progress reports'
        ],
        perks: ['Certificate', 'On-site experience']
    },
    {
        id: 5,
        title: 'Digital Marketing Specialist',
        company: 'GrowFast',
        logo: 'https://placehold.co/100x100/FFD600/000000/png?text=GF',
        location: 'Work From Home',
        stipend: '8,000 - 12,000',
        duration: '3 Months',
        applyBy: '10 Sep 2024',
        type: 'Internship',
        aboutCompany: 'GrowFast is a digital marketing agency helping brands grow their online presence through SEO, SMM, and content marketing.',
        description: 'You will work on live client projects, assisting with social media campaigns, content creation, and performance analysis.',
        skills: ['Social Media Marketing', 'Content Writing', 'SEO Basics'],
        responsibilities: [
            'Manage social media handles for clients',
            'Create engaging content for blogs and social media',
            'Analyze campaign performance and create reports'
        ],
        perks: ['Certificate', 'Letter of recommendation', 'Performance bonus']
    }
];

const ApplyDialog = ({ title, company }: { title: string, company: string }) => {
    const { toast } = useToast();
    const { addNotification } = useNotification();
    const [isApplied, setIsApplied] = useState(false);

    const handleApply = () => {
        // Simulate API call
        toast({
            title: "Application Sent!",
            description: `Your application for ${title} at ${company} has been submitted.`,
        });

        // Add a persistent notification
        addNotification({
            title: 'Application Submitted',
            content: `You have successfully applied for the ${title} role at ${company}.`,
        });

        setIsApplied(true);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                 <Button disabled={isApplied}>
                    {isApplied ? <CheckCircle className="mr-2 h-4 w-4" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                    {isApplied ? 'Applied' : 'Apply Now'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apply to {company}</DialogTitle>
                    <DialogDescription>You are applying for the role of <span className="font-semibold text-foreground">{title}</span>.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-muted-foreground">This is a mock application. Clicking confirm will simulate sending your profile to the recruiter.</p>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                     <DialogClose asChild>
                        <Button onClick={handleApply}>Confirm & Apply</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function InternshipPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    const filteredInternships = mockInternships.filter(internship => {
        const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) || internship.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = internship.location.toLowerCase().includes(locationFilter.toLowerCase());
        return matchesSearch && matchesLocation;
    });

  return (
    <>
      <Header />
      <main className="flex-1 py-12 bg-muted/40">
        <div className="container max-w-6xl">
            <div className="text-center mb-12">
                <Briefcase className="mx-auto h-12 w-12 text-primary mb-4" />
                <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
                    Internship Opportunities
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                    Find your next career move. Apply to internships from top companies.
                </p>
            </div>

            <Card className="mb-8 shadow-lg">
                <CardContent className="p-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="e.g. Web Developer, Marketing, ..." 
                            className="pl-10 h-11"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="e.g. Bhubaneswar, Work From Home" 
                            className="pl-10 h-11"
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                {filteredInternships.map(internship => (
                    <Card key={internship.id} className="shadow-md hover:shadow-xl transition-shadow duration-300">
                         <Dialog>
                            <CardHeader className="flex flex-row items-start gap-4">
                                <img src={internship.logo} alt={`${''}${internship.company} logo${''}`} className="h-14 w-14 rounded-md border" />
                                <div className="flex-1">
                                    <DialogTrigger asChild>
                                        <h3 className="font-headline text-xl hover:text-primary cursor-pointer">{internship.title}</h3>
                                    </DialogTrigger>
                                    <CardDescription className="flex items-center gap-2">
                                        <Building className="h-4 w-4" /> 
                                        {internship.company}
                                    </CardDescription>
                                </div>
                                <Badge variant="outline">{internship.type}</Badge>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4 text-primary"/>
                                    <span>{internship.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <IndianRupee className="h-4 w-4 text-primary"/>
                                    <span>{internship.stipend} /month</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4 text-primary"/>
                                    <span>{internship.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <PlayCircle className="h-4 w-4 text-primary"/>
                                    <span>Apply by {internship.applyBy}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                 <DialogTrigger asChild>
                                    <Button variant="ghost">View Details</Button>
                                </DialogTrigger>
                                <ApplyDialog title={internship.title} company={internship.company} />
                            </CardFooter>
                            <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                <DialogTitle className="text-2xl font-headline">{internship.title}</DialogTitle>
                                <DialogDescription className="flex items-center gap-2 pt-1">
                                    <Building className="h-4 w-4" /> 
                                    {internship.company}
                                </DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-6 max-h-[70vh] overflow-y-auto pr-6">
                                    <div>
                                        <h4 className="font-semibold mb-2">About {internship.company}</h4>
                                        <p className="text-sm text-muted-foreground">{internship.aboutCompany}</p>
                                    </div>
                                    <Separator/>
                                    <div>
                                        <h4 className="font-semibold mb-2">Job Description</h4>
                                        <p className="text-sm text-muted-foreground">{internship.description}</p>
                                    </div>
                                     <Separator/>
                                    <div>
                                        <h4 className="font-semibold mb-2">Skills Required</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {internship.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                                        </div>
                                    </div>
                                    <Separator/>
                                     <div>
                                        <h4 className="font-semibold mb-2">Responsibilities</h4>
                                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                           {internship.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                                        </ul>
                                    </div>
                                    <Separator/>
                                    <div>
                                        <h4 className="font-semibold mb-2">Perks</h4>
                                         <div className="flex flex-wrap gap-2">
                                            {internship.perks.map(perk => (
                                                <div key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Sparkles className="h-4 w-4 text-yellow-500" />
                                                    <span>{perk}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <ApplyDialog title={internship.title} company={internship.company} />
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </Card>
                ))}
            </div>

            {filteredInternships.length === 0 && (
                <div className="text-center py-16 text-muted-foreground rounded-lg border-2 border-dashed">
                    <Search className="mx-auto h-12 w-12 mb-4" />
                    <h3 className="text-lg font-semibold">No Internships Found</h3>
                    <p>Try adjusting your search filters to find more opportunities.</p>
                </div>
            )}
        </div>
      </main>
    </>
  );
}

    