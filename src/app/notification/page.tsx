'use client';

import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const mockNotifications = [
  {
    id: '1',
    title: 'Mid-term Exams Scheduled',
    content: 'The mid-term examinations for B.Tech 3rd Semester will commence from September 15th, 2024. Please check the SAMS portal for the detailed schedule.',
    date: '2024-08-01T10:00:00Z',
    read: false,
  },
  {
    id: '2',
    title: 'Holiday: Independence Day',
    content: 'The institute will remain closed on August 15th, 2024, on account of Independence Day.',
    date: '2024-08-10T14:30:00Z',
    read: false,
  },
  {
    id: '3',
    title: 'Workshop on AI/ML',
    content: 'A hands-on workshop on Artificial Intelligence and Machine Learning is scheduled for August 25th. Limited seats available. Register now!',
    date: '2024-08-12T09:00:00Z',
    read: true,
  },
  {
    id: '4',
    title: 'Fee Payment Reminder',
    content: 'The last date for semester fee payment without a late fine is August 20th, 2024. Please pay your fees on time to avoid penalties.',
    date: '2024-08-14T11:00:00Z',
    read: true,
  },
];

type Notification = typeof mockNotifications[0];

export default function NotificationPage() {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

    const markAsRead = (id: string) => {
        setNotifications(
            notifications.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <Header />
      <main className="flex-1 py-12 bg-muted/40">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
              <Bell className="h-8 w-8 text-primary" />
              Notifications
            </h1>
            <p className="text-muted-foreground mt-1">
                You have {unreadCount} unread notifications.
            </p>
          </div>
          
          <div className="space-y-6">
            {notifications.map(notification => (
              <Card key={notification.id} className={`shadow-md transition-all ${notification.read ? 'bg-card/50 opacity-70' : 'bg-card'}`}>
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div>
                    <CardTitle className="font-headline">{notification.title}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                        {format(new Date(notification.date), 'PPP p')}
                    </CardDescription>
                  </div>
                  {!notification.read && <Badge>New</Badge>}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{notification.content}</p>
                  {!notification.read && (
                    <div className="mt-4 text-right">
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                            <CheckCircle className="mr-2 h-4 w-4"/>
                            Mark as Read
                        </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
             {notifications.length === 0 && (
                <div className="text-center py-16 text-muted-foreground rounded-lg border-2 border-dashed">
                    <Bell className="mx-auto h-12 w-12 mb-4" />
                    <h3 className="text-lg font-semibold">No New Notifications</h3>
                    <p>You're all caught up! We'll notify you when there's something new.</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
