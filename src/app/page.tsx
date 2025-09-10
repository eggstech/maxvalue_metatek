'use client';

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
import { Badge } from '@/components/ui/badge';
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
  ClipboardCheck,
  ClipboardList,
  Clock,
} from 'lucide-react';

const taskActivityData = [
  { date: 'Mon', created: 30, completed: 22 },
  { date: 'Tue', created: 45, completed: 35 },
  { date: 'Wed', created: 28, completed: 20 },
  { date: 'Thu', created: 52, completed: 48 },
  { date: 'Fri', created: 60, completed: 55 },
  { date: 'Sat', created: 15, completed: 12 },
  { date: 'Sun', created: 18, completed: 10 },
];

const completionRateData = [
  { store: 'Store A', rate: 92 },
  { store: 'Store B', rate: 85 },
  { store: 'Store C', rate: 98 },
  { store: 'Store D', rate: 78 },
  { store: 'Store E', rate: 95 },
  { store: 'Store F', rate: 88 },
];

const recentSubmissions = [
  { id: 'TSK-001', store: 'Store A', task: 'Display Check', status: 'Completed' },
  { id: 'TSK-002', store: 'Store C', task: 'Stock Count', status: 'Pending Review' },
  { id: 'TSK-003', store: 'Store B', task: 'Cleanliness Audit', status: 'Completed' },
  { id: 'TSK-004', store: 'Store D', task: 'POSM Setup', status: 'Overdue' },
  { id: 'TSK-005', store: 'Store A', task: 'Price Verification', status: 'Pending Review' },
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'Completed':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700">Completed</Badge>;
    case 'Pending Review':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700">Pending Review</Badge>;
    case 'Overdue':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-700">Overdue</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">982</div>
            <p className="text-xs text-muted-foreground">78.3% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+5 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">12</div>
            <p className="text-xs text-muted-foreground">Action required</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Task Activity This Week</CardTitle>
            <CardDescription>Created vs. Completed tasks.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={taskActivityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Line type="monotone" dataKey="created" stroke="hsl(var(--primary))" strokeWidth={2} name="Created" />
                <Line type="monotone" dataKey="completed" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Completed" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Completion Rate by Store</CardTitle>
            <CardDescription>Top performing stores.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={completionRateData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="store" width={60} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--accent))' }}
                  contentStyle={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>
            Latest task submissions from stores pending your review.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Task Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.id}</TableCell>
                  <TableCell>{submission.store}</TableCell>
                  <TableCell>{submission.task}</TableCell>
                  <TableCell>
                    <StatusBadge status={submission.status} />
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
