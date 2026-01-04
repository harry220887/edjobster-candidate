import { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from './Logo';

const Header = ({ sentInvites, repliesReceived }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          px: 3,
        }}
      >
        <Logo />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* Outreach Counters */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  bgcolor: 'rgba(26, 77, 58, 0.1)',
                }}
              >
                <SendIcon sx={{ fontSize: 16, color: 'primary.main' }} />
              </Box>
              <Box>
                <Typography component="span" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.875rem' }}>
                  {sentInvites}
                </Typography>
                <Typography component="span" sx={{ color: 'text.secondary', ml: 0.5, fontSize: '0.875rem' }}>
                  Sent
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  bgcolor: 'rgba(34, 197, 94, 0.1)',
                }}
              >
                <ChatBubbleIcon sx={{ fontSize: 16, color: 'success.main' }} />
              </Box>
              <Box>
                <Typography component="span" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.875rem' }}>
                  {repliesReceived}
                </Typography>
                <Typography component="span" sx={{ color: 'text.secondary', ml: 0.5, fontSize: '0.875rem' }}>
                  Replies
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Account Dropdown */}
          <IconButton onClick={handleClick} sx={{ p: 0 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'primary.main',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              HR
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { width: 192, mt: 1 } }}
          >
            <MenuItem onClick={handleClose}>
              <PersonIcon sx={{ fontSize: 18, mr: 1.5, color: 'text.secondary' }} />
              Edit Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <GroupIcon sx={{ fontSize: 18, mr: 1.5, color: 'text.secondary' }} />
              Manage Team
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
              <LogoutIcon sx={{ fontSize: 18, mr: 1.5 }} />
              Sign Out
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
