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
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, FileDown } from 'lucide-react';
import * as React from 'react';
import Link from 'next/link';

const reportData = [
    { id: 'SUB-005', taskId: 'TSK-009', task: 'Monthly Sales Display', store: 'Store B', completedBy: 'User 3', date: '2024-07-21', status: 'Approved' },
    { id: 'SUB-001', taskId: 'TSK-003', task: 'New Campaign POSM Setup', store: 'Store A', completedBy: 'User 2', date: '2024-07-19', status: 'Pending Review' },
    { id: 'SUB-008', taskId: 'TSK-008', task: 'Price Check', store: 'Store B', completedBy: 'User 3', date: '2024-07-22', status: 'Rejected' },
    { id: 'SUB-002', taskId: 'TSK-001', task: 'Weekly Display Check', store: 'Store C', completedBy: 'User 4', date: '2024-07-20', status: 'Pending Review' },
    { id: 'SUB-003', taskId: 'TSK-006', task: 'Stock Count Verification', store: 'Store A', completedBy: 'User 2', date: '2024-07-21', status: 'Approved' },
    { id: 'SUB-007', taskId: 'TSK-010', task: 'Safety Compliance Check', store: 'Store E', completedBy: 'User 9', date: '2024-07-23', status: 'Approved' },
];

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700">Approved</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-700">Rejected</Badge>;
      case 'Pending Review':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700">Pending Review</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

export default function ReportsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
          <CardDescription>
            Generate and export detailed reports on performance and compliance.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select a task" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="display-check">Display Check</SelectItem>
              <SelectItem value="stock-count">Stock Count</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select a store" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stores</SelectItem>
              <SelectItem value="store-a">Store A</SelectItem>
              <SelectItem value="store-b">Store B</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full sm:w-[240px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button className="w-full sm:w-auto ml-auto">Generate Report</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex-row items-center justify-between'>
            <div>
                <CardTitle>Task Compliance Report</CardTitle>
                <CardDescription>July 2024</CardDescription>
            </div>
            <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Completed By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Link href={`/tasks/${row.taskId}`} className="text-primary hover:underline">
                      {row.task}
                    </Link>
                  </TableCell>
                  <TableCell>{row.store}</TableCell>
                  <TableCell>{row.completedBy}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <StatusBadge status={row.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
