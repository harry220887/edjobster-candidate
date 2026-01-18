import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AIRatingBadge from './AIRatingBadge';

const CandidateCard = ({
  candidate,
  isSelected,
  onSelect,
  onShortlist,
  onReject,
  isShortlisted,
}) => {
  // Build one-liner summary
  const highestEducation = candidate.highestEducation || 
    (candidate.education?.[0]?.degree) || '';
  const currentTitle = candidate.title || '';
  const currentCompany = candidate.workHistory?.[0]?.company || '';
  
  const summaryParts = [];
  if (highestEducation) summaryParts.push(highestEducation);
  if (currentTitle && currentCompany) {
    summaryParts.push(`${currentTitle} at ${currentCompany}`);
  } else if (currentTitle) {
    summaryParts.push(currentTitle);
  }
  const oneLinerSummary = summaryParts.join(' | ');

  // Build experience string (single line with ellipsis)
  const experienceStr = candidate.workHistory
    ?.map(w => `${w.title} at ${w.company} (${w.duration})`)
    .join(', ') || '';

  // Build education string (single line with ellipsis)
  const educationStr = candidate.education
    ?.map(e => `${e.degree}, ${e.institution}`)
    .join(' | ') || '';

  // Get matching attributes (mock for demo if not provided)
  const matchingAttributes = candidate.matchingAttributes || [];

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
        overflow: 'hidden',
        '&:hover': {
          borderColor: isSelected ? 'primary.main' : 'rgba(26, 77, 58, 0.3)',
          boxShadow: 2,
        },
      }}
    >
      {/* Header Section - Light Blue Background */}
      <Box sx={{ bgcolor: 'rgba(33, 150, 243, 0.06)', px: 2, pt: 1.5, pb: 1.5 }}>
        {/* Row 1: Photo, Name, LinkedIn, Resume, Exp, Viewed */}
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
          <Avatar
            src={candidate.photo}
            alt={candidate.name}
            sx={{ 
              width: 48, 
              height: 48, 
              flexShrink: 0,
              bgcolor: 'primary.main',
              fontSize: '1rem'
            }}
          >
            {candidate.name?.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Name row with icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {/* Left group: Name + Years exp */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flex: 1, minWidth: 0 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  noWrap
                  sx={{ color: 'text.primary' }}
                >
                  {candidate.name}
                </Typography>
                
                {/* Years of Experience Tag - immediately after name */}
                <Chip
                  label={`${candidate.experience} yrs exp`}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.65rem',
                    bgcolor: 'rgba(0, 0, 0, 0.06)',
                    color: 'text.secondary',
                    flexShrink: 0,
                  }}
                />
              </Box>

              {/* Right group: LinkedIn, Resume, Viewed */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                {/* LinkedIn Icon */}
                {(candidate.linkedinUrl || candidate.professionalNetworkUrl) && (
                  <Tooltip title="View LinkedIn Profile">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(candidate.linkedinUrl || candidate.professionalNetworkUrl, '_blank');
                      }}
                      sx={{ p: 0.5, color: '#0077B5' }}
                    >
                      <LinkedInIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                )}

                {/* Resume Tag */}
                {candidate.resumeUrl && (
                  <Chip
                    label="Resume"
                    size="small"
                    icon={<DescriptionIcon sx={{ fontSize: 14 }} />}
                    deleteIcon={<OpenInNewIcon sx={{ fontSize: 12 }} />}
                    onDelete={(e) => {
                      e.stopPropagation();
                      window.open(candidate.resumeUrl, '_blank');
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(candidate.resumeUrl, '_blank');
                    }}
                    sx={{
                      height: 22,
                      fontSize: '0.7rem',
                      bgcolor: 'rgba(26, 77, 58, 0.1)',
                      color: 'primary.main',
                      '& .MuiChip-icon': { color: 'primary.main' },
                      '& .MuiChip-deleteIcon': { color: 'primary.main', fontSize: 12 },
                    }}
                  />
                )}

                {/* Viewed Icon */}
                {candidate.isViewed && (
                  <Tooltip title="Profile viewed, this profile is available in viewed profiles to check later.">
                    <VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  </Tooltip>
                )}
              </Box>
            </Box>

            {/* Row 2: One-liner summary */}
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                display: 'block',
                mt: 0.5,
                fontSize: '0.75rem',
                lineHeight: 1.3,
              }}
              noWrap
            >
              {oneLinerSummary}
            </Typography>

            {/* Row 3: Location and Active Status */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
              <Typography
                variant="caption"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontSize: '0.7rem' }}
              >
                <LocationOnIcon sx={{ fontSize: 12 }} />
                {candidate.location}
              </Typography>
              <Typography variant="caption" sx={{ color: 'primary.main', opacity: 0.8, fontSize: '0.7rem' }}>
                <AccessTimeIcon sx={{ fontSize: 12, mr: 0.3, verticalAlign: 'middle' }} />
                Active {candidate.lastActive}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Details Section - White Background */}
      <CardContent sx={{ pt: 1.5, pb: 1, px: 2 }}>
        {/* Experience Row */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75, mb: 0.75 }}>
          <WorkIcon sx={{ fontSize: 14, color: 'text.secondary', mt: 0.2, flexShrink: 0 }} />
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.7rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
            }}
          >
            {experienceStr || `${candidate.title} at ${candidate.workHistory?.[0]?.company || 'Current Company'} (Present)`}
          </Typography>
        </Box>

        {/* Education Row */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75, mb: 0.75 }}>
          <SchoolIcon sx={{ fontSize: 14, color: 'text.secondary', mt: 0.2, flexShrink: 0 }} />
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.7rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
            }}
          >
            {educationStr || highestEducation || 'Education details available on profile'}
          </Typography>
        </Box>

        {/* Notice Period Row (if available) */}
        {candidate.noticePeriod && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
            <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary', flexShrink: 0 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              Notice Period: {candidate.noticePeriod}
            </Typography>
          </Box>
        )}

        {/* Fit Badge + Matching Attributes */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mt: 1 }}>
          <AIRatingBadge score={candidate.fitScore} reason={candidate.fitReason} size="sm" />
          
          {matchingAttributes.map((attr, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.3,
                color: 'success.main',
              }}
            >
              <CheckIcon sx={{ fontSize: 12 }} />
              <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>
                {attr}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>

      {/* Actions */}
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
