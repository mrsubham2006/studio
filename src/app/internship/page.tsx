
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Briefcase, MapPin, IndianRupee, Calendar, Search, ExternalLink, Building, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
        type: 'Internship'
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
        type: 'Internship'
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
        type: 'Internship'
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
        type: 'Internship'
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
        type: 'Internship'
    }
];

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
                        <CardHeader className="flex flex-row items-start gap-4">
                            <img src={internship.logo} alt={`${internship.company} logo`} className="h-14 w-14 rounded-md border" />
                            <div className="flex-1">
                                <CardTitle className="font-headline text-xl">{internship.title}</CardTitle>
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
                            <Button variant="ghost">View Details</Button>
                            <Button>
                                Apply Now <ExternalLink className="ml-2 h-4 w-4"/>
                            </Button>
                        </CardFooter>
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
