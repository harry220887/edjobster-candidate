import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';

const scoreConfig = {
  best: {
    label: 'Best Fit',
    bgcolor: 'rgba(34, 197, 94, 0.1)',
    color: '#16a34a',
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  good: {
    label: 'Good Fit',
    bgcolor: 'rgba(26, 77, 58, 0.1)',
    color: '#1a4d3a',
    borderColor: 'rgba(26, 77, 58, 0.2)',
  },
  partial: {
    label: 'Partial Fit',
    bgcolor: 'rgba(245, 158, 11, 0.1)',
    color: '#d97706',
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  not: {
    label: 'Not a Fit',
    bgcolor: 'rgba(0, 0, 0, 0.04)',
    color: '#6b7280',
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
};

const AIRatingBadge = ({ score, reason, size = 'default' }) => {
  const config = scoreConfig[score];

  return (
    <Tooltip title={reason} arrow placement="top">
      <Chip
        label={config.label}
        size={size === 'sm' ? 'small' : 'medium'}
        sx={{
          bgcolor: config.bgcolor,
          color: config.color,
          border: `1px solid ${config.borderColor}`,
          fontWeight: 500,
          cursor: 'help',
          fontSize: size === 'sm' ? '0.75rem' : '0.875rem',
          height: size === 'sm' ? 24 : 32,
        }}
      />
    </Tooltip>
  );
};

export default AIRatingBadge;
