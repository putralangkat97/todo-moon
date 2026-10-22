'use client';

import {Avatar, AvatarFallback} from '@anggit-mono/ui/components/avatar';
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
import TaskPriorityBadge from './task-priority-badge';
import {TaskData} from './types';

export type TaskActions = {
  onToggle?: (id: string, checked: boolean) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function TaskRow({
  task,
  onOpen,
  onToggle,
  onEdit,
  onDelete,
}: TaskActions & {
  task: TaskData;
  /** Called when the row (not one of its controls) is clicked */
  onOpen?: (task: TaskData) => void;
}) {
  return (
    <li
      onClick={() => onOpen?.(task)}
      className={cn(
        'flex items-center gap-4 px-4 py-3 hover:bg-muted/50',
        onOpen && 'cursor-pointer',
      )}
    >
      {/* Controls are wrapped so clicking them doesn't also open the drawer */}
      <div onClick={event => event.stopPropagation()}>
        <Checkbox
          checked={task.completed}
          onCheckedChange={checked => onToggle?.(task.id, checked === true)}
          aria-label={`Mark "${task.title}" as complete`}
        />
      </div>

      {/* A real button so the row is reachable and openable by keyboard.
          It has no handler of its own: its click bubbles up to the <li>. */}
      <button
        type="button"
        className="min-w-0 flex-1 text-left outline-none focus-visible:underline"
      >
        <p
          className={cn(
            'truncate text-sm font-medium leading-tight',
            task.completed && 'text-muted-foreground line-through',
          )}
        >
          {task.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">{task.project}</p>
      </button>

      <TaskPriorityBadge
        priority={task.priority}
        className="rounded-full px-3"
      />

      <span className="w-14 text-right text-sm text-muted-foreground">
        {task.dueLabel}
      </span>

      <Avatar className="size-8">
        <AvatarFallback className="bg-muted text-xs font-medium">
          {task.assignee}
        </AvatarFallback>
      </Avatar>

      {/* The wrapper must contain the whole DropdownMenu: React bubbles events
          from portaled menu content through the component tree, so this also
          stops menu item clicks from reaching the <li>. */}
      <div onClick={event => event.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground"
              aria-label="Task actions"
            >
              <DotsThreeIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => onEdit?.(task.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onSelect={() => onDelete?.(task.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
}

export function TaskRows({
  tasks,
  onTaskClick,
  ...actions
}: TaskActions & {
  tasks: TaskData[];
  onTaskClick?: (task: TaskData) => void;
}) {
  return (
    <ul className="divide-y border bg-card">
      {tasks.map(task => (
        <TaskRow key={task.id} task={task} onOpen={onTaskClick} {...actions} />
      ))}
    </ul>
  );
}
