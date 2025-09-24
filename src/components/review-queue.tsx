
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Submission } from '@/lib/submissions';
import { CircleCheck, Search } from 'lucide-react';
import { ReviewQueueItem } from './review-queue-item';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import * as React from 'react';
import Link from 'next/link';

interface ReviewQueueProps {
  reviews: Submission[];
  selectedReviewId: string | null;
  onSelectReview: (id: string) => void;
}

export function ReviewQueue({
  reviews,
  selectedReviewId,
  onSelectReview,
}: ReviewQueueProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [storeFilter, setStoreFilter] = React.useState('all');

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.taskName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStore =
      storeFilter === 'all' || review.store === storeFilter;
    return matchesSearch && matchesStore;
  });

  const uniqueStores = Array.from(new Set(reviews.map(r => r.store)));

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Pending Reviews</CardTitle>
        <CardDescription>
          Select a submission below to begin your review.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by task name..."
              className="pl-8"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={storeFilter} onValueChange={setStoreFilter}>
            <SelectTrigger className="md:w-[150px]">
              <SelectValue placeholder="Filter by store" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stores</SelectItem>
              {uniqueStores.map(store => (
                <SelectItem key={store} value={store}>
                  {store}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="flex-1 -mx-6 px-3">
          <div className="flex flex-col gap-3 pr-3">
            {filteredReviews.length > 0 ? (
              filteredReviews.map(review => (
                <Link key={review.id} href="#" onClick={(e) => {
                  e.preventDefault();
                  onSelectReview(review.id);
                }}>
                  <ReviewQueueItem
                    review={review}
                    isSelected={review.id === selectedReviewId}
                  />
                </Link>
              ))
            ) : (
              <div className="text-center text-muted-foreground p-8">
                <CircleCheck className="mx-auto h-12 w-12 text-green-500" />
                <p className="mt-4 font-semibold">All caught up!</p>
                <p className="text-sm">
                  There are no pending reviews that match your filters.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
