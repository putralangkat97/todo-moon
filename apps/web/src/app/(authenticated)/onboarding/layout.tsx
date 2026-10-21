import OnboardingShell from '#/components/onboarding/onboarding-shell';
import {ReactNode} from 'react';

export default function OnboardingLayout({children}: {children: ReactNode}) {
  return <OnboardingShell>{children}</OnboardingShell>;
}
