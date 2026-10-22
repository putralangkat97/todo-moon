import {Button} from '@anggit-mono/ui/components/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@anggit-mono/ui/components/card';
import {ReactNode} from 'react';

interface OnboardingShellProps {
  title: string;
  description?: string;
  steps: {id: string; label: string}[];
  currentStep: number;
  submitLabel?: string;
  showSkip?: boolean;
  isSubmitting?: boolean;
  onBack: () => void;
  onSkip?: () => void;
  children: ReactNode;
}

export default function OnboardingWizard({
  title,
  description,
  steps,
  currentStep,
  submitLabel = 'Continue',
  showSkip = false,
  isSubmitting = false,
  onBack,
  onSkip,
  children,
}: OnboardingShellProps) {
  const isFirst = currentStep === 0;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-muted-foreground text-sm">
          Step {currentStep + 1} of {steps.length}
        </p>
        <ol
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
          }}
        >
          {steps.map((s, i) => {
            const reached = i <= currentStep;
            return (
              <li key={s.id} className="space-y-2" aria-current={i === currentStep ? 'step' : undefined}>
                <div className={`h-1 rounded-full ${reached ? 'bg-foreground' : 'bg-muted'}`} />
                <span className={`text-xs ${reached ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</span>
              </li>
            );
          })}
        </ol>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="justify-between">
          <Button type="button" variant="outline" onClick={onBack} disabled={isFirst || isSubmitting}>
            Back
          </Button>
          <div className="flex items-center gap-4">
            {showSkip && (
              <Button
                type="button"
                variant="link"
                className="text-muted-foreground px-0 underline"
                onClick={onSkip}
                disabled={isSubmitting}
              >
                Skip for now
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {submitLabel}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
