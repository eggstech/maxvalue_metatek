export type Notification = {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    isRead: boolean;
    link?: string;
};

export const notifications: Notification[] = [
    {
        id: '1',
        title: 'Submission Approved',
        description: 'Your submission for "New Campaign POSM Setup" at Store A was approved.',
        timestamp: '5 minutes ago',
        isRead: false,
        link: '/submissions/SUB-001',
    },
    {
        id: '2',
        title: 'New Task Assigned',
        description: 'You have been assigned a new task: "Urgent Stock Check".',
        timestamp: '1 hour ago',
        isRead: false,
        link: '/tasks/TSK-008', // Assuming this task exists
    },
    {
        id: '3',
        title: 'Submission Rejected',
        description: 'Your submission for "Weekly Display Check" at Store C needs rework.',
        timestamp: '3 hours ago',
        isRead: false,
        link: '/submissions/SUB-002',
    },
    {
        id: '4',
        title: 'Task Overdue',
        description: 'The task "Cleanliness Audit Photo" is now overdue.',
        timestamp: '1 day ago',
        isRead: true,
        link: '/tasks/TSK-007',
    },
    {
        id: '5',
        title: 'System Maintenance',
        description: 'Scheduled maintenance will occur tonight at 2 AM.',
        timestamp: '2 days ago',
        isRead: true,
    },
];
