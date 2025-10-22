
'use client';

import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNotification } from '@/context/NotificationProvider';

export default function NotificationPage() {
    const { notifications, markAsRead, unreadCount, markAllAsRead } = useNotification();

  return (
    <>
      <Header />
      <main className="flex-1 py-12 bg-muted/40">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                <Bell className="h-8 w-8 text-primary" />
                Notifications
                </h1>
                <p className="text-muted-foreground mt-1">
                    You have {unreadCount} unread notifications.
                </p>
            </div>
            {unreadCount > 0 && (
                <Button variant="ghost" onClick={markAllAsRead}>
                    <CheckCircle className="mr-2 h-4 w-4"/>
                    Mark all as read
                </Button>
            )}
          </div>
          
          <div className="space-y-4">
            {notifications.map(notification => (
              <Card key={notification.id} className={`shadow-md transition-all ${notification.read ? 'bg-card/50 opacity-70' : 'bg-card'}`}>
                <CardHeader className="flex flex-row items-start justify-between gap-4 p-3">
                  <div>
                    <CardTitle className="font-headline text-base">{notification.title}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                        {format(new Date(notification.date), 'PPP p')}
                    </CardDescription>
                  </div>
                  {!notification.read && <Badge>New</Badge>}
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <p className="text-sm text-muted-foreground">{notification.content}</p>
                  {!notification.read && (
                    <div className="mt-2 text-right">
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
