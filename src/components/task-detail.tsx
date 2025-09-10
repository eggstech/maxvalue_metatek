'use client';

import { Task } from "@/lib/tasks";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, CheckSquare, Tag, Store, Info, Image as ImageIcon, TextCursorInput, ListChecks, Repeat } from "lucide-react";
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
import ReactMarkdown from 'react-markdown';
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

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

const SubmissionStatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700">Approved</Badge>;
      case 'Pending Review':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700">Pending Review</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-700">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
};

const mockSubmissions = initialSubmissions.slice(0, 3); // Take first 3 for the task detail page

const RequirementIcon = ({type}: {type: string}) => {
    switch (type) {
        case 'image': return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
        case 'data-entry': return <TextCursorInput className="h-5 w-5 text-muted-foreground" />;
        case 'checklist': return <ListChecks className="h-5 w-5 text-muted-foreground" />;
        default: return null;
    }
}

export function TaskDetail({ task }: { task: Task }) {
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">{task.name}</CardTitle>
                        <CardDescription className="prose prose-sm dark:prose-invert max-w-none">
                           <ReactMarkdown>{task.description || "No description provided for this task."}</ReactMarkdown>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                            <div className="space-y-4">
                                {task.requirements?.map((req, index) => (
                                    <Card key={index} className="bg-muted/40">
                                        <CardHeader className="flex-row items-start gap-4 space-y-0 p-4">
                                            <RequirementIcon type={req.type} />
                                            <div className="flex-1">
                                                <CardTitle className="text-base">{req.label}</CardTitle>
                                                {req.type === 'image' && <CardDescription>Requires {req.min}-{req.max} image(s).</CardDescription>}
                                                {req.type === 'data-entry' && req.entryType === 'text' && <CardDescription>Text input</CardDescription>}
                                                {req.type === 'data-entry' && req.entryType === 'single' && <CardDescription>Single choice</CardDescription>}
                                                {req.type === 'data-entry' && req.entryType === 'multiple' && <CardDescription>Multiple choice</CardDescription>}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0 pl-12">
                                            {req.type === 'checklist' && req.checklistItems && (
                                                <ul className="space-y-2">
                                                    {req.checklistItems.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="flex items-center gap-2 text-sm">
                                                            <CheckSquare className="h-4 w-4 text-muted-foreground" />
                                                            <span>{item.text}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            {req.type === 'data-entry' && req.entryType === 'single' && req.options && (
                                                <RadioGroup>
                                                    {req.options.map((option, optionIndex) => (
                                                        <div key={optionIndex} className="flex items-center space-x-2">
                                                            <RadioGroupItem value={option.text} id={`${req.label}-option-${optionIndex}`} />
                                                            <Label htmlFor={`${req.label}-option-${optionIndex}`}>{option.text}</Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            )}
                                            {req.type === 'data-entry' && req.entryType === 'multiple' && req.options && (
                                                 <div className="space-y-2">
                                                    {req.options.map((option, optionIndex) => (
                                                        <div key={optionIndex} className="flex items-center space-x-2">
                                                            <Checkbox id={`${req.label}-option-${optionIndex}`} />
                                                            <Label htmlFor={`${req.label}-option-${optionIndex}`}>{option.text}</Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                                {(!task.requirements || task.requirements.length === 0) && (
                                    <p className="text-sm text-muted-foreground">No specific requirements for this task.</p>
                                )}
                            </div>
                        </div>
                        
                        <Separator />

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
                                                <SubmissionStatusBadge status={sub.status}/>
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
                        {task.isRecurring && (
                            <>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <Repeat className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Recurring</p>
                                        <p className="font-medium">Repeats Daily</p>
                                    </div>
                                </div>
                            </>
                        )}
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
