import type {ReactNode} from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@anggit-mono/ui/components/avatar';
import {User} from './types';

export default function UserItem({
  user,
  action,
}: {
  user: User;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <Avatar className="size-6">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>
            {user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="flex min-w-0 flex-col">
          <span>{user.username}</span>
          <span className="truncate text-muted-foreground">{user.email}</span>
        </span>
      </div>
      {action}
    </div>
  );
}
