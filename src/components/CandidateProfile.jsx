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
import ReplyIcon from '@mui/icons-material/Reply';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import AIRatingBadge from './AIRatingBadge';
import ComposeEmailDrawer from './ComposeEmailDrawer';
import { toast } from 'sonner';

// Mock email status based on candidate name
const getEmailStatus = (candidateName) => {
  if (candidateName === 'Megha Sethi') {
    return { status: 'delivered', timestamp: 'Jan 8, 2026 at 2:30 PM' };
  }
  if (candidateName === 'Savitha Jp') {
    return { status: 'failed', error: 'Email bounced - invalid address' };
  }
  return null;
};

const CandidateProfile = ({ candidate, onSendInvite, onRevealContact }) => {
  const [contactRevealed, setContactRevealed] = useState(candidate.contactRevealed);
  const [emailDrawerOpen, setEmailDrawerOpen] = useState(false);
  
  const emailStatus = getEmailStatus(candidate.name);
  const isFollowUp = emailStatus?.status === 'delivered';

  const handleRevealContact = () => {
    setContactRevealed(true);
    onRevealContact();
  };

  const handleSendInvite = () => {
    setEmailDrawerOpen(true);
  };

  const handleEmailSend = () => {
    onSendInvite();
    toast.success(isFollowUp ? 'Follow-up Sent' : 'Invite Sent', {
      description: `Your ${isFollowUp ? 'follow-up' : 'invite'} has been sent to ${candidate.name}.`,
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
          {isFollowUp ? (
            <Button
              variant="contained"
              startIcon={<ReplyIcon />}
              onClick={handleSendInvite}
              sx={{ flex: 1 }}
            >
              Follow up
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={handleSendInvite}
              sx={{ flex: 1 }}
            >
              Send Invite
            </Button>
          )}
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

        {/* Email Status Snippet */}
        {emailStatus && (
          <Box sx={{ mt: 1.5, p: 1.5, borderRadius: 1, bgcolor: 'rgba(0,0,0,0.02)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {emailStatus.status === 'delivered' ? (
                <>
                  <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                  <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 500 }}>
                    Delivered
                  </Typography>
                </>
              ) : (
                <>
                  <ErrorIcon sx={{ fontSize: 16, color: 'error.main' }} />
                  <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 500 }}>
                    Failed
                  </Typography>
                </>
              )}
            </Box>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
              {emailStatus.status === 'delivered' 
                ? `Sent on ${emailStatus.timestamp}` 
                : emailStatus.error}
            </Typography>
          </Box>
        )}
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

      {/* Compose Email Drawer */}
      <ComposeEmailDrawer
        open={emailDrawerOpen}
        onClose={() => setEmailDrawerOpen(false)}
        candidate={candidate}
        onSend={handleEmailSend}
        isFollowUp={isFollowUp}
      />
    </Box>
  );
};

export default CandidateProfile;
