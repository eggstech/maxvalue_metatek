import { getTaskById } from '@/lib/tasks';
import { TaskDetail } from '@/components/task-detail';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const task = getTaskById(params.id);

  if (!task) {
    notFound();
  }

  return <TaskDetail task={task} />;
}
