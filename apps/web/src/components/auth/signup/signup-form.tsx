import type {ComponentProps} from 'react';

import {Button} from '@anggit-mono/ui/components/button';
import {Field, FieldGroup} from '@anggit-mono/ui/components/field';
import {cn} from '@anggit-mono/ui/lib/utils';
import {SignupInput} from './signup-input';
import {SignupSocial} from './signup-social';

export function SignupForm({className, ...props}: ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Sign up</h1>

          <p className="text-sm text-balance text-muted-foreground">Enter your data below to get started</p>
        </div>

        <SignupInput />

        <Field>
          <Button type="submit">Sign Up</Button>
        </Field>

        <SignupSocial />
      </FieldGroup>
    </form>
  );
}
