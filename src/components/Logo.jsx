import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Logo = ({ className = '' }) => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
      }}
      className={className}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 2,
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            color: 'primary.contrastText',
            fontWeight: 700,
            fontSize: '1.125rem',
          }}
        >
          E
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'text.primary',
        }}
      >
        Edjobster
      </Typography>
    </Box>
  );
};

export default Logo;
