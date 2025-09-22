
'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { initialTasks, Task } from "@/lib/tasks";
import { ArrowRight, Calendar, CheckCircle2, Circle, Clock, MessageSquareWarning, Hourglass } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

const getStatusInfo = (status: Task['status']) => {
    switch (status) {
        case 'Active':
            return { icon: <Clock className="h-5 w-5 text-yellow-500" />, text: 'Due' };
        case 'Overdue':
            return { icon: <Clock className="h-5 w-5 text-red-500" />, text: 'Overdue' };
        case 'Rejected':
            return { icon: <MessageSquareWarning className="h-5 w-5 text-orange-500" />, text: 'Rejected' };
        case 'Pending Review':
            return { icon: <Hourglass className="h-5 w-5 text-blue-500" />, text: 'Submitted' };
        case 'Completed':
            return { icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, text: 'Completed' };
        default:
            return { icon: <Circle className="h-5 w-5 text-muted-foreground" />, text: 'Due' };
    }
}

const getActionText = (status: Task['status']) => {
    switch (status) {
        case 'Rejected':
            return 'Resubmit Task';
        case 'Pending Review':
            return 'View Submission';
        case 'Completed':
            return 'View Submission';
        default:
            return 'Start Task';
    }
}

const fieldTasks = initialTasks.filter(t => ['Active', 'Completed', 'Overdue', 'Rejected', 'Pending Review'].includes(t.status));

export default function FieldTaskPage() {

    const [tasks, setTasks] = React.useState(fieldTasks);
    
    const pendingTasks = tasks.filter(t => ['Active', 'Overdue', 'Rejected'].includes(t.status));
    const completedTasks = tasks.filter(t => ['Completed', 'Pending Review'].includes(t.status));

    return (
        <div className="flex flex-col gap-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Your Assigned Tasks</h1>
                <p className="text-muted-foreground">Complete pending tasks and review your completed work.</p>
            </div>
            
            <Tabs defaultValue="board">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px] mx-auto">
                    <TabsTrigger value="board">Board View</TabsTrigger>
                    <TabsTrigger value="table">Table View</TabsTrigger>
                </TabsList>
                <TabsContent value="board" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Pending Column */}
                        <div className="space-y-4">
                            <div className="p-3 rounded-lg bg-muted">
                                <h2 className="text-lg font-semibold">To Do ({pendingTasks.length})</h2>
                            </div>
                            {pendingTasks.length > 0 ? (
                                <div className="space-y-4">
                                    {pendingTasks.map(task => {
                                        const { icon, text: datePrefix } = getStatusInfo(task.status);
                                        const actionText = getActionText(task.status);
                                        const cardClass = task.status === 'Rejected' 
                                            ? "border-orange-500/50 hover:border-orange-500" 
                                            : "hover:border-primary";

                                        return (
                                            <Link href={`/field/task/${task.id}`} key={task.id}>
                                                <Card className={`${cardClass} transition-colors group`}>
                                                    <CardHeader>
                                                        <div className="flex items-start justify-between">
                                                            <CardTitle className="text-lg group-hover:text-primary">{task.name}</CardTitle>
                                                            {icon}
                                                        </div>
                                                        <CardDescription className="flex items-center gap-2 pt-1">
                                                            <Calendar className="h-4 w-4" />
                                                            <span>{datePrefix}: {task.dueDate}</span>
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <Badge variant={task.status === 'Rejected' ? 'destructive' : 'outline'}>
                                                            {task.status}
                                                        </Badge>
                                                    </CardContent>
                                                    <CardFooter className="pt-4 justify-end">
                                                        <div className="flex items-center text-sm font-medium text-primary">
                                                            {actionText} <ArrowRight className="ml-2 h-4 w-4" />
                                                        </div>
                                                    </CardFooter>
                                                </Card>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <Card className="flex items-center justify-center p-12 bg-muted/40">
                                    <div className="text-center">
                                        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2"/>
                                        <p className="text-muted-foreground font-semibold">No pending tasks. Great job!</p>
                                    </div>
                                </Card>
                            )}
                        </div>

                        {/* Completed Column */}
                        <div className="space-y-4">
                            <div className="p-3 rounded-lg bg-muted">
                                <h2 className="text-lg font-semibold">Done ({completedTasks.length})</h2>
                            </div>
                            {completedTasks.length > 0 ? (
                                <div className="space-y-4">
                                    {completedTasks.map(task => {
                                        const { icon, text: datePrefix } = getStatusInfo(task.status);
                                        const actionText = getActionText(task.status);
                                        const cardClass = task.status === 'Pending Review' 
                                            ? "bg-blue-500/5 hover:border-blue-500/50"
                                            : "bg-muted/70 hover:border-muted-foreground/50";
                                        const titleClass = task.status === 'Pending Review' 
                                            ? "text-blue-900 dark:text-blue-200 group-hover:text-blue-600"
                                            : "text-muted-foreground group-hover:text-foreground";
                                        
                                        return (
                                        <Link href={`/field/task/${task.id}`} key={task.id}>
                                            <Card className={`${cardClass} transition-colors group`}>
                                                <CardHeader>
                                                    <div className="flex items-start justify-between">
                                                        <CardTitle className={`text-lg ${titleClass}`}>{task.name}</CardTitle>
                                                        {icon}
                                                    </div>
                                                    <CardDescription className="flex items-center gap-2 pt-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{datePrefix}: {task.dueDate}</span>
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <Badge variant={task.status === 'Pending Review' ? 'default' : 'secondary'} className={task.status === 'Pending Review' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}>
                                                        {task.status}
                                                    </Badge>
                                                </CardContent>
                                                <CardFooter className="pt-4 justify-end">
                                                    <div className="flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground">
                                                        {actionText} <ArrowRight className="ml-2 h-4 w-4" />
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <Card className="flex items-center justify-center p-12 bg-muted/40 border-dashed">
                                    <p className="text-muted-foreground text-sm">No tasks completed yet.</p>
                                </Card>
                            )}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="table" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <DataTable columns={columns} data={tasks} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
