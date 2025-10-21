
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Truck, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const mockOrders = [
  {
    id: 'EDUNEX-8924',
    date: '2024-07-20T10:30:00Z',
    status: 'Delivered',
    estimatedDelivery: '2024-07-25',
    total: 1050,
    items: [
      { name: 'Comprehensive Physics Guide', quantity: 1 },
      { name: 'Premium Pen Set', quantity: 4 },
    ],
    trackingHistory: [
      { date: '2024-07-25T14:00:00Z', status: 'Delivered', location: 'Your Location' },
      { date: '2024-07-25T08:00:00Z', status: 'Out for Delivery', location: 'Local Hub' },
      { date: '2024-07-23T18:00:00Z', status: 'In Transit', location: 'Regional Hub' },
      { date: '2024-07-21T11:00:00Z', status: 'Shipped', location: 'Warehouse' },
      { date: '2024-07-20T10:30:00Z', status: 'Order Confirmed', location: 'EduNex Store' },
    ],
  },
  {
    id: 'EDUNEX-7561',
    date: '2024-07-28T15:00:00Z',
    status: 'Shipped',
    estimatedDelivery: '2024-08-02',
    total: 650,
    items: [
      { name: 'IIT-JEE Advanced Chemistry', quantity: 1 },
    ],
    trackingHistory: [
      { date: '2024-07-29T09:00:00Z', status: 'Shipped', location: 'Warehouse' },
      { date: '2024-07-28T15:00:00Z', status: 'Order Confirmed', location: 'EduNex Store' },
    ],
  },
];

const statusStyles: { [key: string]: string } = {
  'Delivered': 'bg-green-500/10 text-green-500 border-green-500/20',
  'Shipped': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'Processing': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'Cancelled': 'bg-red-500/10 text-red-500 border-red-500/20'
};

const statusIcons: { [key: string]: React.ElementType } = {
    'Delivered': CheckCircle,
    'Shipped': Truck,
    'Processing': Package,
    'Order Confirmed': Package,
    'In Transit': Truck,
    'Out for Delivery': Truck,
}

export default function MyOrdersPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline">My Orders</h1>
            <p className="text-muted-foreground">Track your recent purchases and view order history.</p>
          </div>
          
          <div className="space-y-8">
            {mockOrders.map(order => (
              <Card key={order.id} className="shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-headline">Order #{order.id}</CardTitle>
                      <CardDescription>Placed on {format(new Date(order.date), 'PPP')}</CardDescription>
                    </div>
                    <Badge variant="outline" className={cn("text-sm", statusStyles[order.status])}>{order.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-2">Items</h4>
                    <ul className="list-disc pl-5 text-muted-foreground">
                      {order.items.map(item => (
                        <li key={item.name}>{item.quantity}x {item.name}</li>
                      ))}
                    </ul>
                  </div>
                  <Separator className="my-6" />
                  <div>
                    <h4 className="font-semibold mb-4">Tracking History</h4>
                    <div className="relative">
                        <div className="absolute left-3.5 top-0 h-full w-0.5 bg-border" aria-hidden="true" />
                        <ul className="space-y-8">
                            {order.trackingHistory.map((event, index) => {
                                const Icon = statusIcons[event.status] || Package;
                                return (
                                    <li key={index} className="relative flex items-start gap-4">
                                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                            <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20" />
                                            <Icon className="absolute h-4 w-4 text-primary-foreground"/>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{event.status}</p>
                                            <p className="text-sm text-muted-foreground">{event.location}</p>
                                            <time className="text-xs text-muted-foreground/80">{format(new Date(event.date), 'PPpp')}</time>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-muted/50 py-4 px-6">
                  <div className="text-sm">
                    Estimated Delivery: <span className="font-semibold">{format(new Date(order.estimatedDelivery), 'PPP')}</span>
                  </div>
                  <div className="text-lg font-bold">
                    Total: ₹{order.total.toFixed(2)}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {mockOrders.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Package className="mx-auto h-12 w-12 mb-4" />
              <h3 className="text-lg font-semibold">No Orders Yet</h3>
              <p>You haven't placed any orders. Start shopping in the EduStore!</p>
              <Button variant="outline" className="mt-4" asChild>
                <a href="/edustore">Go to EduStore</a>
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
