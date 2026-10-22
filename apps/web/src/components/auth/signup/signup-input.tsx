import {Checkbox} from '@anggit-mono/ui/components/checkbox';
import {Field, FieldLabel} from '@anggit-mono/ui/components/field';
import {Input} from '@anggit-mono/ui/components/input';

export function SignupInput() {
  return (
    <>
      <Field>
        <FieldLabel htmlFor="name">Full Name</FieldLabel>
        <Input id="name" name="name" type="text" placeholder="your name" autoComplete="name" required />
      </Field>

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" name="email" type="email" placeholder="m@example.com" autoComplete="email" required />
      </Field>

      <Field>
        <div className="flex items-center">
          <FieldLabel htmlFor="password">Password</FieldLabel>
        </div>

        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </Field>

      <Field>
        <div className="flex items-center">
          <FieldLabel htmlFor="password_confirmation">Confirm Password</FieldLabel>
        </div>

        <Input id="password_confirmation" name="password_confirmation" type="password" autoComplete="" required />
      </Field>

      <Field>
        <div className="flex items-center">
          <Checkbox id="acc_toc" name="acc_toc" required />
          <FieldLabel htmlFor="acc_toc" className="ml-2">
            I agree to Terms and Condition
          </FieldLabel>
        </div>
      </Field>
    </>
  );
}
