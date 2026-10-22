import type {
  TaskPriority as TaskPriorityType,
  Task as TaskType,
} from '@anggit-mono/types';
import type {Badge} from '@anggit-mono/ui/components/badge';
import type {ComponentProps} from 'react';

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
  variant: ComponentProps<typeof Badge>['variant'];
};

export type Subtask = {id: number; title: string; completed: boolean};

/** Form-side priority (lowercase). TaskPriority above is the data-side one. */
export type Priority = 'low' | 'medium' | 'high';

export type TaskComment = {
  id: string;
  author: string; // initials, same style as TaskData.assignee
  body: string;
  createdLabel: string;
};

export type TaskActivity = {
  id: string;
  message: string;
  timeLabel: string;
};

export type User = {
  username: string;
  avatar: string;
  email: string;
};

export type TaskFormValues = {
  title: string;
  description: string;
  priority: Priority;
  dueDate?: Date;
  assignee?: User;
  subtasks: Subtask[];
};

export type TaskDetailData = {id: string} & Partial<TaskFormValues> & {
    comments?: TaskComment[];
    activity?: TaskActivity[];
  };
