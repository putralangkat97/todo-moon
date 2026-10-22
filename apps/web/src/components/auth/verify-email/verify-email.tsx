'use client';

import {Button} from '@anggit-mono/ui/components/button';
import {Field, FieldDescription, FieldGroup, FieldLabel} from '@anggit-mono/ui/components/field';
import {Input} from '@anggit-mono/ui/components/input';
import {Spinner} from '@anggit-mono/ui/components/spinner';
import {cn} from '@anggit-mono/ui/lib/utils';
import {EnvelopeIcon} from '@phosphor-icons/react';
import type {ComponentProps, SubmitEvent} from 'react';
import {useState} from 'react';

export default function VerifyEmail({className}: ComponentProps<'form'>) {
  const [changeEmail, setChangeEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('your@email.com');

  const [isResending, setIsResending] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  async function handleResend() {
    if (isResending || isUpdatingEmail) return;

    setIsResending(true);

    try {
      // Demo only: replace with your resend verification API call.
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmailSent(true);
    } finally {
      setIsResending(false);
    }
  }

  async function handleChangeEmail(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isUpdatingEmail || isResending) return;

    setIsUpdatingEmail(true);

    try {
      // Demo only: replace with your update-email API call.
      await new Promise(resolve => setTimeout(resolve, 1000));

      setChangeEmail(false);
      setEmailSent(true);
    } finally {
      setIsUpdatingEmail(false);
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="mb-2 rounded-full bg-secondary p-2">
            <EnvelopeIcon className="size-8" />
          </div>

          <h1 className="text-2xl font-bold">{changeEmail ? 'Change your email' : 'Verify your email'}</h1>

          <p className="text-sm text-balance text-muted-foreground">
            {changeEmail
              ? 'Enter the new email address you want to use for your account.'
              : emailSent
                ? `A verification link has been sent to ${email}. Please check your inbox.`
                : `We sent a verification link to ${email}. Click it to activate your account.`}
          </p>
        </div>

        {changeEmail ? (
          <form onSubmit={handleChangeEmail}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required
                  disabled={isUpdatingEmail}
                />
              </Field>

              <Field>
                <Button type="submit" disabled={isUpdatingEmail || isResending}>
                  {isUpdatingEmail && <Spinner />}
                  {isUpdatingEmail ? 'Updating email...' : 'Update email'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isUpdatingEmail}
                  onClick={() => setChangeEmail(false)}
                >
                  Cancel
                </Button>
              </Field>
            </FieldGroup>
          </form>
        ) : (
          <>
            <Field>
              <Button type="button" disabled={isResending || isUpdatingEmail} onClick={handleResend}>
                {isResending && <Spinner />}
                {isResending ? 'Sending email...' : 'Resend email'}
              </Button>
            </Field>

            <Field>
              <FieldDescription className="text-center">
                Wrong address?{' '}
                <Button
                  type="button"
                  variant="link"
                  className="underline underline-offset-4 -ml-2"
                  disabled={isResending || isUpdatingEmail}
                  onClick={() => setChangeEmail(true)}
                >
                  Change email
                </Button>
              </FieldDescription>
            </Field>
          </>
        )}
      </FieldGroup>
    </div>
  );
}
