'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartProvider';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Course = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageId: string;
};

export default function CourseDetailsClient({ course }: { course: Course }) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const handleBuyNow = () => {
    // Add to cart and redirect to checkout
    addItem(course, 1);
    router.push('/checkout');
  };

  const handleAddToCart = () => {
    addItem(course, 1);
    toast({
      title: "Added to Cart!",
      description: `${course.name} has been added to your cart.`,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Button size="lg" onClick={handleBuyNow}>Buy Now</Button>
      <Button size="lg" variant="outline" onClick={handleAddToCart}>
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
}
