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
import { Check, X, ThumbsUp, MessageSquareWarning } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Badge } from '@/components/ui/badge';

const pendingReviews = [
  { id: 1, task: 'New Campaign POSM Setup', store: 'Store A', submissionTime: '2 hours ago' },
  { id: 2, task: 'Weekly Display Check', store: 'Store C', submissionTime: '5 hours ago' },
  { id: 3, task: 'Stock Count Verification', store: 'Store B', submissionTime: '1 day ago' },
  { id: 4, task: 'Cleanliness Audit Photo', store: 'Store F', submissionTime: '2 days ago' },
];

export default function ReviewPage() {
  const reviewImage = placeholderImages.find(p => p.id === 'review-image-1');

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
                {pendingReviews.map((review, index) => (
                  <Button
                    key={review.id}
                    variant={index === 0 ? 'secondary' : 'ghost'}
                    className="h-auto w-full justify-start text-left"
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
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Review Submission</CardTitle>
            <CardDescription>
              Task: <span className="font-medium text-foreground">New Campaign POSM Setup</span> from <span className="font-medium text-foreground">Store A</span>
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
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Main banner is visible from entrance.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Wobblers are attached to featured products.</span>
                </li>
                <li className="flex items-center gap-3">
                  <X className="h-5 w-5 text-red-500" />
                  <span>Brochures are available at the counter.</span>
                  <Badge variant="destructive">Failed</Badge>
                </li>
              </ul>
            </div>
            <Separator />
            <div>
                <h3 className="text-lg font-semibold mb-2">Feedback</h3>
                <Textarea placeholder="Provide feedback for rejection or comments for approval..." />
            </div>
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
      </div>
    </div>
  );
}
