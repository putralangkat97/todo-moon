'use client';

import type {Icon} from '@phosphor-icons/react';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@anggit-mono/ui/components/empty';

export default function TicketEmptyState({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: Icon;
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
    </Empty>
  );
}
