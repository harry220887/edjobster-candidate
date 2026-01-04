import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" fontWeight={700} sx={{ mb: 2 }}>
          404
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          Oops! Page not found
        </Typography>
        <Link href="/" underline="hover" sx={{ color: 'primary.main' }}>
          Return to Home
        </Link>
      </Box>
    </Box>
  );
};

export default NotFound;
