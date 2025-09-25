
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

// Define thresholds for color coding
const COMPLETION_THRESHOLD_GOOD = 90;
const COMPLETION_THRESHOLD_WARN = 40;


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

  const getPercentageCellClass = (percent: number) => {
    if (percent < COMPLETION_THRESHOLD_WARN) {
      return "text-red-500";
    }
    if (percent < COMPLETION_THRESHOLD_GOOD) {
      return "text-yellow-500";
    }
    return "";
  };

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
          <div className="relative max-h-[70vh] overflow-auto border rounded-lg">
            <Table className="min-w-full">
              <TableHeader className="bg-muted sticky top-0 z-10">
                <TableRow>
                  <TableHead scope="col" rowSpan={2} className="sticky left-0 bg-muted z-30 w-[120px] text-left">Store Code</TableHead>
                  <TableHead scope="col" rowSpan={2} className="sticky left-[120px] bg-muted z-30 w-[180px] text-left">Store Name</TableHead>
                  <TableHead scope="colgroup" colSpan={3} className="text-center border-l border-r">Job Overview</TableHead>
                  {DEPARTMENTS.map(dep => (
                    <TableHead key={dep} scope="colgroup" colSpan={3} className="text-center border-l border-r">{dep}</TableHead>
                  ))}
                </TableRow>
                <TableRow>
                  {/* Overview Columns */}
                  <TableHead scope="col" className="text-right border-l">Total Task</TableHead>
                  <TableHead scope="col" className="text-right">Completed</TableHead>
                  <TableHead scope="col" className="text-right border-r">Complete %</TableHead>
                  {/* Department Columns */}
                  {DEPARTMENTS.map(dep => (
                    <React.Fragment key={`${dep}-header`}>
                      <TableHead scope="col" className="text-right border-l">Total Task</TableHead>
                      <TableHead scope="col" className="text-right">Completed</TableHead>
                      <TableHead scope="col" className="text-right border-r">Complete %</TableHead>
                    </React.Fragment>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.map((row) => {
                    const overviewPercent = calculatePercentage(row.overview.completed, row.overview.total);
                    
                    return (
                        <TableRow key={row.storeCode} className="hover:bg-muted/30">
                            <TableCell className="font-medium sticky left-0 bg-card z-20">{row.storeCode}</TableCell>
                            <TableCell className="sticky left-[120px] bg-card z-20">{row.storeName}</TableCell>
                            {/* Overview Data */}
                            <TableCell className="text-right border-l">{row.overview.total}</TableCell>
                            <TableCell className="text-right">{row.overview.completed}</TableCell>
                            <TableCell className={cn(
                                "text-right font-bold border-r",
                                getPercentageCellClass(overviewPercent)
                            )}>
                                {overviewPercent}
                            </TableCell>

                            {/* Department Data */}
                            {DEPARTMENTS.map(dep => {
                                const deptStats = row.departments[dep];
                                const deptPercent = calculatePercentage(deptStats.completed, deptStats.total);
                                return (
                                    <React.Fragment key={`${row.storeCode}-${dep}`}>
                                        <TableCell className="text-right border-l">{deptStats.total}</TableCell>
                                        <TableCell className="text-right">{deptStats.completed}</TableCell>
                                        <TableCell className={cn(
                                            "text-right font-bold border-r",
                                            deptStats.total > 0 ? getPercentageCellClass(deptPercent) : "text-muted-foreground"
                                        )}>
                                            {deptStats.total > 0 ? deptPercent : '-'}
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
