'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {FormProvider, useForm, useWatch} from 'react-hook-form';
import OnboardingWizard from './onboarding-wizard';
import {STEPS} from './steps';
import type {Dynamic, OnboardingValues, StepContext} from './types';

function resolve<T>(value: Dynamic<T>, ctx: StepContext): T {
  return typeof value === 'function' ? (value as (ctx: StepContext) => T)(ctx) : value;
}

export default function OnboardingForm({userName = 'User'}: {userName?: string}) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);

  const methods = useForm<OnboardingValues>({
    defaultValues: {
      name: `${userName}'s workspace`,
      usage: 'PERSONAL',
      projectName: '',
      projectDescription: '',
      firstTask: '',
      invites: [],
    },
  });

  const step = STEPS[stepIndex];
  const StepComponent = step.component;
  const isLast = stepIndex === STEPS.length - 1;

  const values = useWatch({control: methods.control});
  const ctx: StepContext = {userName, values: values as OnboardingValues};

  function goNext() {
    if (isLast) {
      // call your NestJS endpoint here
      console.log(methods.getValues());
      router.push('/dashboard/inbox');
      return;
    }
    setStepIndex(i => i + 1);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    goNext();
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <OnboardingWizard
          title={resolve(step.title, ctx)}
          description={step.description && resolve(step.description, ctx)}
          steps={STEPS.map(({id, label}) => ({id, label}))}
          currentStep={stepIndex}
          submitLabel={step.submitLabel}
          showSkip={step.skippable}
          isSubmitting={methods.formState.isSubmitting}
          onBack={() => setStepIndex(i => Math.max(0, i - 1))}
          onSkip={goNext}
        >
          <StepComponent />
        </OnboardingWizard>
      </form>
    </FormProvider>
  );
}
