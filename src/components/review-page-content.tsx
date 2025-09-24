
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
import { Textarea } from '@/components/ui/textarea';
import {
  Check,
  X,
  ThumbsUp,
  MessageSquareWarning,
  CircleCheck,
  Info,
  TextCursorInput,
  ImageIcon,
  ListChecks,
} from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Submission, SubmissionResult } from '@/lib/submissions';
import { getTaskById } from '@/lib/tasks';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const RequirementIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'image':
    case 'pdf-standard':
      return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
    case 'data-entry':
      return <TextCursorInput className="h-5 w-5 text-muted-foreground" />;
    case 'checklist':
      return <ListChecks className="h-5 w-5 text-muted-foreground" />;
    default:
      return null;
  }
};

const findImageById = (id: string) => {
  return PlaceHolderImages.find(img => img.id === id);
};

interface ReviewPageContentProps {
  review: Submission | undefined;
  onReviewAction: (submissionId: string, action: 'Approved' | 'Rejected') => void;
  reviewCount: number;
}

export function ReviewPageContent({
  review,
  onReviewAction,
  reviewCount,
}: ReviewPageContentProps) {
  const { toast } = useToast();
  const [feedback, setFeedback] = React.useState('');
  const originalTask = review ? getTaskById(review.taskId) : null;

  const handleAction = (action: 'Approved' | 'Rejected') => {
    if (!review) return;

    if (action === 'Rejected' && !feedback.trim()) {
      toast({
        title: 'Feedback Required',
        description: 'Please provide feedback before rejecting.',
        variant: 'destructive',
      });
      return;
    }

    onReviewAction(review.id, action);
    setFeedback('');

    toast({
      title: `Submission ${action}`,
      description: `Task "${review.taskName}" from ${review.store} has been ${action.toLowerCase()}.`,
      className: action === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-700' : ''
    });
  };

  const findResultForRequirement = (
    reqIndex: number
  ): SubmissionResult | undefined => {
    return review?.results.find(res => res.requirementId === reqIndex);
  };

  if (!review) {
    return (
      <Card className="flex h-full min-h-[70vh] items-center justify-center">
        <CardContent className="text-center text-muted-foreground p-8">
            {reviewCount > 0 ? (
                <>
                    <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                    <div className="space-y-2 mt-4">
                        <Skeleton className="h-4 w-[250px] mx-auto" />
                        <Skeleton className="h-4 w-[200px] mx-auto" />
                    </div>
                </>
            ) : (
                <div className="text-center text-muted-foreground">
                    <CircleCheck className="mx-auto h-12 w-12 text-green-500" />
                    <p className="mt-4 font-semibold">All caught up!</p>
                    <p className="text-sm">There are no more pending reviews.</p>
                </div>
            )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{review.taskName}</CardTitle>
          <CardDescription>
            Submitted by{' '}
            <span className="font-medium text-foreground">
              {review.submittedBy}
            </span>{' '}
            from{' '}
            <span className="font-medium text-foreground">{review.store}</span>
          </CardDescription>
        </CardHeader>
        {originalTask?.description && (
            <CardContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                <ReactMarkdown>{originalTask.description}</ReactMarkdown>
            </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submission Review</CardTitle>
          <CardDescription>
            Review the submitted results against the original requirements.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {originalTask?.requirements?.map((req, index) => {
            const result = findResultForRequirement(index);
            return (
              <div key={index} className="p-4 border rounded-lg bg-muted/30">
                <div className="flex items-start gap-3">
                  <RequirementIcon type={req.type} />
                  <div className="flex-1 space-y-3">
                    <Label className="text-base font-semibold">{req.label}</Label>

                    {result ? (
                      <div className="rounded-md bg-background/50 p-4 border border-dashed">
                        {(result.type === 'image' || result.type === 'pdf-standard') &&
                        result.value &&
                        Array.isArray(result.value) ? (
                          <div className="flex flex-wrap gap-4">
                            {result.value.map((imgId, imgIndex) => {
                                const imageData = findImageById(imgId);
                                if (!imageData) return null;
                                return (
                                <div
                                    key={imgIndex}
                                    className="overflow-hidden rounded-lg border w-fit"
                                >
                                    <Image
                                    src={imageData.imageUrl}
                                    alt={`Submission for ${req.label} #${
                                        imgIndex + 1
                                    }`}
                                    width={300}
                                    height={225}
                                    className="object-cover"
                                    data-ai-hint={imageData.imageHint}
                                    />
                                </div>
                                )
                            })}
                          </div>
                        ) : result.type === 'checklist' && result.value ? (
                          <ul className="space-y-3">
                            {(result.value as any[]).map(
                              (item: any, itemIdx: number) => (
                                <li
                                  key={itemIdx}
                                  className="flex items-center gap-3"
                                >
                                  {item.pass ? (
                                    <Check className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <X className="h-5 w-5 text-red-500" />
                                  )}
                                  <span>{item.text}</span>
                                </li>
                              )
                            )}
                          </ul>
                        ) : result.type === 'data-entry' &&
                          typeof result.value === 'string' ? (
                          <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md w-fit">
                            {result.value}
                          </p>
                        ) : result.type === 'data-entry' &&
                          Array.isArray(result.value) ? (
                          <ul className="space-y-2 list-disc list-inside">
                            {result.value.map((val, valIdx) => (
                              <li key={valIdx}>{val}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ) : (
                      <div className="rounded-md bg-background/50 p-4 border-dashed border text-muted-foreground text-sm">
                        No submission for this requirement.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {(!originalTask?.requirements ||
            originalTask.requirements.length === 0) && (
            <div className="text-center text-muted-foreground p-4">
              <Info className="mx-auto h-8 w-8" />
              <p className="mt-2 text-sm">
                This task did not have specific submission requirements.
              </p>
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
            onChange={e => setFeedback(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/50"
            onClick={() => handleAction('Rejected')}
          >
            <MessageSquareWarning className="mr-2 h-4 w-4" />
            Reject with Feedback
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => handleAction('Approved')}
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            Approve
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
