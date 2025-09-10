export type Submission = {
    id: string;
    taskId: string;
    taskName: string;
    store: string;
    submittedBy: string;
    date: string;
    status: 'Approved' | 'Rejected' | 'Pending Review';
    imageUrl?: string;
    imageHint?: string;
    checklist?: { id: number; text: string; checked: boolean; reason?: string }[];
    feedback?: string;
};

export const initialSubmissions: Submission[] = [
    { 
        id: 'SUB-001', 
        taskId: 'TSK-003',
        taskName: 'New Campaign POSM Setup',
        store: 'Store A', 
        submittedBy: 'User 2', 
        date: '2024-07-19', 
        status: 'Approved',
        imageUrl: 'https://picsum.photos/seed/101/800/600',
        imageHint: 'retail display',
        checklist: [
            { id: 1, text: 'Main banner is visible from entrance.', checked: true },
            { id: 2, text: 'Wobblers are attached to featured products.', checked: true },
            { id: 3, text: 'Brochures are available at the counter.', checked: true },
        ],
        feedback: 'Great work on the setup, looks fantastic!',
    },
    { 
        id: 'SUB-002', 
        taskId: 'TSK-001',
        taskName: 'Weekly Display Check',
        store: 'Store B', 
        submittedBy: 'User 4', 
        date: '2024-07-20', 
        status: 'Pending Review',
        imageUrl: 'https://picsum.photos/seed/102/800/600',
        imageHint: 'store aisle',
        checklist: [
            { id: 1, text: 'Main banner is visible from entrance.', checked: true },
            { id: 2, text: 'Promotional materials are not damaged.', checked: false, reason: 'Banner has a small tear' },
            { id: 3, text: 'All prices are correct and visible.', checked: true },
        ]
    },
    { 
        id: 'SUB-003', 
        taskId: 'TSK-003',
        taskName: 'New Campaign POSM Setup',
        store: 'Store E', 
        submittedBy: 'User 8', 
        date: '2024-07-21', 
        status: 'Rejected',
        imageUrl: 'https://picsum.photos/seed/103/800/600',
        imageHint: 'empty store',
        checklist: [
            { id: 1, text: 'Main banner is visible from entrance.', checked: false, reason: 'Banner not visible' },
            { id: 2, text: 'Wobblers are attached to featured products.', checked: true },
            { id: 3, text: 'Brochures are available at the counter.', checked: false, reason: 'No brochures found' },
        ],
        feedback: 'The main banner is not visible from the entrance, and brochures are missing. Please correct and resubmit.',
    },
];

export function getSubmissionById(id: string): Submission | undefined {
    return initialSubmissions.find(sub => sub.id === id);
}
