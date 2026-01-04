import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import EventIcon from '@mui/icons-material/Event';
import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AIRatingBadge from './AIRatingBadge';
import { toast } from 'sonner';

const CandidateProfile = ({ candidate, onSendInvite, onRevealContact }) => {
  const [contactRevealed, setContactRevealed] = useState(candidate.contactRevealed);

  const handleRevealContact = () => {
    setContactRevealed(true);
    onRevealContact();
  };

  const handleSendInvite = () => {
    onSendInvite();
    toast.success('Invite Sent', {
      description: `Your invite has been sent to ${candidate.name}.`,
    });
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <Avatar
            src={candidate.photo}
            alt={candidate.name}
            sx={{ width: 80, height: 80, borderRadius: 3 }}
            variant="rounded"
          />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography variant="h6" fontWeight={600}>
                {candidate.name}
              </Typography>
              <AIRatingBadge score={candidate.fitScore} reason={candidate.fitReason} />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {candidate.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}
            >
              <LocationOnIcon sx={{ fontSize: 16 }} />
              {candidate.location}
            </Typography>
          </Box>
        </Box>

        {/* Primary CTAs */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleSendInvite}
            sx={{ flex: 1 }}
          >
            Send Invite
          </Button>
          {!contactRevealed ? (
            <Button
              variant="outlined"
              startIcon={<VisibilityIcon />}
              onClick={handleRevealContact}
              sx={{ flex: 1 }}
            >
              Reveal Contact
            </Button>
          ) : (candidate.email || candidate.phone) ? (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {candidate.email && (
                <Link
                  href={`mailto:${candidate.email}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    fontSize: '0.875rem',
                    color: 'primary.main',
                  }}
                >
                  <EmailIcon sx={{ fontSize: 16 }} />
                  {candidate.email}
                </Link>
              )}
              {candidate.phone && (
                <Link
                  href={`tel:${candidate.phone}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    fontSize: '0.875rem',
                    color: 'primary.main',
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 16 }} />
                  {candidate.phone}
                </Link>
              )}
            </Box>
          ) : (
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No contact info available
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Education */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          variant="subtitle2"
          fontWeight={600}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
        >
          <SchoolIcon sx={{ fontSize: 16, color: 'primary.main' }} />
          Education
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {candidate.education.map((edu, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: 'rgba(0, 0, 0, 0.02)',
                borderRadius: 2,
                p: 1.5,
              }}
            >
              <Typography variant="body2" fontWeight={500}>
                {edu.degree}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {edu.institution}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                {edu.year}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Work Experience */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          variant="subtitle2"
          fontWeight={600}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
        >
          <EventIcon sx={{ fontSize: 16, color: 'primary.main' }} />
          Work Experience
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {candidate.workHistory.map((work, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                pl: 2,
                borderLeft: 2,
                borderColor: 'rgba(26, 77, 58, 0.2)',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: -5,
                  top: 4,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                }}
              />
              <Typography variant="body2" fontWeight={500}>
                {work.title}
              </Typography>
              <Typography variant="body2" color="primary.main">
                {work.company}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                {work.duration}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {work.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Skills */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
          Skills
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {candidate.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              size="small"
              sx={{
                bgcolor: 'rgba(26, 77, 58, 0.04)',
                color: 'text.primary',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Certifications */}
      {candidate.certifications.length > 0 && (
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
            Certifications
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {candidate.certifications.map((cert, index) => (
              <Chip
                key={index}
                label={cert}
                size="small"
                sx={{
                  bgcolor: 'rgba(26, 77, 58, 0.1)',
                  color: 'primary.main',
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Last Updated */}
      <Box sx={{ p: 3 }}>
        <Typography variant="caption" color="text.secondary">
          Profile last updated: {candidate.lastUpdated}
        </Typography>
      </Box>
    </Box>
  );
};

export default CandidateProfile;
