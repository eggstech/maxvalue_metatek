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
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { Task, initialTasks, addTask as addTaskToState } from '@/lib/tasks';

export default function TasksPage() {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleAddTask = (newTaskData: any) => {
    const newTask = addTaskToState(newTaskData, tasks);
    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsDialogOpen(false);
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
              <CreateTaskForm onTaskCreate={handleAddTask} onAfterSubmit={() => setIsDialogOpen(false)} />
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
