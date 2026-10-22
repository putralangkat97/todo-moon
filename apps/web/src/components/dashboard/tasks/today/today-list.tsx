'use client';

import {Badge} from '@anggit-mono/ui/components/badge';
import {cn} from '@anggit-mono/ui/lib/utils';
import {TaskActions, TaskRows} from '../task-row';
import {TaskGroup} from '../types';

/** Grouped list (Overdue / Due today, etc.) */
export function TodayList({
  groups,
  className,
  ...actions
}: TaskActions & {
  groups: TaskGroup[];
  className?: string;
}) {
  return (
    <div className={cn('space-y-6 mt-4', className)}>
      {groups
        .filter(group => group.tasks.length > 0)
        .map(group => (
          <section key={group.id} className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-medium">{group.title}</h2>
              <Badge variant="secondary" className="font-normal">
                {group.tasks.length}
              </Badge>
            </div>
            <TaskRows tasks={group.tasks} {...actions} />
          </section>
        ))}
    </div>
  );
}
