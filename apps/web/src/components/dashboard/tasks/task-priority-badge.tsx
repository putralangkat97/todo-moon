import {Badge} from '@anggit-mono/ui/components/badge';
import {TaskData} from './types';

const config: Record<
  TaskData['priority'],
  {label: string; variant: 'destructive' | 'secondary' | 'outline'}
> = {
  HIGH: {label: 'High', variant: 'destructive'},
  MEDIUM: {label: 'Medium', variant: 'secondary'},
  LOW: {label: 'Low', variant: 'outline'},
};

export default function TaskPriorityBadge({
  priority,
  className = '',
}: {
  priority: TaskData['priority'];
  className?: string;
}) {
  const {label, variant} = config[priority];
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
