
import { getSubmissionById } from '@/lib/submissions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Check, X, ThumbsUp, MessageSquareWarning, Calendar, Store, User, Info, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const StatusBadge = ({ status }: { status: string }) => {
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

export default function SubmissionDetailPage({ params }: { params: { id: string } }) {
  const submission = getSubmissionById(params.id);

  if (!submission) {
    notFound();
  }

  const isPending = submission.status === 'Pending Review';

  return (
    <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">{submission.taskName}</CardTitle>
                    <CardDescription>
                        Submission ID: {submission.id}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {submission.imageUrl && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Submitted Image</h3>
                            <div className="overflow-hidden rounded-lg border">
                                <Image
                                    src={submission.imageUrl}
                                    alt={submission.taskName}
                                    width={800}
                                    height={600}
                                    className="aspect-[4/3] w-full object-cover"
                                    data-ai-hint={submission.imageHint}
                                />
                            </div>
                        </div>
                    )}
                    {submission.checklist && <Separator />}
                    {submission.checklist && (
                         <div>
                            <h3 className="text-lg font-semibold mb-2">Checklist Items</h3>
                            <ul className="space-y-3">
                                {submission.checklist.map(item => (
                                    <li key={item.id} className="flex items-start gap-3">
                                        {item.checked ? <Check className="h-5 w-5 text-green-500 mt-0.5" /> : <X className="h-5 w-5 text-red-500 mt-0.5" />}
                                        <div className="flex-1">
                                            <span>{item.text}</span>
                                            {!item.checked && item.reason && (
                                                <p className="text-xs text-muted-foreground italic">Reason: {item.reason}</p>
                                            )}
                                        </div>
                                        {!item.checked && <Badge variant="destructive">Failed</Badge>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </CardContent>
            </Card>
            {isPending && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Review & Action</CardTitle>
                        <CardDescription>Provide feedback and approve or reject this submission.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea placeholder="Provide feedback for rejection or comments for approval..." />
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" className='text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/50'>
                        <MessageSquareWarning className="mr-2 h-4 w-4" />
                        Reject with Feedback
                        </Button>
                        <Button className='bg-green-600 hover:bg-green-700 text-white'>
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Approve
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Submission Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     {submission.feedback && (
                        <Alert variant={submission.status === 'Rejected' ? 'destructive' : 'default'}>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Feedback</AlertTitle>
                            <AlertDescription>
                                {submission.feedback}
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="flex items-center gap-3">
                        <Info className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <StatusBadge status={submission.status} />
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                        <Store className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Store</p>
                            <p className="font-medium">{submission.store}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Submitted By</p>
                            <p className="font-medium">{submission.submittedBy}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Submission Date</p>
                            <p className="font-medium">{submission.date}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
