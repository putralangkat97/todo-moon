'use client';

import {appName} from '#/constants';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@anggit-mono/ui/components/field';
import {Input} from '@anggit-mono/ui/components/input';
import {RadioGroup, RadioGroupItem} from '@anggit-mono/ui/components/radio-group';
import {Controller, useFormContext} from 'react-hook-form';
import {USAGES, type OnboardingValues} from './types';

export default function StepOne() {
  const {register, control} = useFormContext<OnboardingValues>();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="name">Workspace name</FieldLabel>
        <Input id="name" type="text" placeholder="User's workspace" {...register('name')} />
      </Field>

      <FieldSet>
        <FieldLegend variant="label">How will you use {appName}?</FieldLegend>
        <Controller
          name="usage"
          control={control}
          render={({field}) => (
            <RadioGroup value={field.value} onValueChange={field.onChange}>
              {USAGES.map(data => (
                <FieldLabel htmlFor={data.id} key={data.id}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{data.label}</FieldTitle>
                      <FieldDescription>{data.description}</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value={data.value} id={data.id} />
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
          )}
        />
      </FieldSet>
    </FieldGroup>
  );
}
