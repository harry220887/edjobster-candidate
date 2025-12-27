import { MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Candidate } from '@/types/candidate';
import AIRatingBadge from './AIRatingBadge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: () => void;
  onShortlist: () => void;
  onReject: () => void;
  isShortlisted: boolean;
}

const CandidateCard = ({ 
  candidate, 
  isSelected, 
  onSelect, 
  onShortlist, 
  onReject,
  isShortlisted 
}: CandidateCardProps) => {
  return (
    <div 
      className={cn(
        'p-4 bg-card rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-card group',
        isSelected ? 'border-primary shadow-card' : 'border-border hover:border-primary/30'
      )}
      onClick={onSelect}
    >
      <div className="flex gap-4">
        <img 
          src={candidate.photo} 
          alt={candidate.name}
          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{candidate.name}</h3>
            <AIRatingBadge score={candidate.fitScore} reason={candidate.fitReason} size="sm" />
          </div>
          <p className="text-sm text-muted-foreground mb-2">{candidate.title}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {candidate.experience} years exp
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {candidate.location}
            </span>
            <span className="text-primary/70">Active {candidate.lastActive}</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4 pt-3 border-t border-border">
        <Button
          variant={isShortlisted ? 'success' : 'outline'}
          size="sm"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onShortlist();
          }}
        >
          <CheckCircle className="w-4 h-4 mr-1" />
          {isShortlisted ? 'Shortlisted' : 'Shortlist'}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 hover:bg-destructive/10 hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onReject();
          }}
        >
          <XCircle className="w-4 h-4 mr-1" />
          Reject
        </Button>
      </div>
    </div>
  );
};

export default CandidateCard;
