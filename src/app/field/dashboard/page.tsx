'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  Activity,
  CheckCircle2,
  Clock,
  Hourglass,
  ListChecks,
  MessageSquareWarning,
} from 'lucide-react';
import { initialTasks } from '@/lib/tasks';

const tasks = initialTasks.filter(t => ['Active', 'Completed', 'Overdue', 'Rejected', 'Pending Review'].includes(t.status));
const totalTasks = tasks.length;
const completedTasks = tasks.filter(t => t.status === 'Completed').length;
const pendingReviewTasks = tasks.filter(t => t.status === 'Pending Review').length;
const overdueTasks = tasks.filter(t => t.status === 'Overdue').length;
const rejectedTasks = tasks.filter(t => t.status === 'Rejected').length;
const activeTasks = tasks.filter(t => t.status === 'Active').length;

const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

const weeklyActivityData = [
  { date: 'Mon', created: 5, completed: 4 },
  { date: 'Tue', created: 7, completed: 6 },
  { date: 'Wed', created: 4, completed: 4 },
  { date: 'Thu', created: 8, completed: 7 },
  { date: 'Fri', created: 6, completed: 5 },
  { date: 'Sat', created: 2, completed: 1 },
  { date: 'Sun', created: 3, completed: 3 },
];


export default function FieldDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
       <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
            <p className="text-muted-foreground">An overview of your tasks and performance.</p>
        </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">To Do</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTasks}</div>
            <p className="text-xs text-muted-foreground">Tasks waiting to be started.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <p className="text-xs text-muted-foreground">{completedTasks} of {totalTasks} tasks completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Hourglass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReviewTasks}</div>
            <p className="text-xs text-muted-foreground">Tasks awaiting approval.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
            <MessageSquareWarning className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{overdueTasks + rejectedTasks}</div>
            <p className="text-xs text-muted-foreground">{overdueTasks} overdue, {rejectedTasks} rejected</p>
          </CardContent>
        </Card>
      </div>

      <Card>
          <CardHeader>
            <CardTitle>Your Weekly Activity</CardTitle>
            <CardDescription>Tasks assigned vs. tasks completed by you this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                   contentStyle={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar dataKey="created" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Assigned" />
                <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

    </div>
  );
}
