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
import { CircleCheck, Filter, Search } from 'lucide-react';
import { ReviewQueueItem } from './review-queue-item';
import { Input } from './ui/input';
import * as React from 'react';
import Link from 'next/link';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import type { Table } from '@tanstack/react-table';
import { getTaskById } from '@/lib/tasks';
import { Button } from './ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';


interface ReviewQueueProps {
  reviews: Submission[];
  selectedReviewId: string | null;
  onSelectReview: (id: string) => void;
}

const taskTypes = [
    { value: 'Mixed', label: 'Mixed' },
    { value: 'Image', label: 'Image' },
    { value: 'Checklist', label: 'Checklist' },
    { value: 'Data Entry', label: 'Data Entry' },
    { value: 'Visual Standard', label: 'Visual Standard' },
]

function ReviewToolbar({ 
  table, 
  storeOptions,
  isFiltered,
  onClearFilters 
}: { 
  table: Table<Submission>, 
  storeOptions: {label: string, value: string}[],
  isFiltered: boolean,
  onClearFilters: () => void,
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Filter className='h-4 w-4 text-muted-foreground' />
             {table.getColumn("store") && (
                <DataTableFacetedFilter
                    column={table.getColumn("store")}
                    title="Store"
                    options={storeOptions}
                />
            )}
             {table.getColumn("taskType") && (
                <DataTableFacetedFilter
                    column={table.getColumn("taskType")}
                    title="Task Type"
                    options={taskTypes}
                />
            )}
            {isFiltered && (
              <Button
                variant="ghost"
                onClick={onClearFilters}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <Cross2Icon className="ml-2 h-4 w-4" />
              </Button>
            )}
        </div>
    )
}


export function ReviewQueue({
  reviews,
  selectedReviewId,
  onSelectReview,
}: ReviewQueueProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filters, setFilters] = React.useState<Record<string, string[]>>({});
  const isFiltered = Object.values(filters).some(v => v?.length > 0);

  const reviewsWithTaskType = React.useMemo(() => {
    return reviews.map(review => {
        const task = getTaskById(review.taskId);
        return {
            ...review,
            taskType: task?.type || 'Unknown'
        }
    });
  }, [reviews]);


  const filteredReviews = React.useMemo(() => {
    return reviewsWithTaskType.filter(review => {
        const storeFilter = filters['store'];
        const taskTypeFilter = filters['taskType'];

        const matchesSearch = review.taskName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        
        const matchesStore = !storeFilter || storeFilter.length === 0 || storeFilter.includes(review.store);
        const matchesTaskType = !taskTypeFilter || taskTypeFilter.length === 0 || taskTypeFilter.includes(review.taskType);

        return matchesSearch && matchesStore && matchesTaskType;
    });
  }, [reviewsWithTaskType, searchTerm, filters]);


  const uniqueStores = Array.from(new Set(reviews.map(r => r.store))).map(store => ({ value: store, label: store }));

  const clearFilters = () => {
    setFilters({});
  }

  // Mock table object for DataTableFacetedFilter
  const mockTable = {
    getColumn: (id: string) => ({
      getFacetedUniqueValues: () => {
        const counts = new Map<string, number>();
        reviewsWithTaskType.forEach(review => {
            const key = (review as any)[id] as string;
            if (key) {
              counts.set(key, (counts.get(key) || 0) + 1);
            }
        });
        return counts;
      },
      getFilterValue: () => filters[id],
      setFilterValue: (value: any) => {
        setFilters(prev => ({...prev, [id]: value}))
      },
    }),
  } as unknown as Table<Submission>;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Pending Reviews</CardTitle>
        <CardDescription>
          Select a submission below to begin your review.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by task name..."
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <ReviewToolbar 
          table={mockTable} 
          storeOptions={uniqueStores} 
          isFiltered={isFiltered}
          onClearFilters={clearFilters}
        />

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
