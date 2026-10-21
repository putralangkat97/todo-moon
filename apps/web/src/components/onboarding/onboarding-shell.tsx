'use client';

import {appName} from '#/constants';
import {Button} from '@anggit-mono/ui/components/button';
import {ImageIcon} from '@phosphor-icons/react';
import {ReactNode} from 'react';

export default function OnboardingShell({children}: {children: ReactNode}) {
  return (
    <div className="grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between items-center">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <ImageIcon className="size-4" />
              </div>
              {appName}
            </a>
          </div>
          <Button type="button" variant={'link'} size={'lg'}>
            Skip setup
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">{children}</div>
        </div>
      </div>
    </div>
  );
}
