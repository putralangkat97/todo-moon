'use client';

import type {ReactNode, Ref} from 'react';

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
import {useIsMobile} from '@anggit-mono/ui/hooks/use-mobile';

type TaskDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  /** id of the <form> inside children that the submit button should trigger */
  formId: string;
  submitLabel?: string;
  /** Ref to the drawer content, handy for portaling popovers/comboboxes into it */
  contentRef?: Ref<HTMLDivElement>;
  children: ReactNode;
};

export default function TaskDrawer({
  open,
  onOpenChange,
  title,
  description,
  formId,
  submitLabel = 'Save',
  contentRef,
  children,
}: TaskDrawerProps) {
  const isMobile = useIsMobile();

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={isMobile ? 'bottom' : 'right'}
    >
      <DrawerContent ref={contentRef}>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>

        <div className="flex-1 scroll-fade overflow-y-auto p-4">{children}</div>

        <DrawerFooter>
          <div className="flex gap-2 items-center justify-end">
            <DrawerClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
            <Button type="submit" form={formId}>
              {submitLabel}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
