
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { initialTasks, Task } from '@/lib/tasks';
import { users, Department } from '@/lib/users';
import { cn } from '@/lib/utils';
import { FileDown } from 'lucide-react';
import * as React from 'react';

const DEPARTMENTS: Department[] = ['ADMIN', 'PLANNING', 'SPA/MKT', 'IMPROVEMENT', 'HQ/Control'];
const COMPLETION_THRESHOLD = 90; // 90%

interface DepartmentStats {
  total: number;
  completed: number;
}

interface StoreReport {
  storeCode: string;
  storeName: string;
  overview: DepartmentStats;
  departments: Record<Department, DepartmentStats>;
}

const calculatePercentage = (completed: number, total: number) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

// Create a map for quick user lookup
const userMap = new Map(users.map(user => [user.id, user]));

export default function ReportsPage() {

  const reportData = React.useMemo(() => {
    const stores = Array.from(new Set(initialTasks.map(t => t.store).filter(s => s !== 'All Stores')));
    
    const data: StoreReport[] = stores.map((storeName, index) => {
      
      const report: StoreReport = {
        storeCode: `ST-${String(index + 1).padStart(3, '0')}`,
        storeName,
        overview: { total: 0, completed: 0 },
        departments: {
          'ADMIN': { total: 0, completed: 0 },
          'PLANNING': { total: 0, completed: 0 },
          'SPA/MKT': { total: 0, completed: 0 },
          'IMPROVEMENT': { total: 0, completed: 0 },
          'HQ/Control': { total: 0, completed: 0 },
        },
      };

      // Get tasks assigned specifically to this store or to "All Stores"
      const applicableTasks = initialTasks.filter(task => task.store === storeName || task.store === 'All Stores');

      applicableTasks.forEach(task => {
        const assigner = userMap.get(task.assignerId);
        if (!assigner) return; // Skip if assigner not found

        const department = assigner.department;
        const isCompleted = task.status === 'Completed' || task.status === 'Approved';
        
        // Update overview
        report.overview.total++;
        if (isCompleted) report.overview.completed++;

        // Update department stats
        if (report.departments[department]) {
          report.departments[department].total++;
          if (isCompleted) {
            report.departments[department].completed++;
          }
        }
      });

      return report;
    });

    return data;

  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className='flex-row items-center justify-between'>
            <div>
                <CardTitle>Store Performance Report</CardTitle>
                <CardDescription>
                    An overview of task completion rates across all stores and departments.
                </CardDescription>
            </div>
            <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full divide-y divide-gray-200">
              <TableHeader>
                <TableRow>
                  <TableHead rowSpan={2} className="sticky left-0 bg-card z-10 w-[100px]">Store Code</TableHead>
                  <TableHead rowSpan={2} className="sticky left-[100px] bg-card z-10 w-[150px]">Store Name</TableHead>
                  <TableHead colSpan={3} className="text-center border-l border-r">Job Overview</TableHead>
                  {DEPARTMENTS.map(dep => (
                    <TableHead key={dep} colSpan={3} className="text-center border-l border-r">{dep}</TableHead>
                  ))}
                </TableRow>
                <TableRow>
                  {/* Overview Columns */}
                  <TableHead className="text-center border-l">Total Task</TableHead>
                  <TableHead className="text-center">Completed</TableHead>
                  <TableHead className="text-center border-r">Complete %</TableHead>
                  {/* Department Columns */}
                  {DEPARTMENTS.map(dep => (
                    <React.Fragment key={`${dep}-header`}>
                      <TableHead className="text-center border-l">Total Task</TableHead>
                      <TableHead className="text-center">Completed</TableHead>
                      <TableHead className="text-center border-r">Complete %</TableHead>
                    </React.Fragment>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.map((row) => {
                    const overviewPercent = calculatePercentage(row.overview.completed, row.overview.total);
                    
                    return (
                        <TableRow key={row.storeCode}>
                            <TableCell className="font-medium sticky left-0 bg-card z-10">{row.storeCode}</TableCell>
                            <TableCell className="sticky left-[100px] bg-card z-10">{row.storeName}</TableCell>
                            {/* Overview Data */}
                            <TableCell className="text-center border-l">{row.overview.total}</TableCell>
                            <TableCell className="text-center">{row.overview.completed}</TableCell>
                            <TableCell className={cn(
                                "text-center font-bold border-r",
                                overviewPercent < COMPLETION_THRESHOLD && "text-red-500"
                            )}>
                                {overviewPercent}%
                            </TableCell>

                            {/* Department Data */}
                            {DEPARTMENTS.map(dep => {
                                const deptStats = row.departments[dep];
                                const deptPercent = calculatePercentage(deptStats.completed, deptStats.total);
                                return (
                                    <React.Fragment key={`${row.storeCode}-${dep}`}>
                                        <TableCell className="text-center border-l">{deptStats.total}</TableCell>
                                        <TableCell className="text-center">{deptStats.completed}</TableCell>
                                        <TableCell className={cn(
                                            "text-center font-bold border-r",
                                            deptStats.total > 0 && deptPercent < COMPLETION_THRESHOLD && "text-red-500"
                                        )}>
                                            {deptStats.total > 0 ? `${deptPercent}%` : '-'}
                                        </TableCell>
                                    </React.Fragment>
                                )
                            })}
                        </TableRow>
                    )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
