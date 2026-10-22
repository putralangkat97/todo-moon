'use client';

import {Field, FieldGroup, FieldLabel} from '@anggit-mono/ui/components/field';
import {Input} from '@anggit-mono/ui/components/input';
import {Textarea} from '@anggit-mono/ui/components/textarea';
import {useFormContext} from 'react-hook-form';
import type {OnboardingValues} from './types';

export default function StepTwo() {
  const {register} = useFormContext<OnboardingValues>();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="projectName">Project name</FieldLabel>
        <Input id="projectName" type="text" placeholder="e.g. Website relaunch" {...register('projectName')} />
      </Field>

      <Field>
        <FieldLabel htmlFor="projectDescription">
          Description <span className="text-muted-foreground font-normal">(optional)</span>
        </FieldLabel>
        <Textarea
          id="projectDescription"
          placeholder="What is this project about?"
          {...register('projectDescription')}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="firstTask">First task</FieldLabel>
        <Input id="firstTask" type="text" placeholder="e.g. Draft homepage copy" {...register('firstTask')} />
      </Field>
    </FieldGroup>
  );
}
