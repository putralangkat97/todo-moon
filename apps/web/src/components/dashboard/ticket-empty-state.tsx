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

export default function TicketEmptyState({
  title,
  description,
  icon: Icon,
  action = false,
  setCreateNewTicket,
}: {
  title: string;
  description: string;
  icon: Icon;
  action?: boolean;
  setCreateNewTicket?: Dispatch<SetStateAction<boolean>>;
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
      {action && setCreateNewTicket && (
        <EmptyContent>
          <Button
            type="button"
            onClick={() => setCreateNewTicket(prev => !prev)}
          >
            <PlusIcon /> New Ticket
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
