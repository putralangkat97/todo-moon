'use client';

import {CheckCircleIcon} from '@phosphor-icons/react';

import TicketEmptyState from './ticket-empty-state';

export default function Completed() {
  return (
    <TicketEmptyState
      title="No completed tickets"
      description="Completed tickets will appear here."
      icon={CheckCircleIcon}
    />
  );
}
