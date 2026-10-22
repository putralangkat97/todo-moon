'use client';

import {Button} from '@anggit-mono/ui/components/button';
import {Field, FieldDescription, FieldSeparator} from '@anggit-mono/ui/components/field';
import {GithubLogoIcon, GoogleLogoIcon} from '@phosphor-icons/react';
import Link from 'next/link';

export function LoginSocial() {
  const providers = [
    {
      name: 'github',
      label: 'Login with GitHub',
      icon: <GithubLogoIcon />,
    },
    {
      name: 'google',
      label: 'Login with Google',
      icon: <GoogleLogoIcon />,
    },
  ];

  return (
    <>
      <FieldSeparator>Or continue with</FieldSeparator>

      <Field>
        <div className="flex items-center md:flex-row gap-4">
          {providers.map((data, index) => (
            <Button key={`${index}-${data.name}`} variant="outline" type="button">
              {data.icon}
              {data.label}
            </Button>
          ))}
        </div>

        <FieldDescription className="text-center">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </FieldDescription>
      </Field>
    </>
  );
}
