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
import { PlusCircle, CheckCircle, Clock, XCircle, Hourglass, FileText } from 'lucide-react';
import { CreateTaskForm } from '@/components/create-task-form';
import * as React from 'react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { Task, initialTasks, addTask as addTaskToState } from '@/lib/tasks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTableFacetedFilter } from '@/components/data-table-faceted-filter';
import { Table } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';

const statuses = [
  {
    value: 'Active',
    label: 'Active',
    icon: Clock,
  },
  {
    value: 'Completed',
    label: 'Completed',
    icon: CheckCircle,
  },
  {
    value: 'Draft',
    label: 'Draft',
    icon: FileText,
  },
  {
    value: 'Pending Review',
    label: 'Pending Review',
    icon: Hourglass,
  },
  {
    value: 'Overdue',
    label: 'Overdue',
    icon: XCircle,
  },
  {
    value: 'Rejected',
    label: 'Rejected',
    icon: XCircle,
  },
]

function TaskTableToolbar({ table }: { table: Table<Task>}) {
  return (
    <>
    {table.getColumn("status") && (
      <DataTableFacetedFilter
        column={table.getColumn("status")}
        title="Status"
        options={statuses}
      />
    )}
    </>
  )
}

function TasksPageComponent() {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'all';


  const recurringTasks = tasks.filter(t => t.isRecurring);

  const handleAddTask = (newTaskData: any) => {
    const newTask = addTaskToState(newTaskData, tasks);
    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsDialogOpen(false);
  };

  return (
    <Tabs defaultValue={tab} value={tab}>
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="schedules">Schedules</TabsTrigger>
        </TabsList>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Fill out the details below to create a new task.
              </DialogDescription>
            </DialogHeader>
            <CreateTaskForm
              onTaskCreate={handleAddTask}
              onAfterSubmit={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
            <CardDescription>
              Create, assign, and manage all your operational tasks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={tasks} toolbar={TaskTableToolbar}/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="schedules">
        <Card>
          <CardHeader>
            <CardTitle>Recurring Task Schedules</CardTitle>
            <CardDescription>
              Manage the schedules for tasks that repeat automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={recurringTasks} toolbar={TaskTableToolbar}/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}


export default function TasksPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <TasksPageComponent />
    </React.Suspense>
  );
}
