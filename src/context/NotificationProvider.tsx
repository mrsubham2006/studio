
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Notification = {
    id: string;
    title: string;
    content: string;
    date: string;
    read: boolean;
};

type NewNotification = Omit<Notification, 'id' | 'date' | 'read'>;

type NotificationContextType = {
    notifications: Notification[];
    addNotification: (notification: NewNotification) => void;
    markAsRead: (notificationId: string) => void;
    unreadCount: number;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        try {
            const savedNotifications = localStorage.getItem('edunex-notifications');
            const initialNotifications: Notification[] = [
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

            if (savedNotifications) {
                setNotifications(JSON.parse(savedNotifications));
            } else {
                setNotifications(initialNotifications);
            }
        } catch (error) {
            console.error("Failed to load notifications from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('edunex-notifications', JSON.stringify(notifications));
        } catch (error) {
            console.error("Failed to save notifications to localStorage", error);
        }
    }, [notifications]);

    const addNotification = (notification: NewNotification) => {
        const newNotification: Notification = {
            ...notification,
            id: new Date().getTime().toString(),
            date: new Date().toISOString(),
            read: false,
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const markAsRead = (notificationId: string) => {
        setNotifications(prev =>
            prev.map(n => (n.id === notificationId ? { ...n, read: true } : n))
        );
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, unreadCount }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
