
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const scholarships = [
    {
        title: 'e-Medhabruti Scholarship',
        provider: 'Government of Odisha',
        description: 'A merit-based scholarship for students pursuing higher education in general, technical, and professional courses.',
        eligibility: 'Varies by course, typically based on academic merit.',
        link: 'https://scholarship.odisha.gov.in/'
    },
    {
        title: 'Prerana Post-Matric Scholarship',
        provider: 'ST & SC Development Department',
        description: 'Financial assistance for ST, SC, OBC/SEBC, and EBC students studying at post-matriculation or post-secondary stages.',
        eligibility: 'Students belonging to eligible communities with specified annual family income.',
        link: 'https://scholarship.odisha.gov.in/'
    },
    {
        title: 'Kalia Chhatra Bruti',
        provider: 'Agriculture & Farmers\' Empowerment Dept.',
        description: 'Scholarship for children of farmers under the KALIA scheme to pursue professional/technical courses.',
        eligibility: 'Children of KALIA scheme beneficiaries admitted to government institutions.',
        link: 'https://scholarship.odisha.gov.in/'
    },
    {
        title: 'Biju Yuba Sashaktikaran Yojana',
        provider: 'Sports & Youth Services Department',
        description: 'One-time financial assistance to meritorious students for purchasing laptops.',
        eligibility: 'Top students who passed the annual +2 Science, Arts, Commerce & Vocational exams.',
        link: 'https://dhe.odisha.gov.in/laptop-distribution-scheme'
    },
    {
        title: 'Gopabandhu Sikhya Sahayata Yojana',
        provider: 'Higher Education Department',
        description: 'Financial aid to students pursuing UG/PG courses whose families are affected by HIV/AIDS, single mothers, or other vulnerabilities.',
        eligibility: 'Students from specified vulnerable backgrounds enrolled in government colleges.',
        link: 'https://scholarship.odisha.gov.in/'
    }
];

export default function ScholarshipPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-12 bg-muted/40">
        <div className="container max-w-5xl">
            <div className="text-center mb-12">
                <GraduationCap className="mx-auto h-12 w-12 text-primary mb-4" />
                <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
                    Odisha State Scholarships
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
                    Explore various scholarship opportunities provided by the Government of Odisha to support your educational journey.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {scholarships.map((scholarship, index) => (
                    <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">{scholarship.title}</CardTitle>
                            <CardDescription>{scholarship.provider}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-sm text-muted-foreground mb-4">{scholarship.description}</p>
                            <p className="text-sm"><span className='font-semibold'>Eligibility:</span> {scholarship.eligibility}</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={scholarship.link} target="_blank" rel="noopener noreferrer">
                                    Apply Now
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      </main>
    </>
  );
}
