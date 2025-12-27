import { MapPin, GraduationCap, Mail, Phone, Calendar, Send, Eye } from 'lucide-react';
import { Candidate } from '@/types/candidate';
import { Button } from '@/components/ui/button';
import AIRatingBadge from './AIRatingBadge';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CandidateProfileProps {
  candidate: Candidate;
  onSendInvite: () => void;
  onRevealContact: () => void;
}

const CandidateProfile = ({ candidate, onSendInvite, onRevealContact }: CandidateProfileProps) => {
  const [contactRevealed, setContactRevealed] = useState(candidate.contactRevealed);
  const { toast } = useToast();

  const handleRevealContact = () => {
    setContactRevealed(true);
    onRevealContact();
  };

  const handleSendInvite = () => {
    onSendInvite();
    toast({
      title: "Invite Sent",
      description: `Your invite has been sent to ${candidate.name}.`,
    });
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start gap-4 mb-4">
          <img 
            src={candidate.photo} 
            alt={candidate.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-semibold text-foreground">{candidate.name}</h2>
              <AIRatingBadge score={candidate.fitScore} reason={candidate.fitReason} />
            </div>
            <p className="text-muted-foreground mb-2">{candidate.title}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {candidate.location}
            </div>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="flex gap-2">
          <Button variant="hero" className="flex-1" onClick={handleSendInvite}>
            <Send className="w-4 h-4 mr-2" />
            Send Invite
          </Button>
          {!contactRevealed ? (
            <Button variant="outline" className="flex-1" onClick={handleRevealContact}>
              <Eye className="w-4 h-4 mr-2" />
              Reveal Contact
            </Button>
          ) : (
            <div className="flex-1 space-y-1">
              <a 
                href={`mailto:${candidate.name.toLowerCase().replace(' ', '.')}@email.com`}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Mail className="w-4 h-4" />
                {candidate.name.toLowerCase().replace(' ', '.')}@email.com
              </a>
              <a 
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Education */}
      <div className="p-6 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-primary" />
          Education
        </h3>
        <div className="space-y-3">
          {candidate.education.map((edu, index) => (
            <div key={index} className="bg-muted/50 rounded-lg p-3">
              <p className="font-medium text-foreground">{edu.degree}</p>
              <p className="text-sm text-muted-foreground">{edu.institution}</p>
              <p className="text-xs text-muted-foreground">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <div className="p-6 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Work Experience
        </h3>
        <div className="space-y-4">
          {candidate.workHistory.map((work, index) => (
            <div key={index} className="relative pl-4 border-l-2 border-primary/20">
              <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-primary" />
              <p className="font-medium text-foreground">{work.title}</p>
              <p className="text-sm text-primary">{work.company}</p>
              <p className="text-xs text-muted-foreground mb-1">{work.duration}</p>
              <p className="text-sm text-muted-foreground">{work.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="p-6 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      {candidate.certifications.length > 0 && (
        <div className="p-6 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {candidate.certifications.map((cert, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="p-6">
        <p className="text-xs text-muted-foreground">
          Profile last updated: {candidate.lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default CandidateProfile;
