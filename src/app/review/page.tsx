
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, ThumbsUp, MessageSquareWarning, CircleCheck, Info, CheckSquare, TextCursorInput, ImageIcon, ListChecks } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Submission, initialSubmissions } from '@/lib/submissions';
import { getTaskById, Task } from '@/lib/tasks';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';


const RequirementIcon = ({type}: {type: string}) => {
    switch (type) {
        case 'image': return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
        case 'data-entry': return <TextCursorInput className="h-5 w-5 text-muted-foreground" />;
        case 'checklist': return <ListChecks className="h-5 w-5 text-muted-foreground" />;
        default: return null;
    }
}


export default function ReviewPage() {
  const { toast } = useToast();
  const [reviews, setReviews] = React.useState<Submission[]>(initialSubmissions);
  const [selectedReviewId, setSelectedReviewId] = React.useState<string | null>(
    initialSubmissions.length > 0 ? initialSubmissions[0].id : null
  );
  const [feedback, setFeedback] = React.useState('');

  const selectedReview = reviews.find((r) => r.id === selectedReviewId);
  const originalTask = selectedReview ? getTaskById(selectedReview.taskId) : null;

  const handleAction = (action: 'Approved' | 'Rejected') => {
    if (!selectedReview) return;
    
    if (action === 'Rejected' && !feedback.trim()) {
        toast({
            title: 'Feedback Required',
            description: 'Please provide feedback before rejecting.',
            variant: 'destructive',
        });
        return;
    }

    const newReviews = reviews.filter((r) => r.id !== selectedReviewId);
    setReviews(newReviews);
    
    const nextReview = newReviews.length > 0 ? newReviews[0] : null;
    setSelectedReviewId(nextReview ? nextReview.id : null);
    
    setFeedback('');
    toast({
      title: `Submission ${action}`,
      description: `Task "${selectedReview.taskName}" from ${selectedReview.store} has been ${action.toLowerCase()}.`,
    });
  };


  return (
    <div className="grid h-full flex-1 gap-6 md:grid-cols-[300px_1fr]">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
            <CardDescription>Select a submission to review.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="flex flex-col gap-4">
                {reviews.map((review) => (
                  <Button
                    key={review.id}
                    variant={review.id === selectedReviewId ? 'secondary' : 'ghost'}
                    className="h-auto w-full justify-start text-left"
                    onClick={() => setSelectedReviewId(review.id)}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <p className="font-semibold">{review.taskName}</p>
                      <div className="flex w-full justify-between text-xs text-muted-foreground">
                        <span>{review.store}</span>
                        <span>{review.submissionTime}</span>
                      </div>
                    </div>
                  </Button>
                ))}
                {reviews.length === 0 && (
                    <div className="text-center text-muted-foreground p-8">
                        <CircleCheck className="mx-auto h-12 w-12 text-green-500" />
                        <p className="mt-4">All caught up!</p>
                        <p className="text-sm">There are no more pending reviews.</p>
                    </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div>
        {selectedReview && originalTask ? (
            <div className='space-y-6'>
                <Card>
                    <CardHeader>
                        <CardTitle>Review Submission</CardTitle>
                        <CardDescription>
                        Task: <span className="font-medium text-foreground">{selectedReview.taskName}</span> from <span className="font-medium text-foreground">{selectedReview.store}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-6">
                            {/* Left Column: Original Request */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Original Request</h3>
                                <Card className="bg-muted/30">
                                    <CardContent className="p-4 space-y-4">
                                        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                                            <ReactMarkdown>{originalTask.description || "No description provided."}</ReactMarkdown>
                                        </div>
                                        <Separator />
                                        <h4 className="font-semibold text-sm">Requirements:</h4>
                                        <div className="space-y-3">
                                            {originalTask.requirements?.map((req) => (
                                                <div key={req.label} className="flex items-start gap-3 text-sm">
                                                    <RequirementIcon type={req.type} />
                                                    <div className="flex-1">
                                                        <p className='font-medium text-foreground'>{req.label}</p>
                                                        {req.type === 'image' && <p className="text-xs text-muted-foreground">Requires {req.min}-{req.max} image(s)</p>}
                                                        {req.type === 'checklist' && req.checklistItems && (
                                                            <ul className='mt-1 space-y-1 text-xs text-muted-foreground list-disc list-inside'>
                                                                {req.checklistItems.map(item => <li key={item.text}>{item.text}</li>)}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column: Submitted Result */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Submitted Result</h3>
                                <div className="space-y-4">
                                    {selectedReview.results.map(result => (
                                        <div key={result.requirementId}>
                                            {result.type === 'image' && result.imageUrl && (
                                                <div className="overflow-hidden rounded-lg border">
                                                    <Image
                                                    src={result.imageUrl}
                                                    alt="Submission Image"
                                                    width={600}
                                                    height={400}
                                                    className="aspect-[3/2] w-full object-cover"
                                                    data-ai-hint={result.imageHint}
                                                    />
                                                </div>

                                            )}
                                            {result.type === 'checklist' && result.checklist && (
                                                <ul className="space-y-3 rounded-md border p-4">
                                                    {result.checklist.map(item => (
                                                        <li key={item.id} className="flex items-center gap-3">
                                                            {item.pass ? (
                                                                <Check className="h-5 w-5 text-green-500" />
                                                            ) : (
                                                                <X className="h-5 w-5 text-red-500" />
                                                            )}
                                                            <span>{item.text}</span>
                                                            {!item.pass && <Badge variant="destructive">Failed</Badge>}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Feedback & Action</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea 
                            placeholder="Provide feedback for rejection or comments for approval..." 
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" className='text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/50' onClick={() => handleAction('Rejected')}>
                        <MessageSquareWarning className="mr-2 h-4 w-4" />
                        Reject with Feedback
                        </Button>
                        <Button className='bg-green-600 hover:bg-green-700 text-white' onClick={() => handleAction('Approved')}>
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Approve
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        ) : (
            <Card className="flex h-[calc(100vh-120px)] items-center justify-center">
                <CardContent className="text-center text-muted-foreground">
                    {reviews.length > 0 ? (
                        <>
                            <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                            <div className="space-y-2 mt-4">
                                <Skeleton className="h-4 w-[250px] mx-auto" />
                                <Skeleton className="h-4 w-[200px] mx-auto" />
                            </div>
                        </>
                    ) : (
                        <>
                            <Info className="mx-auto h-12 w-12" />
                            <p className="mt-4 font-semibold">No Submission Selected</p>
                            <p className="text-sm">Please select a submission from the list on the left.</p>
                        </>
                    )}
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
