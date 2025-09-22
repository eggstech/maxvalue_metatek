
'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
        <div className="grid gap-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Your Assigned Tasks</h1>
                <p className="text-muted-foreground">Complete pending tasks and review your completed work.</p>
            </div>
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Pending ({pendingTasks.length})</h2>
                {pendingTasks.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {pendingTasks.map(task => (
                            <Link href={`/field/task/${task.id}`} key={task.id}>
                                <Card className="hover:border-primary transition-colors h-full flex flex-col group">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-lg group-hover:text-primary">{task.name}</CardTitle>
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
                                    <CardFooter className="pt-4 justify-end">
                                        <div className="flex items-center text-sm font-medium text-primary">
                                            Start Task <ArrowRight className="ml-2 h-4 w-4" />
                                        </div>
                                    </CardFooter>
                                </Card>
                             </Link>
                        ))}
                    </div>
                ) : (
                    <Card className="flex items-center justify-center p-12 bg-muted/40">
                        <div className="text-center">
                            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2"/>
                            <p className="text-muted-foreground font-semibold">You have no pending tasks. Great job!</p>
                        </div>
                    </Card>
                )}
            </div>
             <div className="space-y-4">
                <h2 className="text-xl font-semibold">Completed ({completedTasks.length})</h2>
                 {completedTasks.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {completedTasks.map(task => (
                             <Link href={`/field/task/${task.id}`} key={task.id}>
                                <Card className="bg-muted/70 hover:border-muted-foreground/50 transition-colors h-full flex flex-col group">
                                    <CardHeader>
                                         <div className="flex items-start justify-between">
                                            <CardTitle className="text-lg text-muted-foreground group-hover:text-foreground">{task.name}</CardTitle>
                                            {getStatusIcon(task.status)}
                                        </div>
                                        <CardDescription className="flex items-center gap-2 pt-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>Completed: {task.dueDate}</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <Badge variant="secondary">{task.type}</Badge>
                                    </CardContent>
                                    <CardFooter className="pt-4 justify-end">
                                        <div className="flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground">
                                            View Submission <ArrowRight className="ml-2 h-4 w-4" />
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}
                    </div>
                 ): (
                    <Card className="flex items-center justify-center p-12 bg-muted/40 border-dashed">
                        <p className="text-muted-foreground text-sm">No tasks completed yet.</p>
                    </Card>
                 )}
            </div>
        </div>
    );
}
