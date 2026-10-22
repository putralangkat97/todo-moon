'use client';

import {PlusIcon, type Icon} from '@phosphor-icons/react';

import {Button} from '@anggit-mono/ui/components/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@anggit-mono/ui/components/empty';
import {Dispatch, SetStateAction} from 'react';

export default function TaskEmptyState({
  title,
  description,
  icon: Icon,
  action = false,
  setCreateNewTask,
}: {
  title: string;
  description: string;
  icon: Icon;
  action?: boolean;
  setCreateNewTask?: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action && setCreateNewTask && (
        <EmptyContent>
          <Button type="button" onClick={() => setCreateNewTask(prev => !prev)}>
            <PlusIcon /> New task
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
