'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowRight, ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/lib/tasks';
import Link from 'next/link';

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-700">To Do</Badge>;
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700">Completed</Badge>;
      case 'Pending Review':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700">Pending Review</Badge>;
      case 'Overdue':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-700">Overdue</Badge>;
      case 'Rejected':
          return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100/80 dark:bg-orange-900/50 dark:text-orange-300 border-orange-200 dark:border-orange-700">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };


const getActionText = (status: Task['status']) => {
    switch (status) {
        case 'Rejected':
            return 'Resubmit';
        case 'Pending Review':
        case 'Completed':
            return 'View';
        default:
            return 'Start';
    }
}


export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Task Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
            <Link href={`/field/task/${row.original.id}`} className="font-medium text-primary hover:underline">
                {row.original.name}
            </Link>
        )
      }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        return <StatusBadge status={row.original.status} />
    }
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Due Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const task = row.original;
      const actionText = getActionText(task.status);

      return (
        <div className="text-right">
            <Button asChild variant="ghost" size="sm">
                <Link href={`/field/task/${task.id}`}>
                    {actionText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      );
    },
  },
];
