export type Task = {
  id: string;
  name: string;
  store: string;
  dueDate: string;
  status: 'Active' | 'Completed' | 'Draft';
  type: 'Checklist' | 'Data Entry' | 'Image';
  description?: string;
  checklist?: { id: number; text: string; completed: boolean }[];
};

export const initialTasks: Task[] = [
  {
    id: 'TSK-001',
    name: 'Weekly Display Check',
    store: 'All Stores',
    dueDate: '2024-07-25',
    status: 'Active',
    type: 'Checklist',
    description: 'Ensure all weekly promotional displays are set up correctly and are neat and tidy. The main promotional banner should be visible from the store entrance.',
    checklist: [
        { id: 1, text: 'Main banner is visible from entrance.', completed: false },
        { id: 2, text: 'Promotional materials are not damaged.', completed: false },
        { id: 3, text: 'All prices are correct and visible.', completed: false },
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
  },
  {
    id: 'TSK-003',
    name: 'New Campaign POSM Setup',
    store: 'Stores Group A',
    dueDate: '2024-07-20',
    status: 'Completed',
    type: 'Image',
    description: 'Set up the Point of Sale Materials for the new "Summer Sale" campaign. Submit a photo of the final setup for review.',
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
    checklist: [
        { id: 1, text: 'Floors mopped and polished.', completed: false },
        { id: 2, text: 'Windows and glass surfaces cleaned.', completed: false },
        { id: 3, text: 'Shelving wiped down and organized.', completed: false },
        { id: 4, text: 'Restrooms sanitized.', completed: false },
        { id: 5, text: 'Staff room cleaned.', completed: false },
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

    const newTask: Task = {
        id: `TSK-${String(existingTasks.length + 1).padStart(3, '0')}`,
        name: newTaskData.taskName,
        store: newTaskData.assignedTo,
        dueDate: fullDueDate.toISOString(),
        status: 'Draft',
        // The main type can be derived from the first requirement, or set to a default
        type: newTaskData.requirements?.[0]?.type === 'image' ? 'Image' : (newTaskData.requirements?.[0]?.type === 'checklist' ? 'Checklist' : 'Data Entry'),
        description: newTaskData.description,
        // In a real app, you'd process and store the requirements array
    };
    // Note: This function doesn't permanently store the task.
    // In a real application, this would interact with a database.
    return newTask;
};

    