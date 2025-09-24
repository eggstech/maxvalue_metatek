
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
  FileCheck,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ReviewQueueItemProps {
  review: Submission;
  isSelected: boolean;
  onClick: () => void;
}

const getPrimaryRequirementType = (review: Submission) => {
  if (review.results.length === 0) return null;
  // This is a simplified logic. A more robust solution would check task definition.
  const primaryResult = review.results[0];
  switch (primaryResult.type) {
    case 'image':
    case 'pdf-standard':
      return <ImageIcon className="h-4 w-4 text-muted-foreground" />;
    case 'checklist':
      return <ListChecks className="h-4 w-4 text-muted-foreground" />;
    case 'data-entry':
      return <TextCursorInput className="h-4 w-4 text-muted-foreground" />;
    default:
      return <FileText className="h-4 w-4 text-muted-foreground" />;
  }
};

const getSubmitterAvatar = (avatarId?: string) => {
  if (!avatarId) return null;
  return PlaceHolderImages.find(img => img.id === avatarId);
};

const getThumbnail = (imageId?: string) => {
  if (!imageId) return null;
  return PlaceHolderImages.find(img => img.id === imageId);
};

export function ReviewQueueItem({
  review,
  isSelected,
  onClick,
}: ReviewQueueItemProps) {
  const submitterAvatar = getSubmitterAvatar(review.submittedByAvatarId);
  const fallback = review.submittedBy.charAt(0);
  const thumbnail = getThumbnail(review.primaryImageId);

  return (
    <Button
      variant={isSelected ? 'secondary' : 'ghost'}
      className="h-auto w-full justify-start p-3"
      onClick={onClick}
    >
      <div className="flex items-start gap-3 w-full">
        {thumbnail ? (
          <div className="relative h-16 w-16 flex-shrink-0">
            <Image
              src={thumbnail.imageUrl}
              alt={review.taskName}
              fill
              className="rounded-md object-cover"
              data-ai-hint={thumbnail.imageHint}
            />
          </div>
        ) : (
          <div className="h-16 w-16 flex-shrink-0 rounded-md bg-muted flex items-center justify-center">
            {getPrimaryRequirementType(review)}
          </div>
        )}

        <div className="flex-1 text-left">
          <p
            className={cn(
              'font-semibold text-sm truncate',
              isSelected && 'text-foreground'
            )}
          >
            {review.taskName}
          </p>
          <p className="text-xs text-muted-foreground">{review.store}</p>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground font-mono">
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
