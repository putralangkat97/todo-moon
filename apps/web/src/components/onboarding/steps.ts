import {appName} from '#/constants';
import type {ComponentType} from 'react';
import StepOne from './step-one';
import StepThree from './step-three';
import StepTwo from './step-two';
import type {Dynamic} from './types';

export type StepConfig = {
  id: string;
  label: string;
  title: Dynamic<string>;
  description?: Dynamic<string>;
  submitLabel?: string;
  skippable?: boolean;
  component: ComponentType;
};

export const STEPS: StepConfig[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    title: ({userName}) => `Welcome to ${appName}, ${userName}`,
    description: "Let's set up your workspace. It only takes a minute.",
    component: StepOne,
  },
  {
    id: 'project',
    label: 'First project',
    title: 'Create your first project',
    description: 'Projects keep related tasks together. You can add more later.',
    skippable: true,
    component: StepTwo,
  },
  {
    id: 'invite',
    label: 'Invite team',
    title: 'Invite your team',
    description: "Add teammates by email. They'll get a link to join your workspace.",
    submitLabel: 'Finish setup',
    skippable: true,
    component: StepThree,
  },
];
