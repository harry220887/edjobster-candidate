import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AIRatingBadge from './AIRatingBadge';

const CandidateCard = ({
  candidate,
  isSelected,
  onSelect,
  onShortlist,
  onReject,
  isShortlisted,
}) => {
  return (
    <Card
      onClick={onSelect}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s',
        border: 1,
        borderColor: isSelected ? 'primary.main' : 'divider',
        boxShadow: isSelected ? 2 : 1,
        mb: 1.5,
        '&:hover': {
          borderColor: isSelected ? 'primary.main' : 'rgba(26, 77, 58, 0.3)',
          boxShadow: 2,
        },
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Avatar
            src={candidate.photo}
            alt={candidate.name}
            sx={{ width: 56, height: 56, flexShrink: 0 }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1, mb: 0.5 }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                noWrap
                sx={{ color: 'text.primary' }}
              >
                {candidate.name}
              </Typography>
              <AIRatingBadge score={candidate.fitScore} reason={candidate.fitReason} size="sm" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {candidate.title}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
              <Typography
                variant="caption"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}
              >
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                {candidate.experience} years exp
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}
              >
                <LocationOnIcon sx={{ fontSize: 14 }} />
                {candidate.location}
              </Typography>
              <Typography variant="caption" sx={{ color: 'primary.main', opacity: 0.7 }}>
                Active {candidate.lastActive}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ borderTop: 1, borderColor: 'divider', pt: 1.5, pb: 1.5, px: 2 }}>
        <Button
          variant={isShortlisted ? 'contained' : 'outlined'}
          size="small"
          color={isShortlisted ? 'success' : 'primary'}
          startIcon={<CheckCircleIcon />}
          onClick={(e) => {
            e.stopPropagation();
            onShortlist();
          }}
          sx={{ flex: 1 }}
        >
          {isShortlisted ? 'Shortlisted' : 'Shortlist'}
        </Button>
        <Button
          variant="text"
          size="small"
          startIcon={<CancelIcon />}
          onClick={(e) => {
            e.stopPropagation();
            onReject();
          }}
          sx={{
            flex: 1,
            color: 'text.secondary',
            '&:hover': {
              bgcolor: 'rgba(239, 68, 68, 0.1)',
              color: 'error.main',
            },
          }}
        >
          Reject
        </Button>
      </CardActions>
    </Card>
  );
};

export default CandidateCard;
