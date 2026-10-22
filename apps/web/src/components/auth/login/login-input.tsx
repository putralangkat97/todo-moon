import {Field, FieldLabel} from '@anggit-mono/ui/components/field';
import {Input} from '@anggit-mono/ui/components/input';

export function LoginInput() {
  return (
    <>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" name="email" type="email" placeholder="m@example.com" autoComplete="email" required />
      </Field>

      <Field>
        <div className="flex items-center">
          <FieldLabel htmlFor="password">Password</FieldLabel>

          <a href="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
            Forgot your password?
          </a>
        </div>

        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </Field>
    </>
  );
}
