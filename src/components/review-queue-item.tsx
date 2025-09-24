
'use client';

import { Submission } from '@/lib/submissions';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  ImageIcon,
  ListChecks,
  TextCursorInput,
  FileText,
  ClipboardList,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ReviewQueueItemProps {
  review: Submission;
  isSelected: boolean;
  onClick: () => void;
}

const getPrimaryRequirementType = (review: Submission) => {
    // Return a generic icon as a submission can have multiple types.
    return <ClipboardList className="h-5 w-5 text-muted-foreground" />;
};

const getSubmitterAvatar = (avatarId?: string) => {
  if (!avatarId) return null;
  return PlaceHolderImages.find(img => img.id === avatarId);
};


export function ReviewQueueItem({
  review,
  isSelected,
  onClick,
}: ReviewQueueItemProps) {
  const submitterAvatar = getSubmitterAvatar(review.submittedByAvatarId);
  const fallback = review.submittedBy.charAt(0);

  return (
    <Button
      variant={isSelected ? 'secondary' : 'ghost'}
      className="h-auto w-full justify-start p-3"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 w-full">
         <div className="h-10 w-10 flex-shrink-0 rounded-md bg-muted flex items-center justify-center">
            {getPrimaryRequirementType(review)}
          </div>

        <div className="flex-1 text-left overflow-hidden">
          <p
            className={cn(
              'font-semibold text-sm truncate',
              isSelected && 'text-foreground'
            )}
          >
            {review.taskName}
          </p>
          <p className="text-xs text-muted-foreground truncate">{review.store}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground font-mono">
            <span className="truncate" title={review.taskId}>Tsk: {review.taskId}</span>
            <span className="truncate" title={review.id}>Sub: {review.id}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="h-5 w-5">
              {submitterAvatar && (
                <AvatarImage src={submitterAvatar.imageUrl} />
              )}
              <AvatarFallback className="text-xs">{fallback}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {review.submittedBy} &middot; {review.submissionTime}
            </span>
          </div>
        </div>
      </div>
    </Button>
  );
}
