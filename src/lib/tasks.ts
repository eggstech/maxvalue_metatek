

import { format } from "date-fns";

export type Requirement = {
    type: 'image' | 'data-entry' | 'checklist' | 'pdf-standard';
    label: string;
    min?: number;
    max?: number;
    checklistItems?: { text: string }[];
    entryType?: 'text' | 'single' | 'multiple';
    options?: { text: string }[];
    pdfUrl?: string;
}

export type Task = {
  id: string;
  name: string;
  store: string;
  dueDate: string;
  status: 'Active' | 'Completed' | 'Draft' | 'Pending Review' | 'Overdue' | 'Rejected';
  type: 'Checklist' | 'Data Entry' | 'Image' | 'Mixed' | 'Visual Standard';
  description?: string;
  requirements?: Requirement[];
  isRecurring?: boolean;
};

export const initialTasks: Task[] = [
  {
    id: 'TSK-001',
    name: 'Weekly Display Check',
    store: 'All Stores',
    dueDate: '2024-07-25',
    status: 'Active',
    type: 'Checklist',
    description: 'Ensure all weekly promotional displays are set up correctly and are neat and tidy.\n\n- The main promotional banner should be visible from the store entrance.\n- Promotional materials should not be damaged.\n- All prices must be correct and clearly visible.',
    requirements: [
        {
            type: 'checklist',
            label: 'Display Audit',
            checklistItems: [
                { text: 'Main banner is visible from entrance.' },
                { text: 'Promotional materials are not damaged.' },
                { text: 'All prices are correct and visible.' },
            ]
        },
        {
            type: 'image',
            label: 'Photo of the main display',
            min: 1,
            max: 1,
        }
    ],
    isRecurring: true,
  },
  {
    id: 'TSK-002',
    name: 'End-of-Month Stock Count',
    store: 'All Stores',
    dueDate: '2024-07-31',
    status: 'Pending Review',
    type: 'Data Entry',
    description: 'Perform a full stock count of all items in the warehouse and on the shelves. Submit the final counts via the data entry form.',
    requirements: [
        {
            type: 'data-entry',
            label: 'SKU-123 Stock',
            entryType: 'text'
        },
        {
            type: 'data-entry',
            label: 'SKU-456 Stock',
            entryType: 'text'
        }
    ]
  },
  {
    id: 'TSK-003',
    name: 'New Campaign POSM Setup',
    store: 'Stores Group A',
    dueDate: '2024-07-20',
    status: 'Pending Review',
    type: 'Image',
    description: 'Set up the Point of Sale Materials for the new "Summer Sale" campaign. Submit a photo of the final setup for review.',
    requirements: [
        {
            type: 'image',
            label: 'Photo of the main entrance display',
            min: 1,
            max: 2,
        },
        {
            type: 'checklist',
            label: 'Setup Checklist',
            checklistItems: [
              { text: 'Main banner is visible from entrance.'},
              { text: 'Wobblers are attached to featured products.'},
              { text: 'Brochures are available at the counter.'},
            ]
        }
    ]
  },
  {
    id: 'TSK-004',
    name: 'Customer Feedback Survey',
    store: 'Store C, Store D',
    dueDate: '2024-08-05',
    status: 'Draft',
    type: 'Data Entry',
    description: 'Collect customer feedback using the provided survey form. Aim for at least 20 responses per store.',
  },
  {
    id: 'TSK-005',
    name: 'Quarterly Deep Clean Audit',
    store: 'All Stores',
    dueDate: '2024-09-30',
    status: 'Active',
    type: 'Checklist',
    description: 'Conduct a thorough deep clean of the entire store, including staff areas. Use the checklist to ensure all areas are covered.',
    requirements: [
        {
            type: 'checklist',
            label: 'Cleaning Checklist',
            checklistItems: [
                { text: 'Floors mopped and polished.' },
                { text: 'Windows and glass surfaces cleaned.' },
                { text: 'Shelving wiped down and organized.' },
                { text: 'Restrooms sanitized.' },
                { text: 'Staff room cleaned.' },
            ]
        }
    ]
  },
   {
    id: 'TSK-006',
    name: 'Stock Count Verification',
    store: 'Store B',
    dueDate: '2024-08-15',
    status: 'Completed',
    type: 'Mixed',
    description: 'Verify the stock count from the latest delivery and check for discrepancies.',
    requirements: [
        {
            type: 'image',
            label: 'Photo of Delivery Note',
            min: 1,
            max: 1,
        },
        {
            type: 'checklist',
            label: 'Verification Checklist',
            checklistItems: [
                { text: 'Count matches system records.' },
                { text: 'Discrepancy report filed.' },
            ]
        }
    ],
    isRecurring: false,
  },
  {
    id: 'TSK-007',
    name: 'Cleanliness Audit Photo',
    store: 'All Stores',
    dueDate: '2024-07-01',
    status: 'Overdue',
    type: 'Image',
    description: 'Submit a photo of the main customer area to verify cleanliness standards are being met.',
    requirements: [
        {
            type: 'image',
            label: 'Photo of main customer area',
            min: 1,
            max: 1
        },
         {
            type: 'checklist',
            label: 'Cleanliness Checklist',
            checklistItems: [
                { text: 'Floor is clean.' },
                { text: 'Shelves are dust-free.' },
            ]
        }
    ],
    isRecurring: true,
  },
    {
    id: 'TSK-008',
    name: 'Price Check',
    store: 'Store B',
    dueDate: '2024-07-22',
    status: 'Rejected',
    type: 'Data Entry',
    description: 'Verify prices for 5 specific SKUs.',
    requirements: [
        {
            type: 'data-entry',
            label: 'SKU-101 Price',
            entryType: 'text'
        },
    ]
  },
  {
    id: 'TSK-009',
    name: 'Monthly Sales Display',
    store: 'Store B',
    dueDate: '2024-07-21',
    status: 'Completed',
    type: 'Image',
    description: 'Setup the new monthly sales promotion display near the entrance.',
    requirements: [
      {
        type: 'image',
        label: 'Photo of the sales display',
        min: 1,
        max: 1
      }
    ],
    isRecurring: true,
  },
  {
    id: 'TSK-010',
    name: 'Safety Compliance Check',
    store: 'Store E',
    dueDate: '2024-07-23',
    status: 'Completed',
    type: 'Checklist',
    description: 'Perform weekly safety check.',
    requirements: [
      {
        type: 'checklist',
        label: 'Safety Checklist',
        checklistItems: [
          { text: 'Fire extinguisher is accessible.' },
          { text: 'Emergency exits are clear.' },
        ]
      }
    ],
  },
  {
    id: 'TSK-011',
    name: 'In-Store Customer Survey',
    store: 'Store A',
    dueDate: '2024-08-10',
    status: 'Pending Review',
    type: 'Data Entry',
    description: 'Gather customer feedback using the survey questions below.',
    requirements: [
        {
            type: 'data-entry',
            label: 'How would you rate your overall experience?',
            entryType: 'single',
            options: [
                { text: 'Excellent' },
                { text: 'Good' },
                { text: 'Average' },
                { text: 'Poor' },
            ]
        },
        {
            type: 'data-entry',
            label: 'What did you like about our store? (Select all that apply)',
            entryType: 'multiple',
            options: [
                { text: 'Product Selection' },
                { text: 'Store Cleanliness' },
                { text: 'Staff Friendliness' },
                { text: 'Prices & Promotions' },
            ]
        },
        {
            type: 'data-entry',
            label: 'Any other comments or suggestions?',
            entryType: 'text'
        }
    ]
  },
  {
    id: 'TSK-012',
    name: 'Bookshelf Standard Check',
    store: 'Store A',
    dueDate: '2024-08-15',
    status: 'Active',
    type: 'Visual Standard',
    description: 'Please set up the bookshelf according to the visual standard provided in the PDF and submit a photo.',
    requirements: [
        {
            type: 'pdf-standard',
            label: 'Bookshelf Display Standard',
            pdfUrl: '/standards/bookshelf-standard.pdf'
        },
        {
            type: 'image',
            label: 'Photo of your completed bookshelf display',
            min: 1,
            max: 1
        }
    ]
  }
];

export function getTaskById(id: string): Task | undefined {
    return initialTasks.find(task => task.id === id);
}

export const addTask = (newTaskData: any, existingTasks: Task[]): Task => {
    const fullDueDate = new Date(newTaskData.dueDate);
    const [hours, minutes] = newTaskData.dueTime.split(':');
    fullDueDate.setHours(parseInt(hours, 10));
    fullDueDate.setMinutes(parseInt(minutes, 10));

    // Determine the primary type
    const reqTypes = new Set(newTaskData.requirements?.map((r: Requirement) => r.type) || []);
    let primaryType: Task['type'] = 'Data Entry'; // Default
    if (reqTypes.has('pdf-standard')) {
        primaryType = 'Visual Standard';
    } else if (reqTypes.size > 1) {
        primaryType = 'Mixed';
    } else if (reqTypes.has('image')) {
        primaryType = 'Image';
    } else if (reqTypes.has('checklist')) {
        primaryType = 'Checklist';
    }


    const newTask: Task = {
        id: `TSK-${String(existingTasks.length + 1).padStart(3, '0')}`,
        name: newTaskData.taskName,
        store: newTaskData.assignedTo,
        dueDate: format(fullDueDate, 'yyyy-MM-dd'),
        status: 'Draft',
        type: primaryType,
        description: newTaskData.description,
        requirements: newTaskData.requirements,
        isRecurring: newTaskData.isRecurring,
    };
    return newTask;
};
