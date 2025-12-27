import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface AIRatingBadgeProps {
  score: 'best' | 'good' | 'partial' | 'not';
  reason: string;
  size?: 'sm' | 'default';
}

const scoreConfig = {
  best: {
    label: 'Best Fit',
    className: 'bg-success/10 text-success border-success/20'
  },
  good: {
    label: 'Good Fit',
    className: 'bg-primary/10 text-primary border-primary/20'
  },
  partial: {
    label: 'Partial Fit',
    className: 'bg-warning/10 text-warning border-warning/20'
  },
  not: {
    label: 'Not a Fit',
    className: 'bg-muted text-muted-foreground border-border'
  }
};

const AIRatingBadge = ({ score, reason, size = 'default' }: AIRatingBadgeProps) => {
  const config = scoreConfig[score];
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span 
          className={cn(
            'inline-flex items-center rounded-full border font-medium cursor-help',
            config.className,
            size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
          )}
        >
          {config.label}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <p className="text-sm">{reason}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default AIRatingBadge;
