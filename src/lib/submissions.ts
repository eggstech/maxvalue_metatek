

import { Requirement } from "./tasks";

export type SubmissionResult = {
    requirementId: number; // Corresponds to the index in the task's requirements array
    type: Requirement['type'];
    value: any; // Could be a string (data-entry), an array of image URLs, or an array of booleans (checklist)
    imageUrl?: string;
    imageHint?: string;
    checklist?: { id: number; text: string; pass: boolean; checked?: boolean, reason?: string }[];
};


export type Submission = {
    id: string;
    taskId: string;
    taskName: string;
    store: string;
    submittedBy: string;
    date: string;
    status: 'Approved' | 'Rejected' | 'Pending Review';
    submissionTime: string; // e.g. "2 hours ago" for display
    results: SubmissionResult[];
    feedback?: string;
    imageUrl?: string; // Main image for display if available
    imageHint?: string; // AI hint for the main image
    checklist?: { id: number; text: string; checked: boolean; reason?: string }[];
};

export const initialSubmissions: Submission[] = [
    { 
        id: 'SUB-001', 
        taskId: 'TSK-003',
        taskName: 'New Campaign POSM Setup',
        store: 'Store A', 
        submittedBy: 'User 2', 
        date: '2024-07-19', 
        status: 'Pending Review',
        submissionTime: '2 hours ago',
        imageUrl: 'https://picsum.photos/seed/101/800/600',
        imageHint: 'retail display',
        results: [
            {
                requirementId: 0,
                type: 'image',
                value: ['https://picsum.photos/seed/101/800/600', 'https://picsum.photos/seed/111/800/600'],
            },
            {
                requirementId: 1,
                type: 'checklist',
                value: [
                    { text: 'Main banner is visible from entrance.', pass: true },
                    { text: 'Wobblers are attached to featured products.', pass: true },
                    { text: 'Brochures are available at the counter.', pass: false },
                ],
            }
        ],
        checklist: [
            { id: 1, text: 'Main banner is visible from entrance.', checked: true },
            { id: 2, text: 'Wobblers are attached to featured products.', checked: true },
            { id: 3, text: 'Brochures are available at the counter.', checked: false, reason: 'Ran out of stock.' },
        ]
    },
    { 
        id: 'SUB-002', 
        taskId: 'TSK-001',
        taskName: 'Weekly Display Check',
        store: 'Store C', 
        submittedBy: 'User 4', 
        date: '2024-07-20', 
        status: 'Pending Review',
        submissionTime: '5 hours ago',
        imageUrl: 'https://picsum.photos/seed/102/800/600',
        imageHint: 'store aisle',
        results: [
             {
                requirementId: 0,
                type: 'checklist',
                value: [
                    { id: 1, text: 'Aisle is clean and unobstructed.', pass: true },
                    { id: 2, text: 'Products are front-facing.', pass: true },
                ],
            },
            {
                requirementId: 1,
                type: 'image',
                value: 'https://picsum.photos/seed/102/800/600',
            }
        ],
        checklist: [
            { id: 1, text: 'Aisle is clean and unobstructed.', checked: true },
            { id: 2, text: 'Products are front-facing.', checked: true },
        ]
    },
     { 
        id: 'SUB-003', 
        taskId: 'TSK-006',
        taskName: 'Stock Count Verification',
        store: 'Store B', 
        submittedBy: 'User 3', 
        date: '2024-07-21', 
        status: 'Approved',
        submissionTime: '1 day ago',
        imageUrl: 'https://picsum.photos/seed/103/800/600',
        imageHint: 'delivery note',
        results: [
            {
                requirementId: 0,
                type: 'image',
                value: 'https://picsum.photos/seed/103/800/600',
            },
            {
                requirementId: 1,
                type: 'checklist',
                value: [
                    { id: 1, text: 'Count matches system records.', pass: false },
                    { id: 2, text: 'Discrepancy report filed.', pass: true },
                ],
            }
        ],
        checklist: [
            { id: 1, text: 'Count matches system records.', checked: false, reason: 'System shows 50, physical count is 48.' },
            { id: 2, text: 'Discrepancy report filed.', checked: true },
        ]
    },
    { 
        id: 'SUB-004', 
        taskId: 'TSK-007',
        taskName: 'Cleanliness Audit Photo',
        store: 'Store F', 
        submittedBy: 'User 10', 
        date: '2024-07-22', 
        status: 'Pending Review',
        submissionTime: '2 days ago',
        imageUrl: 'https://picsum.photos/seed/104/800/600',
        imageHint: 'clean floor',
        results: [
            {
                requirementId: 0,
                type: 'image',
                value: 'https://picsum.photos/seed/104/800/600',
            },
            {
                requirementId: 1,
                type: 'checklist',
                value: [
                     { id: 1, text: 'Floor is clean.', pass: true },
                     { id: 2, text: 'Shelves are dust-free.', pass: true },
                ],
            }
        ],
        checklist: [
            { id: 1, text: 'Floor is clean.', checked: true },
            { id: 2, text: 'Shelves are dust-free.', checked: true },
        ]
    },
    { 
        id: 'SUB-005', 
        taskId: 'TSK-009',
        taskName: 'Monthly Sales Display',
        store: 'Store B', 
        submittedBy: 'User 3', 
        date: '2024-07-21', 
        status: 'Approved',
        submissionTime: '3 days ago',
        imageUrl: 'https://picsum.photos/seed/105/800/600',
        imageHint: 'sales promotion',
        feedback: 'Great work, looks very appealing!',
        results: [{ requirementId: 0, type: 'image', value: 'https://picsum.photos/seed/105/800/600' }]
    },
    { 
        id: 'SUB-006', 
        taskId: 'TSK-007',
        taskName: 'Cleanliness Audit Photo',
        store: 'Store D', 
        submittedBy: 'User 7', 
        date: '2024-07-19', 
        status: 'Rejected',
        submissionTime: '4 days ago',
        imageUrl: 'https://picsum.photos/seed/106/800/600',
        imageHint: 'messy aisle',
        feedback: 'Image is blurry and the floor in the corner appears to be dirty. Please retake the photo with better lighting and ensure the area is fully clean.',
        results: [{ requirementId: 0, type: 'image', value: 'https://picsum.photos/seed/106/800/600'}]
    },
     { 
        id: 'SUB-007', 
        taskId: 'TSK-010',
        taskName: 'Safety Compliance Check',
        store: 'Store E', 
        submittedBy: 'User 9', 
        date: '2024-07-23', 
        status: 'Approved',
        submissionTime: '1 day ago',
        results: [],
        checklist: [
            { id: 1, text: 'Fire extinguisher is accessible.', checked: true },
            { id: 2, text: 'Emergency exits are clear.', checked: true },
        ]
    },
    { 
        id: 'SUB-008', 
        taskId: 'TSK-008',
        taskName: 'Price Check',
        store: 'Store B', 
        submittedBy: 'User 3', 
        date: '2024-07-22', 
        status: 'Rejected',
        submissionTime: '2 days ago',
        feedback: 'The price for SKU-101 is incorrect in your submission. Please verify against the master price list and resubmit.',
        results: [{ requirementId: 0, type: 'data-entry', value: '25.99'}]
    },
    {
        id: 'SUB-009',
        taskId: 'TSK-002',
        taskName: 'End-of-Month Stock Count',
        store: 'Store A',
        submittedBy: 'User 2',
        date: '2024-07-26',
        status: 'Pending Review',
        submissionTime: '15 minutes ago',
        results: [
            { requirementId: 0, type: 'data-entry', value: '152' },
            { requirementId: 1, type: 'data-entry', value: '348' }
        ]
    },
    {
        id: 'SUB-010',
        taskId: 'TSK-011',
        taskName: 'In-Store Customer Survey',
        store: 'Store A',
        submittedBy: 'User 2',
        date: '2024-07-26',
        status: 'Pending Review',
        submissionTime: '10 minutes ago',
        results: [
            {
                requirementId: 0,
                type: 'data-entry',
                value: 'Good'
            },
            {
                requirementId: 1,
                type: 'data-entry',
                value: ['Store Cleanliness', 'Staff Friendliness']
            },
            {
                requirementId: 2,
                type: 'data-entry',
                value: 'The music was a bit too loud, but the staff were very helpful.'
            }
        ]
    }
];

export function getSubmissionById(id: string): Submission | undefined {
    return initialSubmissions.find(sub => sub.id === id);
}

export function getLastSubmissionForTask(taskId: string): Submission | undefined {
    const submissionsForTask = initialSubmissions.filter(sub => sub.taskId === taskId);
    if (submissionsForTask.length === 0) {
        return undefined;
    }
    // Simple sort by date string - for more robust solution, parse dates
    return submissionsForTask.sort((a, b) => b.date.localeCompare(a.date))[0];
}
