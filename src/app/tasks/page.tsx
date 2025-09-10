'use client';

import { Badge } from '@/components/ui/badge';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { CreateTaskForm } from '@/components/create-task-form';

const tasks = [
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

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'Active':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-700">Active</Badge>;
    case 'Completed':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700">Completed</Badge>;
    case 'Draft':
      return <Badge variant="secondary">Draft</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function TasksPage() {
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
          <Dialog>
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
              <CreateTaskForm />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task Name</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell>{task.store}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <Badge variant="outline">{task.type}</Badge>
                </TableCell>
                <TableCell>
                  <StatusBadge status={task.status} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Submissions</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
