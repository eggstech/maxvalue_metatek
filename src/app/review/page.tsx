
'use client';

import * as React from 'react';
import { initialSubmissions, Submission } from '@/lib/submissions';
import { ReviewQueue } from '@/components/review-queue';
import { ReviewPageContent } from '@/components/review-page-content';

export default function ReviewPage() {
  const [reviews, setReviews] = React.useState<Submission[]>(
    initialSubmissions.filter(s => s.status === 'Pending Review')
  );

  const [selectedReviewId, setSelectedReviewId] = React.useState<string | null>(
    reviews.length > 0 ? reviews[0].id : null
  );

  const handleReviewAction = (
    submissionId: string,
    action: 'Approved' | 'Rejected'
  ) => {
    const newReviews = reviews.filter(r => r.id !== submissionId);
    setReviews(newReviews);
    const nextReview = newReviews.find(r => r.id !== submissionId) || null;
    setSelectedReviewId(nextReview ? nextReview.id : null);
  };

  const selectedReview = reviews.find(r => r.id === selectedReviewId);

  return (
    <div className="grid h-full flex-1 gap-6 md:grid-cols-[350px_1fr]">
      <ReviewQueue
        reviews={reviews}
        selectedReviewId={selectedReviewId}
        onSelectReview={setSelectedReviewId}
      />
      <ReviewPageContent
        key={selectedReviewId}
        review={selectedReview}
        onReviewAction={handleReviewAction}
        reviewCount={reviews.length}
      />
    </div>
  );
}
