
import { Requirement } from "./tasks";

export type SubmissionResult = {
    requirementId: number; // Corresponds to the index in the task's requirements array
    type: Requirement['type'];
    value: any; // Could be a string (data-entry), an array of image URLs, or an array of booleans (checklist)
    imageUrl?: string;
    imageHint?: string;
    checklist?: { id: number; text: string; pass: boolean }[];
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
        results: [
            {
                requirementId: 0,
                type: 'image',
                value: 'https://picsum.photos/seed/101/800/600',
                imageUrl: 'https://picsum.photos/seed/101/800/600',
                imageHint: 'retail display'
            },
            {
                requirementId: 1,
                type: 'checklist',
                value: [
                    { id: 1, text: 'Main banner is visible from entrance.', pass: true },
                    { id: 2, text: 'Wobblers are attached to featured products.', pass: true },
                    { id: 3, text: 'Brochures are available at the counter.', pass: false },
                ],
                 checklist: [
                    { id: 1, text: 'Main banner is visible from entrance.', pass: true },
                    { id: 2, text: 'Wobblers are attached to featured products.', pass: true },
                    { id: 3, text: 'Brochures are available at the counter.', pass: false },
                ]
            }
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
        results: [
             {
                requirementId: 0,
                type: 'checklist',
                value: [
                    { id: 1, text: 'Aisle is clean and unobstructed.', pass: true },
                    { id: 2, text: 'Products are front-facing.', pass: true },
                ],
                 checklist: [
                    { id: 1, text: 'Aisle is clean and unobstructed.', pass: true },
                    { id: 2, text: 'Products are front-facing.', pass: true },
                ]
            },
            {
                requirementId: 1,
                type: 'image',
                value: 'https://picsum.photos/seed/102/800/600',
                imageUrl: 'https://picsum.photos/seed/102/800/600',
                imageHint: 'store aisle'
            }
        ]
    },
     { 
        id: 'SUB-003', 
        taskId: 'TSK-006',
        taskName: 'Stock Count Verification',
        store: 'Store B', 
        submittedBy: 'User 3', 
        date: '2024-07-21', 
        status: 'Pending Review',
        submissionTime: '1 day ago',
        results: [
            {
                requirementId: 0,
                type: 'image',
                value: 'https://picsum.photos/seed/103/800/600',
                imageHint: 'delivery note'
            },
            {
                requirementId: 1,
                type: 'checklist',
                value: [
                    { id: 1, text: 'Count matches system records.', pass: false },
                    { id: 2, text: 'Discrepancy report filed.', pass: true },
                ],
                 checklist: [
                    { id: 1, text: 'Count matches system records.', pass: false },
                    { id: 2, text: 'Discrepancy report filed.', pass: true },
                ]
            }
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
        results: [
            {
                requirementId: 0,
                type: 'image',
                value: 'https://picsum.photos/seed/104/800/600',
                imageHint: 'clean floor'
            },
            {
                requirementId: 1,
                type: 'checklist',
                value: [
                     { id: 1, text: 'Floor is clean.', pass: true },
                     { id: 2, text: 'Shelves are dust-free.', pass: true },
                ],
                checklist: [
                     { id: 1, text: 'Floor is clean.', pass: true },
                     { id: 2, text: 'Shelves are dust-free.', pass: true },
                ]
            }
        ]
    }
];

export function getSubmissionById(id: string): Submission | undefined {
    return initialSubmissions.find(sub => sub.id === id);
}
