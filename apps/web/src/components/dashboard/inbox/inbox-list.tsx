'use client';

import {Badge} from '@anggit-mono/ui/components/badge';
import {cn} from '@anggit-mono/ui/lib/utils';
import {TaskActions, TaskRows} from '../task-row';
import {TaskData} from './types';

/** Flat list with no grouping. Title is optional. */
export function InboxListComponent({
  tasks,
  title,
  className,
  ...actions
}: TaskActions & {
  tasks: TaskData[];
  title?: string;
  className?: string;
}) {
  if (tasks.length === 0) return null;

  return (
    <section className={cn('space-y-3 mt-4', className)}>
      {title && (
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium">{title}</h2>
          <Badge variant="secondary" className="font-normal">
            {tasks.length}
          </Badge>
        </div>
      )}
      <TaskRows tasks={tasks} {...actions} />
    </section>
  );
}
