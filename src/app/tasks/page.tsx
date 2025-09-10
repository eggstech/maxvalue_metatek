'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { CreateTaskForm } from '@/components/create-task-form';
import * as React from 'react';
import { columns, Task } from './columns';
import { DataTable } from '@/components/data-table';

const initialTasks: Task[] = [
  {
    id: 'TSK-001',
    name: 'Weekly Display Check',
    store: 'All Stores',
    dueDate: '2024-07-25',
    status: 'Active',
    type: 'Checklist',
  },
  {
    id: 'TSK-002',
    name: 'End-of-Month Stock Count',
    store: 'All Stores',
    dueDate: '2024-07-31',
    status: 'Active',
    type: 'Data Entry',
  },
  {
    id: 'TSK-003',
    name: 'New Campaign POSM Setup',
    store: 'Stores Group A',
    dueDate: '2024-07-20',
    status: 'Completed',
    type: 'Image',
  },
  {
    id: 'TSK-004',
    name: 'Customer Feedback Survey',
    store: 'Store C, Store D',
    dueDate: '2024-08-05',
    status: 'Draft',
    type: 'Data Entry',
  },
  {
    id: 'TSK-005',
    name: 'Quarterly Deep Clean Audit',
    store: 'All Stores',
    dueDate: '2024-09-30',
    status: 'Active',
    type: 'Checklist',
  },
];


export default function TasksPage() {
  const [tasks, setTasks] = React.useState(initialTasks);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const addTask = (newTaskData: any) => {
    const newTask: Task = {
        id: `TSK-${String(tasks.length + 1).padStart(3, '0')}`,
        name: newTaskData.taskName,
        store: newTaskData.assignedTo,
        dueDate: newTaskData.dueDate.toLocaleDateString('en-CA'),
        status: 'Draft',
        type: newTaskData.taskType,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>
              Create, assign, and manage all your operational tasks.
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Fill out the details below to create a new task.
                </DialogDescription>
              </DialogHeader>
              <CreateTaskForm onTaskCreate={addTask} onAfterSubmit={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={tasks} />
      </CardContent>
    </Card>
  );
}
