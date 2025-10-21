
'use client';

import { useState, useRef } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartProvider';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { CreditCard, Home, ShoppingBag, Truck, User, Banknote, Landmark, Upload, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const addressSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Must be a valid 10-digit mobile number'),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, 'Must be a valid 6-digit pin code'),
  city: z.string().min(2, 'City is required'),
  houseNo: z.string().min(1, 'House number is required'),
  area: z.string().min(3, 'Area or street is required'),
});

type AddressFormInputs = z.infer<typeof addressSchema>;

const STEPS = [
  { id: 'cart', name: 'Review Cart', icon: ShoppingBag },
  { id: 'address', name: 'Shipping Address', icon: Home },
  { id: 'payment', name: 'Payment', icon: CreditCard },
  { id: 'confirmation', name: 'Order Confirmed', icon: Truck },
];

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const { toast } = useToast();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState('address');
    const [address, setAddress] = useState<AddressFormInputs | null>(null);
    const upiQrImage = PlaceHolderImages.find(img => img.id === 'upi-qr-code');
    const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
    const screenshotInputRef = useRef<HTMLInputElement>(null);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddressFormInputs>({
        resolver: zodResolver(addressSchema),
    });

    const onAddressSubmit: SubmitHandler<AddressFormInputs> = (data) => {
        setAddress(data);
        setCurrentStep('payment');
    };

    const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setScreenshotFile(file);
        }
    };


    const handlePayment = () => {
        // Simulate payment success
        clearCart();
        toast({
            title: 'Order Placed!',
            description: 'Your order has been successfully placed.',
            duration: 2000,
        });

        // Add a new order to mock data for demonstration
        const newOrder = {
             id: `EDUNEX-${Math.floor(Math.random() * 9000) + 1000}`,
             date: new Date().toISOString(),
             status: 'Processing',
             estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
             total: total,
             items: items.map(i => ({ name: i.name, quantity: i.quantity})),
             trackingHistory: [
                 { date: new Date().toISOString(), status: 'Order Confirmed', location: 'EduNex Store' },
             ]
        };

        try {
            const existingOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
            localStorage.setItem('mockOrders', JSON.stringify([newOrder, ...existingOrders]));
        } catch (error) {
            console.error("Could not update mock orders in localStorage", error);
        }

        setCurrentStep('confirmation');

        setTimeout(() => {
            router.push('/orders');
        }, 3000);
    };

    const currentStepIndex = STEPS.findIndex(step => step.id === currentStep);
    
    return (
        <>
            <Header />
            <main className="flex-1 py-12 bg-muted/40">
                <div className="container max-w-5xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold font-headline">Checkout</h1>
                        <p className="text-muted-foreground">Complete your purchase</p>
                    </div>

                    <div className="mb-8">
                        <ol className="flex items-center w-full">
                            {STEPS.map((step, index) => (
                                <li key={step.id} className={cn(
                                    "flex w-full items-center",
                                    index < STEPS.length - 1 ? "after:content-[''] after:w-full after:h-1 after:border-b-2 after:border-border after:inline-block" : "",
                                    index <= currentStepIndex && "after:border-primary"
                                )}>
                                    <div className="flex flex-col items-center">
                                        <span className={cn(
                                            "flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 border-2",
                                            index <= currentStepIndex ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border"
                                        )}>
                                            <step.icon className="w-5 h-5" />
                                        </span>
                                        <span className="hidden md:block text-sm mt-2 text-center">{step.name}</span>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                             {currentStep === 'address' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Shipping Address</CardTitle>
                                        <CardDescription>Enter your delivery information.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form id="address-form" onSubmit={handleSubmit(onAddressSubmit)} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input id="name" {...register('name')} />
                                                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="mobile">Mobile Number</Label>
                                                    <Input id="mobile" type="tel" {...register('mobile')} />
                                                    {errors.mobile && <p className="text-sm text-destructive">{errors.mobile.message}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="pincode">Pin Code</Label>
                                                    <Input id="pincode" {...register('pincode')} />
                                                    {errors.pincode && <p className="text-sm text-destructive">{errors.pincode.message}</p>}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="houseNo">House No., Building Name</Label>
                                                <Input id="houseNo" {...register('houseNo')} />
                                                {errors.houseNo && <p className="text-sm text-destructive">{errors.houseNo.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="area">Area, Street, Village</Label>
                                                <Input id="area" {...register('area')} />
                                                {errors.area && <p className="text-sm text-destructive">{errors.area.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="city">City/District</Label>
                                                <Input id="city" {...register('city')} />
                                                {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                                            </div>
                                        </form>
                                    </CardContent>
                                    <CardFooter>
                                        <Button type="submit" form="address-form" size="lg">Continue to Payment</Button>
                                    </CardFooter>
                                </Card>
                             )}
                             {currentStep === 'payment' && (
                                 <Card>
                                    <CardHeader>
                                        <CardTitle>Payment Details</CardTitle>
                                        <CardDescription>Choose your payment method.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Tabs defaultValue="upi" className="w-full">
                                            <TabsList className='grid w-full grid-cols-4'>
                                                <TabsTrigger value="upi">UPI / QR</TabsTrigger>
                                                <TabsTrigger value="card">Card</TabsTrigger>
                                                <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                                                <TabsTrigger value="cod">COD</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="upi" className="mt-6">
                                                <div className='flex flex-col items-center gap-6'>
                                                    <p className='text-muted-foreground'>Scan the QR code with any UPI app to pay.</p>
                                                    {upiQrImage && (
                                                        <Image 
                                                            src={upiQrImage.imageUrl}
                                                            alt={upiQrImage.description}
                                                            data-ai-hint={upiQrImage.imageHint}
                                                            width={300}
                                                            height={300}
                                                            className='rounded-lg border-4 border-white shadow-lg'
                                                        />
                                                    )}
                                                     <p className='text-sm text-muted-foreground'>UPI ID: pradhansubham024-1@oksbi</p>
                                                      <div className="w-full max-w-sm space-y-2">
                                                        <Label htmlFor="screenshot-upload" className="sr-only">Upload Screenshot</Label>
                                                        <div className="flex items-center justify-center w-full">
                                                            <label htmlFor="screenshot-upload" className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                                                {screenshotFile ? (
                                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-primary">
                                                                        <FileCheck className="w-8 h-8 mb-2" />
                                                                        <p className="font-semibold text-sm truncate">{screenshotFile.name}</p>
                                                                        <p className="text-xs text-muted-foreground">Click to change</p>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                                                        <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold">Upload Screenshot</span></p>
                                                                        <p className="text-xs text-muted-foreground">PNG, JPG or GIF</p>
                                                                    </div>
                                                                )}
                                                                <Input id="screenshot-upload" type="file" className="hidden" ref={screenshotInputRef} onChange={handleScreenshotChange} accept="image/png, image/jpeg, image/gif" />
                                                            </label>
                                                        </div> 
                                                    </div>
                                                     <Button onClick={handlePayment} size="lg">Confirm Payment</Button>
                                                </div>
                                            </TabsContent>
                                            <TabsContent value="card">
                                                 <Alert variant="destructive">
                                                    <CreditCard className="h-4 w-4" />
                                                    <AlertTitle>Under Development</AlertTitle>
                                                    <AlertDescription>
                                                        This payment method is not yet available. Please use UPI.
                                                    </AlertDescription>
                                                </Alert>
                                            </TabsContent>
                                             <TabsContent value="netbanking">
                                                <Alert variant="destructive">
                                                    <Landmark className="h-4 w-4" />
                                                    <AlertTitle>Under Development</AlertTitle>
                                                    <AlertDescription>
                                                        This payment method is not yet available. Please use UPI.
                                                    </AlertDescription>
                                                </Alert>
                                            </TabsContent>
                                             <TabsContent value="cod">
                                                <Alert variant="destructive">
                                                    <Banknote className="h-4 w-4" />
                                                    <AlertTitle>Under Development</AlertTitle>
                                                    <AlertDescription>
                                                        Cash on Delivery is not yet available. Please use UPI.
                                                    </AlertDescription>
                                                </Alert>
                                            </TabsContent>
                                        </Tabs>
                                    </CardContent>
                                    <CardFooter>
                                         <Button variant="outline" onClick={() => setCurrentStep('address')}>Back to Address</Button>
                                    </CardFooter>
                                </Card>
                             )}
                             {currentStep === 'confirmation' && (
                                <Card className="text-center">
                                    <CardHeader>
                                        <Truck className="mx-auto h-16 w-16 text-green-500" />
                                        <CardTitle className="text-2xl mt-4">Order Placed Successfully!</CardTitle>
                                        <CardDescription>
                                            Thank you for your purchase. You will be redirected to your orders page shortly.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>Order ID: EDUNEX-{Math.floor(Math.random() * 9000) + 1000}</p>
                                        <p className="mt-4">A confirmation has been sent to your email.</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button asChild className="mx-auto">
                                            <Link href="/orders">View My Orders</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                             )}
                        </div>
                        <div className="md:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {items.map(item => (
                                        <div key={item.id} className="flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={PlaceHolderImages.find(img => img.id === item.imageId)?.imageUrl || ''}
                                                    alt={item.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-md object-cover"
                                                />
                                                <span className="flex-1">{item.name} x {item.quantity}</span>
                                            </div>
                                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <Separator />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>₹{total.toFixed(2)}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
