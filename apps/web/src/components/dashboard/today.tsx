'use client';

import {CalendarIcon} from '@phosphor-icons/react';

import TicketEmptyState from './ticket-empty-state';

export default function Today() {
  return (
    <TicketEmptyState
      title="No tickets today"
      description="Tickets due today will appear here."
      icon={CalendarIcon}
    />
  );
}
