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
import * as React from 'react';
import { columns } from '../columns';
import { DataTable } from '@/components/data-table';
import { Task, initialTasks } from '@/lib/tasks';

export default function RecurringTasksPage() {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks.filter(t => t.isRecurring));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recurring Task Schedules</CardTitle>
            <CardDescription>
              Manage the schedules for tasks that repeat automatically.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={tasks} />
      </CardContent>
    </Card>
  );
}
