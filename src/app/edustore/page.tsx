
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import productData from '@/lib/products.json';
import Image from 'next/image';
import { ShoppingCart, Search, Plus, Minus, ShoppingBag, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartProvider';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
    const { addItem } = useCart();
    const productImage = PlaceHolderImages.find(img => img.id === product.imageId);

    const handleAddToCart = () => {
        addItem(product, quantity);
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
                        height={225}
                        className="object-cover w-full aspect-video"
                    />
                )}
            </CardHeader>
            <CardContent className="flex-1 p-4">
                <CardTitle className="font-headline text-lg leading-tight mb-2">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">{product.description}</p>
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

const CartSheet = () => {
    const { items, removeItem, updateQuantity, total, itemCount } = useCart();
    return (
         <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {itemCount > 0 && <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">{itemCount}</span>}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                    <SheetDescription>
                        Review your items before proceeding to checkout.
                    </SheetDescription>
                </SheetHeader>
                <div className="flex-1">
                    {items.length > 0 ? (
                    <ScrollArea className="h-full pr-4">
                        <div className="flex flex-col gap-4">
                            {items.map(item => (
                                <div key={item.id} className="flex items-start gap-4">
                                     <Image
                                        src={PlaceHolderImages.find(img => img.id === item.imageId)?.imageUrl || ''}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="rounded-md object-cover"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold">{item.name}</h4>
                                        <p className="text-sm text-muted-foreground">Price: ₹{item.price}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                            <ShoppingBag className="h-16 w-16 mb-4" />
                            <h3 className="text-lg font-semibold">Your cart is empty</h3>
                            <p className="text-sm">Add some items to get started!</p>
                        </div>
                    )}
                </div>
                {items.length > 0 && (
                    <SheetFooter className="pt-4">
                        <div className="w-full space-y-4">
                            <Separator />
                            <div className="flex justify-between items-center text-lg font-semibold">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                            <Button asChild className="w-full" size="lg">
                                <Link href="/checkout">Proceed to Checkout</Link>
                            </Button>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    )
}

export default function EduStorePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const allProducts: Product[] = productData.products;
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';


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
                    <div className="flex items-center justify-between mb-12">
                        <div className="text-left">
                            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl flex items-center gap-4">
                                <ShoppingCart className="h-10 w-10 text-primary" />
                                EduStore
                            </h1>
                            <p className="mt-2 text-muted-foreground md:text-xl">
                                All your learning essentials, in one place.
                            </p>
                        </div>
                        <CartSheet />
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

                    <Tabs defaultValue={initialCategory} className="w-full">
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
