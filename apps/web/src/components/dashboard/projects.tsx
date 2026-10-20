'use client';

import {FolderIcon} from '@phosphor-icons/react';

import {Button} from '@anggit-mono/ui/components/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@anggit-mono/ui/components/empty';

export default function Projects() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          Create a project to organize your tickets.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button type="button">Create project</Button>
      </EmptyContent>
    </Empty>
  );
}
