'use client';

import {ArrowUpIcon} from '@phosphor-icons/react';

import TicketEmptyState from './ticket-empty-state';

export default function Upcoming() {
  return (
    <TicketEmptyState
      title="No upcoming tickets"
      description="Future tickets will appear here."
      icon={ArrowUpIcon}
    />
  );
}
