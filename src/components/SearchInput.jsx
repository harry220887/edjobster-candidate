import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

const SearchInput = ({
  onSearch,
  initialValue = '',
  placeholder = 'Looking for an English teacher with B.Ed, 5–8 years experience, Bangalore location, secondary school background.',
  size = 'default',
}) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSearch(value.trim());
      }
    }
  };

  const isLarge = size === 'large';

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          borderRadius: 3,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.3s',
          p: isLarge ? 1 : 0.5,
          '&:focus-within': {
            boxShadow: '0 0 40px rgba(26, 77, 58, 0.15)',
            borderColor: 'rgba(26, 77, 58, 0.3)',
          },
        }}
      >
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          multiline
          rows={isLarge ? 4 : 2}
          fullWidth
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: {
              p: isLarge ? 2 : 1.5,
              fontSize: isLarge ? '1.125rem' : '1rem',
              lineHeight: 1.6,
            },
          }}
          sx={{
            '& .MuiInputBase-root': {
              minHeight: isLarge ? 120 : 60,
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: isLarge ? 1 : 0.5 }}>
          <Button
            type="submit"
            variant="contained"
            size={isLarge ? 'large' : 'medium'}
            disabled={!value.trim()}
            startIcon={<SendIcon />}
          >
            Search Candidates
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchInput;
