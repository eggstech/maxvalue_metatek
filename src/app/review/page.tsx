
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
import { Submission, initialSubmissions, SubmissionResult } from '@/lib/submissions';
import { getTaskById, Task, Requirement } from '@/lib/tasks';
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
  const [reviews, setReviews] = React.useState<Submission[]>(initialSubmissions.filter(s => s.status === 'Pending Review'));
  const [selectedReviewId, setSelectedReviewId] = React.useState<string | null>(
    reviews.length > 0 ? reviews[0].id : null
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

  const findResultForRequirement = (reqIndex: number): SubmissionResult | undefined => {
    return selectedReview?.results.find(res => res.requirementId === reqIndex);
  }

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
                        <CardTitle className="text-2xl">{selectedReview.taskName}</CardTitle>
                        <CardDescription>
                          Submitted by <span className="font-medium text-foreground">{selectedReview.submittedBy}</span> from <span className="font-medium text-foreground">{selectedReview.store}</span>
                        </CardDescription>
                    </CardHeader>
                     <CardContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                        <ReactMarkdown>{originalTask.description || "No description provided for this task."}</ReactMarkdown>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Submission Review</CardTitle>
                        <CardDescription>Review the submitted results against the original requirements.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {originalTask.requirements?.map((req, index) => {
                             const result = findResultForRequirement(index);
                             return (
                                <div key={index} className="p-4 border rounded-lg bg-muted/30">
                                    <div className="flex items-start gap-3">
                                        <RequirementIcon type={req.type} />
                                        <div className="flex-1 space-y-3">
                                            <Label className='text-base font-semibold'>{req.label}</Label>
                                            
                                            {/* Render submitted result */}
                                            {result ? (
                                                <div className='rounded-md bg-background/50 p-4 border border-dashed'>
                                                    {result.type === 'image' && result.value && Array.isArray(result.value) && (
                                                        <div className='flex flex-wrap gap-4'>
                                                            {result.value.map((imgSrc, imgIndex) => (
                                                                <div key={imgIndex} className="overflow-hidden rounded-lg border w-fit">
                                                                    <Image
                                                                        src={imgSrc}
                                                                        alt={`Submission for ${req.label} #${imgIndex + 1}`}
                                                                        width={300}
                                                                        height={225}
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                     {result.type === 'checklist' && result.value && (
                                                        <ul className="space-y-3">
                                                            {result.value.map((item: any, itemIdx: number) => (
                                                                <li key={itemIdx} className="flex items-center gap-3">
                                                                    {item.pass ? (
                                                                        <Check className="h-5 w-5 text-green-500" />
                                                                    ) : (
                                                                        <X className="h-5 w-5 text-red-500" />
                                                                    )}
                                                                    <span>{item.text}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                    {result.type === 'data-entry' && result.value && typeof result.value === 'string' && (
                                                        <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md w-fit">{result.value}</p>
                                                    )}
                                                    {result.type === 'data-entry' && result.value && Array.isArray(result.value) && (
                                                        <ul className='space-y-2 list-disc list-inside'>
                                                            {result.value.map((val, valIdx) => (
                                                                <li key={valIdx}>{val}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className='rounded-md bg-background/50 p-4 border-dashed border text-muted-foreground text-sm'>
                                                    No submission for this requirement.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                             )
                        })}
                         {(!originalTask.requirements || originalTask.requirements.length === 0) && (
                            <div className="text-center text-muted-foreground p-4">
                                <Info className="mx-auto h-8 w-8" />
                                <p className="mt-2 text-sm">This task did not have specific submission requirements.</p>
                                <p className="text-xs">The user marked it as "Done".</p>
                            </div>
                        )}
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
                        <div className="text-center text-muted-foreground p-8">
                            <CircleCheck className="mx-auto h-12 w-12 text-green-500" />
                            <p className="mt-4 font-semibold">All caught up!</p>
                            <p className="text-sm">There are no more pending reviews.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}

    
