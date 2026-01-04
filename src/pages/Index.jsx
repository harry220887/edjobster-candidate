import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '@/components/Logo';
import SearchInput from '@/components/SearchInput';
import SuggestedPrompts from '@/components/SuggestedPrompts';

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (prompt) => {
    navigate('/search', { state: { prompt } });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          bgcolor: 'rgba(252, 252, 252, 0.8)',
          backdropFilter: 'blur(8px)',
          borderBottom: 1,
          borderColor: 'rgba(0, 0, 0, 0.05)',
        }}
      >
        <Container maxWidth="lg" sx={{ height: 64, display: 'flex', alignItems: 'center' }}>
          <Logo />
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        component="main"
        sx={{
          pt: 8,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 768,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
          className="animate-fadeIn"
        >
          {/* Headline */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                fontWeight: 700,
                color: 'text.primary',
                lineHeight: 1.2,
                mb: 2,
                textWrap: 'balance',
              }}
            >
              Hire proactively.{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Don't just wait
              </Box>{' '}
              for people to apply.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                color: 'text.secondary',
                maxWidth: 640,
                mx: 'auto',
                fontWeight: 400,
              }}
            >
              Describe who you are looking for. We'll search across active and passive talent using
              AI.
            </Typography>
          </Box>

          {/* Search Input */}
          <Box className="animate-slideUp" sx={{ animationDelay: '0.1s' }}>
            <SearchInput onSearch={handleSearch} size="large" />
          </Box>

          {/* Suggested Prompts */}
          <Box className="animate-slideUp" sx={{ animationDelay: '0.2s' }}>
            <SuggestedPrompts onSelect={handleSearch} />
          </Box>
        </Box>
      </Box>

      {/* Subtle background gradient */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1000,
            height: 600,
            bgcolor: 'rgba(26, 77, 58, 0.05)',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 600,
            height: 400,
            bgcolor: 'rgba(26, 77, 58, 0.08)',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />
      </Box>
    </Box>
  );
};

export default Index;
