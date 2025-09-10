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
import { Check, X, ThumbsUp, MessageSquareWarning, CircleCheck, Info } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Badge } from '@/components/ui/badge';
import * as React from 'react';
import { useToast } from '@/hooks/use-toast';

const initialPendingReviews = [
  { id: 1, task: 'New Campaign POSM Setup', store: 'Store A', submissionTime: '2 hours ago', checklist: [
    { id: 1, text: 'Main banner is visible from entrance.', pass: true },
    { id: 2, text: 'Wobblers are attached to featured products.', pass: true },
    { id: 3, text: 'Brochures are available at the counter.', pass: false },
  ], imageId: 'review-image-1' },
  { id: 2, task: 'Weekly Display Check', store: 'Store C', submissionTime: '5 hours ago', checklist: [
    { id: 1, text: 'Aisle is clean and unobstructed.', pass: true },
    { id: 2, text: 'Products are front-facing.', pass: true },
  ], imageId: 'review-image-2' },
  { id: 3, task: 'Stock Count Verification', store: 'Store B', submissionTime: '1 day ago', checklist: [
    { id: 1, text: 'Count matches system records.', pass: false },
    { id: 2, text: 'Discrepancy report filed.', pass: true },
  ], imageId: 'review-image-3' },
  { id: 4, task: 'Cleanliness Audit Photo', store: 'Store F', submissionTime: '2 days ago', checklist: [
    { id: 1, text: 'Floor is clean.', pass: true },
    { id: 2, text: 'Shelves are dust-free.', pass: true },
  ], imageId: 'review-image-4' },
];

export default function ReviewPage() {
  const { toast } = useToast();
  const [reviews, setReviews] = React.useState(initialPendingReviews);
  const [selectedReviewId, setSelectedReviewId] = React.useState<number | null>(
    initialPendingReviews.length > 0 ? initialPendingReviews[0].id : null
  );
  const [feedback, setFeedback] = React.useState('');

  const selectedReview = reviews.find((r) => r.id === selectedReviewId);
  const reviewImage = placeholderImages.find(p => p.id === selectedReview?.imageId);

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
      description: `Task "${selectedReview.task}" from ${selectedReview.store} has been ${action.toLowerCase()}.`,
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
                      <p className="font-semibold">{review.task}</p>
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
        {selectedReview ? (
            <Card>
            <CardHeader>
                <CardTitle>Review Submission</CardTitle>
                <CardDescription>
                Task: <span className="font-medium text-foreground">{selectedReview.task}</span> from <span className="font-medium text-foreground">{selectedReview.store}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                <h3 className="text-lg font-semibold mb-2">Submitted Image</h3>
                <div className="overflow-hidden rounded-lg border">
                    <Image
                    src={reviewImage?.imageUrl || "https://picsum.photos/seed/101/600/400"}
                    alt="POSM Setup"
                    width={600}
                    height={400}
                    className="aspect-[3/2] w-full object-cover"
                    data-ai-hint={reviewImage?.imageHint}
                    />
                </div>
                </div>
                <Separator />
                <div>
                <h3 className="text-lg font-semibold mb-2">Checklist Items</h3>
                <ul className="space-y-3">
                    {selectedReview.checklist.map(item => (
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
                </div>
                <Separator />
                <div>
                    <h3 className="text-lg font-semibold mb-2">Feedback</h3>
                    <Textarea 
                        placeholder="Provide feedback for rejection or comments for approval..." 
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>
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
        ) : (
            <Card className="flex h-[calc(100vh-120px)] items-center justify-center">
                <CardContent className="text-center text-muted-foreground">
                    <Info className="mx-auto h-12 w-12" />
                    <p className="mt-4 font-semibold">No Submission Selected</p>
                    <p className="text-sm">Please select a submission from the list on the left.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
