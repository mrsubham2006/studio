
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import productData from '@/lib/products.json';
import Image from 'next/image';
import { ShoppingCart, Search, Plus, Minus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from '@/hooks/use-toast';


type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageId: string;
};

const ProductCard = ({ product }: { product: Product }) => {
    const [quantity, setQuantity] = useState(1);
    const { toast } = useToast();
    const productImage = PlaceHolderImages.find(img => img.id === product.imageId);

    const handleAddToCart = () => {
        toast({
            title: "Added to Cart!",
            description: `${quantity} x ${product.name} has been added to your cart.`,
        });
    };

    return (
        <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            <CardHeader className="p-0">
                {productImage && (
                    <Image
                        src={productImage.imageUrl}
                        alt={product.name}
                        data-ai-hint={productImage.imageHint}
                        width={400}
                        height={400}
                        className="object-cover w-full h-56"
                    />
                )}
            </CardHeader>
            <CardContent className="flex-1 p-4">
                <CardTitle className="font-headline text-lg leading-tight mb-2">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                <p className="text-xl font-bold text-primary">₹{product.price}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex-col items-start gap-4">
                 <div className="flex items-center gap-2 w-full">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Input type="number" value={quantity} readOnly className="h-8 w-12 text-center" />
                     <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => q + 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <Button className="w-full" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
};

export default function EduStorePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const allProducts: Product[] = productData.products;

    const categories = ["All", ...new Set(allProducts.map(p => p.category))];

    const filterProducts = (category: string) => {
        let products = category === 'All' ? allProducts : allProducts.filter(p => p.category === category);
        if (searchTerm) {
            products = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return products;
    };

    return (
        <>
            <Header />
            <main className="flex-1">
                <div className="container max-w-7xl py-12">
                    <div className="text-center mb-12">
                        <ShoppingCart className="mx-auto h-12 w-12 text-primary" />
                        <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl mt-4">
                            EduStore
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                            All your learning essentials, in one place.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search for products..."
                                className="pl-9 h-12"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <Tabs defaultValue="All" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8">
                            {categories.map(category => (
                                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                            ))}
                        </TabsList>
                        {categories.map(category => (
                            <TabsContent key={category} value={category}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filterProducts(category).map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                                {filterProducts(category).length === 0 && (
                                    <div className="text-center py-16 text-muted-foreground">
                                        <p>No products found in this category.</p>
                                    </div>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>

                </div>
            </main>
        </>
    );
}
