import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

const ComposeEmailDrawer = ({ open, onClose, candidate, onSend, isFollowUp = false }) => {
  const currentJobTitle = candidate?.workHistory?.[0]?.title || candidate?.title || 'Professional';
  const currentCompany = candidate?.workHistory?.[0]?.company || 'your organization';

  const initialEmailBody = isFollowUp 
    ? `Hi ${candidate?.name || 'Candidate'},

I wanted to follow up on my previous message regarding the ${currentJobTitle} opportunity.

I understand you may be busy, but I believe your experience at ${currentCompany} makes you an excellent fit for this role.

Would you have 15 minutes this week for a quick call?

Looking forward to hearing from you.

Best regards,
[Your Name]
[Your Company]`
    : `Hi ${candidate?.name || 'Candidate'},

I came across your profile and was impressed by your experience as a ${currentJobTitle} at ${currentCompany}.

We have an exciting opportunity that I believe aligns well with your background and expertise. I would love to schedule a brief call to discuss how your skills could be a great fit for our team.

Would you be available for a 15-minute conversation this week?

Looking forward to hearing from you.

Best regards,
[Your Name]
[Your Company]`;

  const initialSubject = isFollowUp 
    ? `Following up: ${currentJobTitle} Opportunity`
    : `Exciting Opportunity for ${currentJobTitle} Role`;

  const [subject, setSubject] = useState(initialSubject);
  const [emailBody, setEmailBody] = useState(initialEmailBody);

  const handleSend = () => {
    onSend();
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        BackdropProps: {
          sx: { bgcolor: 'rgba(0, 0, 0, 0.5)' }
        }
      }}
      PaperProps={{
        sx: { 
          width: 384, 
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="h6" fontWeight={600}>
          {isFollowUp ? 'Compose Follow-up' : 'Compose Email'}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
        {/* Recipient Info */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            To
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5,
            bgcolor: 'rgba(0, 0, 0, 0.02)',
            borderRadius: 2,
            p: 1.5
          }}>
            <PersonIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {candidate?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <EmailIcon sx={{ fontSize: 12 }} />
                {candidate?.email || 'email@hidden.com'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Subject */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Subject
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
          />
        </Box>

        {/* Email Body */}
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Message
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={14}
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            placeholder="Write your message..."
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: '0.875rem',
                lineHeight: 1.6
              }
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            ✨ This message was generated using AI based on candidate profile
          </Typography>
        </Box>
      </Box>

      {/* Footer Actions */}
      <Box sx={{ 
        p: 2, 
        borderTop: 1, 
        borderColor: 'divider',
        display: 'flex',
        gap: 1.5
      }}>
        <Button 
          variant="outlined" 
          onClick={onClose}
          sx={{ flex: 1 }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          startIcon={<SendIcon />}
          onClick={handleSend}
          sx={{ flex: 1 }}
        >
          {isFollowUp ? 'Send Follow-up' : 'Send Email'}
        </Button>
      </Box>
    </Drawer>
  );
};

export default ComposeEmailDrawer;
