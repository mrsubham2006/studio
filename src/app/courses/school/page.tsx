
import Header from '@/components/Header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import productData from '@/lib/products.json';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageId: string;
};

const schoolCategories = [
    "Class 1st", "Class 2nd", "Class 3rd", "Class 4th", "Class 5th",
    "Class 6th", "Class 7th", "Class 8th", "Class 9th", "Class 10th"
];

const ProductCard = ({ product }: { product: Product }) => {
    const productImage = PlaceHolderImages.find(img => img.id === product.imageId);

    return (
        <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            <CardHeader className="p-0">
                {productImage && (
                    <Link href={`/courses/${product.id}`}>
                        <Image
                            src={productImage.imageUrl}
                            alt={product.name}
                            data-ai-hint={productImage.imageHint}
                            width={400}
                            height={225}
                            className="object-cover w-full aspect-video"
                        />
                    </Link>
                )}
            </CardHeader>
            <CardContent className="flex-1 p-4">
                <Link href={`/courses/${product.id}`}>
                    <CardTitle className="font-headline text-lg leading-tight mb-2 hover:text-primary transition-colors">{product.name}</CardTitle>
                </Link>
                <p className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">{product.description}</p>
                <p className="text-xl font-bold text-primary">₹{product.price}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                 <Button className="w-full" asChild>
                    <Link href={`/courses/${product.id}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default function SchoolCoursesPage() {
    const allProducts: Product[] = productData.products;
    const schoolProducts = allProducts.filter(p => schoolCategories.some(cat => p.category.includes(cat)));

    return (
        <>
            <Header />
            <main className="flex-1 py-12 bg-muted/40">
                <div className="container max-w-7xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl flex items-center justify-center gap-4">
                            <BookOpen className="h-10 w-10 text-primary" />
                            School Courses (1st - 10th)
                        </h1>
                        <p className="mt-2 text-muted-foreground md:text-xl">
                           Find courses and books for your class.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {schoolProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                     {schoolProducts.length === 0 && (
                        <div className="text-center py-16 text-muted-foreground">
                            <p>No products found for these classes.</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
