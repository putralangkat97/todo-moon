import type {MemberRole, WorkspaceUsage} from '@anggit-mono/types';

export type Role = MemberRole;

export type Invite = {
  email: string;
  role: Role;
};

export type OnboardingValues = {
  name: string;
  usage: WorkspaceUsage;
  projectName: string;
  projectDescription: string;
  firstTask: string;
  // step three
  invites: Invite[];
};

export type StepContext = {
  userName: string;
  values: OnboardingValues;
};

// a plain value, or a function when it depends on user name / form values
export type Dynamic<T> = T | ((ctx: StepContext) => T);

export type UsageData = {
  id: string;
  value: OnboardingValues['usage'];
  label: string;
  description: string;
};

export const USAGES: UsageData[] = [
  {
    value: 'PERSONAL',
    label: 'Personal',
    description: 'Track my own tasks, errands and goals.',
    id: 'personal-r2h',
  },
  {
    value: 'WORK',
    label: 'Work',
    description: 'Manage projects and deadlines for my job.',
    id: 'work-r2h',
  },
  {
    value: 'TEAM',
    label: 'With a team',
    description: 'Share projects and assign tasks to others.',
    id: 'team-r2h',
  },
];

export const ROLES: {value: Role; label: string}[] = [
  {value: 'OWNER', label: 'Owner'},
  {value: 'EDITOR', label: 'Editor'},
  {value: 'VIEWER', label: 'Viewer'},
];
