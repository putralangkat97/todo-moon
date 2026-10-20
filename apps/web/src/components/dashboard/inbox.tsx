'use client';

import {TrayIcon} from '@phosphor-icons/react';

import {useState} from 'react';
import {useIsMobile} from '@anggit-mono/ui/hooks/use-mobile';
import {Button} from '@anggit-mono/ui/components/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@anggit-mono/ui/components/drawer';

import TicketEmptyState from './ticket-empty-state';

export default function Inbox() {
  const [createNewTicket, setCreateNewTicket] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <TicketEmptyState
        title="No tickets in Inbox"
        description="New tickets will appear here."
        icon={TrayIcon}
        action
        setCreateNewTicket={setCreateNewTicket}
      />

      <Drawer
        open={createNewTicket}
        onOpenChange={setCreateNewTicket}
        direction={isMobile ? 'bottom' : 'right'}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>New ticket</DrawerTitle>
            <DrawerDescription>
              Ticket creation will be available here.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button></Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
