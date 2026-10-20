'use client';

import {TrayIcon} from '@phosphor-icons/react';

import TicketEmptyState from './ticket-empty-state';

export default function Inbox() {
  return (
    <TicketEmptyState
      title="No tickets in Inbox"
      description="New tickets will appear here."
      icon={TrayIcon}
    />
  );
}
