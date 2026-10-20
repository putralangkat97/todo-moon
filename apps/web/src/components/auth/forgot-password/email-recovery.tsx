'use client';

import {Button} from '@anggit-mono/ui/components/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@anggit-mono/ui/components/field';
import {Input} from '@anggit-mono/ui/components/input';
import {Spinner} from '@anggit-mono/ui/components/spinner';
import {cn} from '@anggit-mono/ui/lib/utils';
import {ArrowLeftIcon, EnvelopeIcon} from '@phosphor-icons/react';
import {useRouter} from 'next/navigation';
import type {ComponentProps, SubmitEvent} from 'react';
import {useState} from 'react';

export default function EmailRecovery({className}: ComponentProps<'form'>) {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  function backToLogin() {
    router.push('/login');
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    // Demo only: replace with your password-reset API call.
    setTimeout(() => {
      setEmailSent(true);
      setLoading(false);
    }, 1000);
  }

  function handleResend() {
    setResendLoading(true);

    // Demo only: replace with your resend API call.
    setTimeout(() => {
      setResendLoading(false);
    }, 1000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-6', className)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          {emailSent && (
            <div className="mb-2 rounded-full bg-secondary p-2">
              <EnvelopeIcon className="size-8" />
            </div>
          )}

          <h1 className="text-2xl font-bold">
            {emailSent ? 'Check your email' : 'Reset your password'}
          </h1>

          <p className="text-sm text-balance text-muted-foreground text-wrap">
            {emailSent
              ? 'If an account exists for that email, you will receive a password reset link.'
              : "Enter your email and we'll send you a link to reset your password."}
          </p>
        </div>

        {!emailSent ? (
          <>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                required
              />
            </Field>

            <Field>
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner /> : 'Send reset link'}
              </Button>
            </Field>
          </>
        ) : (
          <Field>
            <Button
              type="button"
              onClick={backToLogin}
              disabled={resendLoading || loading}
            >
              {resendLoading ? (
                <>
                  <Spinner /> Sending...
                </>
              ) : (
                'Back to sign in'
              )}
            </Button>
          </Field>
        )}

        {!emailSent ? (
          <Field className="text-center -mt-1">
            <Button
              type="button"
              variant="link"
              onClick={backToLogin}
              disabled={resendLoading || loading}
            >
              <ArrowLeftIcon />
              Back to sign in
            </Button>
          </Field>
        ) : (
          <Field>
            <FieldDescription className="text-center">
              Don&apos;t get the email?{' '}
              <Button
                type="button"
                variant={'link'}
                className="underline underline-offset-4 -ml-2"
                onClick={handleResend}
              >
                Resend link
              </Button>
            </FieldDescription>
          </Field>
        )}
      </FieldGroup>
    </form>
  );
}
