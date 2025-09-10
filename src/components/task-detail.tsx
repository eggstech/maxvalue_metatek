'use client';

import { Task } from "@/lib/tasks";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Calendar, CheckSquare, Tag, Store, Info } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { initialSubmissions } from "@/lib/submissions";
import Link from "next/link";

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

const mockSubmissions = initialSubmissions.slice(0, 3); // Take first 3 for the task detail page

export function TaskDetail({ task }: { task: Task }) {
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">{task.name}</CardTitle>
                        <CardDescription>
                            {task.description || "No description provided for this task."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {task.type === 'Checklist' && task.checklist && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Checklist</h3>
                                <div className="space-y-3 rounded-md border p-4">
                                    {task.checklist.map(item => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <Checkbox id={`checklist-${item.id}`} />
                                            <label htmlFor={`checklist-${item.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {item.text}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Submissions</h3>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Submission ID</TableHead>
                                        <TableHead>Store</TableHead>
                                        <TableHead>Submitted By</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockSubmissions.map(sub => (
                                        <TableRow key={sub.id}>
                                            <TableCell className="font-medium">
                                                <Link href={`/submissions/${sub.id}`} className="text-primary hover:underline">
                                                    {sub.id}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{sub.store}</TableCell>
                                            <TableCell>{sub.submittedBy}</TableCell>
                                            <TableCell>{sub.date}</TableCell>
                                            <TableCell>
                                                <Badge variant={
                                                    sub.status === 'Approved' ? 'default' : sub.status === 'Rejected' ? 'destructive' : sub.status === 'Pending Review' ? 'secondary' : 'outline'
                                                }>{sub.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Task Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Info className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <StatusBadge status={task.status} />
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center gap-3">
                            <Store className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Assigned To</p>
                                <p className="font-medium">{task.store}</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Due Date</p>
                                <p className="font-medium">{task.dueDate}</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center gap-3">
                            <Tag className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Type</p>
                                <p className="font-medium">{task.type}</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center gap-3">
                            <CheckSquare className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Task ID</p>
                                <p className="font-mono text-xs">{task.id}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
