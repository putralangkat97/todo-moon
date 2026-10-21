import type {
  TaskPriority as TaskPriorityType,
  Task as TaskType,
} from '@anggit-mono/types';
import {Badge} from '@anggit-mono/ui/components/badge';

export type TaskPriority = TaskPriorityType;

export type Task = TaskType;

export type TaskData = {
  id: string;
  title: string;
  project: string;
  priority: TaskPriority;
  dueLabel: string;
  assignee: string;
  completed?: boolean;
};

export type TaskGroup = {
  id: string;
  title: string;
  tasks: TaskData[];
};

export type TaskVariant = {
  label: string;
  variant: React.ComponentProps<typeof Badge>['variant'];
};
