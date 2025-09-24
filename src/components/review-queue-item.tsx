
'use client';

import { Submission } from '@/lib/submissions';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ReviewQueueItemProps {
  review: Submission;
  isSelected: boolean;
}

const getSubmitterAvatar = (avatarId?: string) => {
  if (!avatarId) return null;
  return PlaceHolderImages.find(img => img.id === avatarId);
};


export function ReviewQueueItem({
  review,
  isSelected,
}: ReviewQueueItemProps) {
  const submitterAvatar = getSubmitterAvatar(review.submittedByAvatarId);
  const fallback = review.submittedBy.charAt(0);

  return (
    <Card className={cn(
        "hover:border-primary/80 transition-colors",
        isSelected && 'border-primary bg-primary/5'
    )}>
        <CardHeader className="p-3">
            <CardTitle className="text-sm font-semibold">{review.taskName}</CardTitle>
            <CardDescription>{review.store}</CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                <span className="truncate" title={review.taskId}>Tsk: {review.taskId}</span>
                <span className="truncate" title={review.id}>Sub: {review.id}</span>
            </div>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex items-center justify-between text-xs text-muted-foreground">
             <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                {submitterAvatar && (
                    <AvatarImage src={submitterAvatar.imageUrl} />
                )}
                <AvatarFallback className="text-xs">{fallback}</AvatarFallback>
                </Avatar>
                <span className="">
                {review.submittedBy}
                </span>
            </div>
            <span>{review.submissionTime}</span>
        </CardFooter>
    </Card>
  );
}
