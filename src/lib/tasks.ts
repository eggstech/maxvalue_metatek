import { format } from "date-fns";

export type Requirement = {
    type: 'image' | 'data-entry' | 'checklist';
    label: string;
    min?: number;
    max?: number;
    checklistItems?: { text: string }[];
}

export type Task = {
  id: string;
  name: string;
  store: string;
  dueDate: string;
  status: 'Active' | 'Completed' | 'Draft';
  type: 'Checklist' | 'Data Entry' | 'Image' | 'Mixed';
  description?: string;
  requirements?: Requirement[];
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
    ]
  },
  {
    id: 'TSK-002',
    name: 'End-of-Month Stock Count',
    store: 'All Stores',
    dueDate: '2024-07-31',
    status: 'Active',
    type: 'Data Entry',
    description: 'Perform a full stock count of all items in the warehouse and on the shelves. Submit the final counts via the data entry form.',
    requirements: [
        {
            type: 'data-entry',
            label: 'SKU-123 Stock'
        },
        {
            type: 'data-entry',
            label: 'SKU-456 Stock'
        }
    ]
  },
  {
    id: 'TSK-003',
    name: 'New Campaign POSM Setup',
    store: 'Stores Group A',
    dueDate: '2024-07-20',
    status: 'Completed',
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
            type: 'image',
            label: 'Photo of the checkout counter display',
            min: 1,
            max: 1,
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
    if (reqTypes.size > 1) {
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
    };
    return newTask;
};
