import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const prompts = [
  'Find English teachers with B.Ed and 5+ years experience in CBSE schools',
  'Help me hire a Montessori-trained English teacher for middle school',
  'Find sales professionals with SaaS experience in India',
];

const SuggestedPrompts = ({ onSelect }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
        <AutoAwesomeIcon sx={{ fontSize: 16 }} />
        <Typography variant="body2" fontWeight={500}>
          Try these examples
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {prompts.map((prompt, index) => (
          <Chip
            key={index}
            label={prompt}
            onClick={() => onSelect(prompt)}
            sx={{
              height: 'auto',
              py: 1,
              px: 0.5,
              borderRadius: 5,
              bgcolor: 'rgba(26, 77, 58, 0.04)',
              border: '1px solid rgba(26, 77, 58, 0.1)',
              color: 'text.primary',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '& .MuiChip-label': {
                whiteSpace: 'normal',
                textAlign: 'left',
              },
              '&:hover': {
                bgcolor: 'rgba(26, 77, 58, 0.08)',
                borderColor: 'rgba(26, 77, 58, 0.3)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SuggestedPrompts;
