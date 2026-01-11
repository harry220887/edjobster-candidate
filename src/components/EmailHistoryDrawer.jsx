import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';

const getMockConversation = (candidate) => [
  {
    id: 1,
    sender: 'HR Manager',
    senderEmail: 'hr@company.com',
    isFromHR: true,
    timestamp: 'Jan 5, 2026 at 10:15 AM',
    subject: `Exciting Opportunity for ${candidate.title} Role`,
    body: `Hi ${candidate.name},

I came across your profile and was impressed by your experience at ${candidate.workHistory?.[0]?.company || 'your current company'}. We have an exciting opportunity that I believe would be a great fit for your skills and career goals.

Would you be open to a brief conversation to learn more?

Best regards,
Sarah Johnson
HR Manager`,
  },
  {
    id: 2,
    sender: candidate.name,
    senderEmail: candidate.email || 'candidate@email.com',
    isFromHR: false,
    timestamp: 'Jan 6, 2026 at 3:45 PM',
    subject: `Re: Exciting Opportunity for ${candidate.title} Role`,
    body: `Hi Sarah,

Thank you for reaching out! I would be happy to learn more about this opportunity. The role sounds interesting and aligns well with my career aspirations.

I'm available for a call this week. Please let me know what times work best for you.

Looking forward to connecting.

Best,
${candidate.name}`,
  },
  {
    id: 3,
    sender: 'HR Manager',
    senderEmail: 'hr@company.com',
    isFromHR: true,
    timestamp: 'Jan 8, 2026 at 2:30 PM',
    subject: `Re: Exciting Opportunity for ${candidate.title} Role`,
    body: `Hi ${candidate.name},

Great to hear from you! I would love to schedule a call to discuss the role in more detail.

How about Thursday at 2:00 PM or Friday at 10:00 AM? We can do a video call via Google Meet.

Looking forward to speaking with you!

Best,
Sarah Johnson
HR Manager`,
  },
];

const EmailHistoryDrawer = ({ open, onClose, candidate }) => {
  const conversation = getMockConversation(candidate);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        BackdropProps: {
          sx: { bgcolor: 'rgba(0, 0, 0, 0.5)' },
        },
      }}
      PaperProps={{
        sx: { width: 384, height: '100vh' },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Email History
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Conversation Info */}
      <Box sx={{ px: 2, py: 1.5, bgcolor: 'rgba(0,0,0,0.02)', borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary">
          Conversation with
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          {candidate.name}
        </Typography>
      </Box>

      {/* Email Thread */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {conversation.map((email, index) => (
            <Box key={email.id}>
              {/* Email Header */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: email.isFromHR ? 'primary.main' : 'grey.400',
                  }}
                >
                  {email.isFromHR ? (
                    <BusinessIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <PersonIcon sx={{ fontSize: 16 }} />
                  )}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                    <Typography variant="body2" fontWeight={500} noWrap>
                      {email.sender}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                      {email.timestamp.split(' at ')[0]}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {email.senderEmail}
                  </Typography>
                </Box>
              </Box>

              {/* Subject (only for first email) */}
              {index === 0 && (
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{
                    ml: 5.5,
                    mb: 0.5,
                    color: 'text.primary',
                  }}
                >
                  {email.subject}
                </Typography>
              )}

              {/* Email Body */}
              <Box
                sx={{
                  ml: 5.5,
                  p: 1.5,
                  borderRadius: 1.5,
                  bgcolor: email.isFromHR ? 'rgba(26, 77, 58, 0.04)' : 'rgba(0, 0, 0, 0.02)',
                  borderLeft: 2,
                  borderColor: email.isFromHR ? 'primary.main' : 'grey.300',
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    whiteSpace: 'pre-line',
                    fontSize: '0.8125rem',
                    lineHeight: 1.6,
                  }}
                >
                  {email.body}
                </Typography>
              </Box>

              {/* Divider between emails */}
              {index < conversation.length - 1 && (
                <Divider sx={{ mt: 2 }} />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default EmailHistoryDrawer;
