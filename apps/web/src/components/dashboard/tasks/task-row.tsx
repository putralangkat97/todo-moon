'use client';

import {Avatar, AvatarFallback} from '@anggit-mono/ui/components/avatar';
import {Badge} from '@anggit-mono/ui/components/badge';
import {Button} from '@anggit-mono/ui/components/button';
import {Checkbox} from '@anggit-mono/ui/components/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@anggit-mono/ui/components/dropdown-menu';
import {cn} from '@anggit-mono/ui/lib/utils';
import {DotsThreeIcon} from '@phosphor-icons/react';
import {TaskData, TaskPriority, TaskVariant} from './types';

const priorityStyles: Record<TaskPriority, TaskVariant> = {
  HIGH: {label: 'High', variant: 'default'},
  MEDIUM: {label: 'Medium', variant: 'secondary'},
  LOW: {label: 'Low', variant: 'outline'},
};

export type TaskActions = {
  onToggle?: (id: string, checked: boolean) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function TaskRow({task, onToggle, onEdit, onDelete}: TaskActions & {task: TaskData}) {
  const priority = priorityStyles[task.priority];

  return (
    <li className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50">
      <Checkbox
        checked={task.completed}
        onCheckedChange={checked => onToggle?.(task.id, checked === true)}
        aria-label={`Mark "${task.title}" as complete`}
      />

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'truncate text-sm font-medium leading-tight',
            task.completed && 'text-muted-foreground line-through',
          )}
        >
          {task.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">{task.project}</p>
      </div>

      <Badge variant={priority.variant} className="rounded-full px-3">
        {priority.label}
      </Badge>

      <span className="w-14 text-right text-sm text-muted-foreground">{task.dueLabel}</span>

      <Avatar className="size-8">
        <AvatarFallback className="bg-muted text-xs font-medium">{task.assignee}</AvatarFallback>
      </Avatar>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" aria-label="Task actions">
            <DotsThreeIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => onEdit?.(task.id)}>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive focus:text-destructive" onSelect={() => onDelete?.(task.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}

export function TaskRows({tasks, ...actions}: TaskActions & {tasks: TaskData[]}) {
  return (
    <ul className="divide-y border bg-card">
      {tasks.map(task => (
        <TaskRow key={task.id} task={task} {...actions} />
      ))}
    </ul>
  );
}
