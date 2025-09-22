
'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { initialTasks, Task } from "@/lib/tasks";
import { ArrowRight, Calendar, CheckCircle2, Circle, Clock } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const fieldTasks = initialTasks.filter(t => t.status === 'Active' || t.status === 'Completed').slice(0, 4);

const getStatusIcon = (status: Task['status']) => {
    switch (status) {
        case 'Active':
            return <Clock className="h-5 w-5 text-yellow-500" />;
        case 'Completed':
            return <CheckCircle2 className="h-5 w-5 text-green-500" />;
        default:
            return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
}

export default function FieldTaskPage() {

    const [tasks, setTasks] = React.useState(fieldTasks);
    const pendingTasks = tasks.filter(t => t.status === 'Active');
    const completedTasks = tasks.filter(t => t.status === 'Completed');

    return (
        <div className="grid gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Your Tasks</h1>
                <p className="text-muted-foreground">Here are the tasks assigned to you.</p>
            </div>
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Pending ({pendingTasks.length})</h2>
                {pendingTasks.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {pendingTasks.map(task => (
                            <Link href={`/field/task/${task.id}`} key={task.id}>
                                <Card className="hover:border-primary transition-colors h-full flex flex-col">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-lg">{task.name}</CardTitle>
                                            {getStatusIcon(task.status)}
                                        </div>
                                        <CardDescription className="flex items-center gap-2 pt-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>Due: {task.dueDate}</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <Badge variant="outline">{task.type}</Badge>
                                    </CardContent>
                                </Card>
                             </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-sm">You have no pending tasks. Great job!</p>
                )}
            </div>
             <div className="space-y-4">
                <h2 className="text-lg font-semibold">Completed ({completedTasks.length})</h2>
                 {completedTasks.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {completedTasks.map(task => (
                             <Link href={`/field/task/${task.id}`} key={task.id}>
                                <Card className="bg-muted/70 hover:border-primary/50 transition-colors h-full flex flex-col">
                                    <CardHeader>
                                         <div className="flex items-start justify-between">
                                            <CardTitle className="text-lg">{task.name}</CardTitle>
                                            {getStatusIcon(task.status)}
                                        </div>
                                        <CardDescription className="flex items-center gap-2 pt-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>Due: {task.dueDate}</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <Badge variant="secondary">{task.type}</Badge>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                 ): (
                    <p className="text-muted-foreground text-sm">No tasks completed yet.</p>
                 )}
            </div>
        </div>
    );
}