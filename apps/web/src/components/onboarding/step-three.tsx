'use client';

import {Avatar, AvatarFallback} from '@anggit-mono/ui/components/avatar';
import {Badge} from '@anggit-mono/ui/components/badge';
import {Button} from '@anggit-mono/ui/components/button';
import {Field, FieldGroup, FieldLabel} from '@anggit-mono/ui/components/field';
import {Input} from '@anggit-mono/ui/components/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@anggit-mono/ui/components/select';
import {XIcon} from '@phosphor-icons/react';
import {useState, type KeyboardEvent} from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {ROLES, type OnboardingValues, type Role} from './types';

export default function StepThree() {
  const {control} = useFormContext<OnboardingValues>();
  const {fields, append, remove} = useFieldArray({control, name: 'invites'});

  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('EDITOR');

  function addInvite() {
    const value = email.trim();
    if (!value) return;
    append({email: value, role});
    setEmail('');
  }

  // Enter adds the invite instead of submitting the whole form
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addInvite();
    }
  }

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="invite-email">Email address</FieldLabel>
        <div className="flex gap-2">
          <Input
            id="invite-email"
            type="email"
            placeholder="teammate@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Select value={role} onValueChange={v => setRole(v as Role)}>
            <SelectTrigger className="w-32" aria-label="Role">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map(r => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" variant="outline" onClick={addInvite}>
            Add
          </Button>
        </div>
      </Field>

      {fields.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Invited ({fields.length})</p>
          <ul className="divide-y rounded-lg border">
            {fields.map((invite, index) => (
              <li key={invite.id} className="flex items-center gap-3 p-3">
                <Avatar className="size-8">
                  <AvatarFallback className="text-xs">{invite.email.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="flex-1 truncate text-sm">{invite.email}</span>
                <Badge variant="secondary">{ROLES.find(r => r.value === invite.role)?.label}</Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${invite.email}`}
                  onClick={() => remove(index)}
                >
                  <XIcon />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </FieldGroup>
  );
}
