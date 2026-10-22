'use client';

import type {ComponentProps} from 'react';

import {Button} from '@anggit-mono/ui/components/button';
import {Field, FieldGroup} from '@anggit-mono/ui/components/field';
import {cn} from '@anggit-mono/ui/lib/utils';

import {LoginInput} from './login-input';
import {LoginSocial} from './login-social';

export function LoginForm({className, ...props}: ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>

          <p className="text-sm text-balance text-muted-foreground">Enter your email below to login to your account</p>
        </div>

        <LoginInput />

        <Field>
          <Button type="submit">Login</Button>
        </Field>

        <LoginSocial />
      </FieldGroup>
    </form>
  );
}
