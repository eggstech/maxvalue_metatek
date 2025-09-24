

import { Requirement } from "./tasks";

export type SubmissionResult = {
    requirementId: number; // Corresponds to the index in the task's requirements array
    type: Requirement['type'];
    value: any; // Could be a string (data-entry), an array of image URLs, or an array of booleans (checklist)
};

export type Submission = {
    id: string;
    taskId: string;
    taskName: string;
    store: string;
    submittedBy: string;
    submittedByAvatarId?: string;
    date: string;
    status: 'Approved' | 'Rejected' | 'Pending Review';
    submissionTime: string; // e.g. "2 hours ago" for display
    results: SubmissionResult[];
    feedback?: string;
    primaryImageId?: string; // Main image for display if available
};

export const initialSubmissions: Submission[] = [
    { 
        id: 'SUB-001', 
        taskId: 'TSK-003',
        taskName: 'New Campaign POSM Setup',
        store: 'Store A', 
        submittedBy: 'Emily Clark', 
        submittedByAvatarId: 'user-avatar-2',
        date: '2024-07-28', 
        status: 'Pending Review',
        submissionTime: '2 hours ago',
        primaryImageId: 'review-image-1',
        results: [
            {
                requirementId: 0,
                type: 'image',
                value: ['review-image-1', 'review-image-2'],
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
        ]
    },
    { 
        id: 'SUB-002', 
        taskId: 'TSK-001',
        taskName: 'Weekly Display Check',
        store: 'Store C', 
        submittedBy: 'Ben Carter', 
        submittedByAvatarId: 'user-avatar-5',
        date: '2024-07-28', 
        status: 'Pending Review',
        submissionTime: '5 hours ago',
        primaryImageId: 'review-image-2',
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
                value: ['review-image-2'],
            }
        ]
    },
     { 
        id: 'SUB-003', 
        taskId: 'TSK-006',
        taskName: 'Stock Count Verification',
        store: 'Store B', 
        submittedBy: 'Jackson Lee',
        submittedByAvatarId: 'user-avatar-3',
        date: '2024-07-27', 
        status: 'Approved',
        submissionTime: '1 day ago',
        primaryImageId: 'review-image-3',
        results: [
            {
                requirementId: 0,
                type: 'image',
                value: ['review-image-3'],
            },
            {
                requirementId: 1,
                type: 'checklist',
                value: [
                    { id: 1, text: 'Count matches system records.', pass: false },
                    { id: 2, text: 'Discrepancy report filed.', pass: true },
                ],
            }
        ]
    },
    { 
        id: 'SUB-004', 
        taskId: 'TSK-007',
        taskName: 'Cleanliness Audit Photo',
        store: 'Store F', 
        submittedBy: 'Sofia Davis',
        submittedByAvatarId: 'user-avatar-6',
        date: '2024-07-26', 
        status: 'Pending Review',
        submissionTime: '2 days ago',
        primaryImageId: 'review-image-4',
        results: [
            {
                requirementId: 0,
                type: 'image',
                value: ['review-image-4'],
            },
            {
                requirementId: 1,
                type: 'checklist',
                value: [
                     { id: 1, text: 'Floor is clean.', pass: true },
                     { id: 2, text: 'Shelves are dust-free.', pass: true },
                ],
            }
        ]
    },
    { 
        id: 'SUB-005', 
        taskId: 'TSK-009',
        taskName: 'Monthly Sales Display',
        store: 'Store B', 
        submittedBy: 'Jackson Lee',
        submittedByAvatarId: 'user-avatar-3',
        date: '2024-07-25', 
        status: 'Approved',
        submissionTime: '3 days ago',
        primaryImageId: 'review-image-1',
        feedback: 'Great work, looks very appealing!',
        results: [{ requirementId: 0, type: 'image', value: ['review-image-1'] }]
    },
    { 
        id: 'SUB-006', 
        taskId: 'TSK-007',
        taskName: 'Cleanliness Audit Photo',
        store: 'Store D', 
        submittedBy: 'William Kim',
        submittedByAvatarId: 'user-avatar-7',
        date: '2024-07-24', 
        status: 'Rejected',
        submissionTime: '4 days ago',
        primaryImageId: 'review-image-2',
        feedback: 'Image is blurry and the floor in the corner appears to be dirty. Please retake the photo with better lighting and ensure the area is fully clean.',
        results: [{ requirementId: 0, type: 'image', value: ['review-image-2']}]
    },
     { 
        id: 'SUB-007', 
        taskId: 'TSK-010',
        taskName: 'Safety Compliance Check',
        store: 'Store E', 
        submittedBy: 'Isabella Nguyen',
        submittedByAvatarId: 'user-avatar-4',
        date: '2024-07-27', 
        status: 'Approved',
        submissionTime: '1 day ago',
        results: [
            {
                requirementId: 0,
                type: 'checklist',
                value: [
                    { id: 1, text: 'Fire extinguisher is accessible.', pass: true },
                    { id: 2, text: 'Emergency exits are clear.', pass: true },
                ],
            }
        ]
    },
    { 
        id: 'SUB-008', 
        taskId: 'TSK-008',
        taskName: 'Price Check',
        store: 'Store B', 
        submittedBy: 'Jackson Lee',
        submittedByAvatarId: 'user-avatar-3',
        date: '2024-07-26', 
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
        submittedBy: 'Emily Clark',
        submittedByAvatarId: 'user-avatar-2',
        date: '2024-07-28',
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
        submittedBy: 'Emily Clark',
        submittedByAvatarId: 'user-avatar-2',
        date: '2024-07-28',
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
    },
    {
        id: 'SUB-011',
        taskId: 'TSK-013',
        taskName: 'Simple Bookshelf Check',
        store: 'Store B',
        submittedBy: 'Jackson Lee',
        submittedByAvatarId: 'user-avatar-3',
        date: '2024-07-28',
        status: 'Pending Review',
        submissionTime: '5 minutes ago',
        primaryImageId: 'review-image-3',
        results: [
            {
                requirementId: 1,
                type: 'image',
                value: ['review-image-3'],
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
