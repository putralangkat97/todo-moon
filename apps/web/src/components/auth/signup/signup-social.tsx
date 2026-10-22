'use client';

import {Button} from '@anggit-mono/ui/components/button';
import {Field, FieldDescription, FieldSeparator} from '@anggit-mono/ui/components/field';
import {GithubLogoIcon, GoogleLogoIcon} from '@phosphor-icons/react';
import Link from 'next/link';

export function SignupSocial() {
  const providers = [
    {
      name: 'github',
      label: 'Signup with GitHub',
      icon: <GithubLogoIcon />,
    },
    {
      name: 'google',
      label: 'Signup with Google',
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
          Already have an account?{' '}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </FieldDescription>
      </Field>
    </>
  );
}
