import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import KeywordChips from './KeywordChips';

const SearchContextPanel = ({ prompt, keywords, onEditPrompt, onUpdateKeywords }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(prompt);

  const handleSave = () => {
    if (editValue.trim()) {
      onEditPrompt(editValue.trim());
    }
    setIsEditing(false);
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 2 }}>
      {/* Original Prompt */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <SearchIcon sx={{ fontSize: 16, color: 'primary.main' }} />
            Your Search
          </Typography>
          {!isEditing && (
            <Button
              size="small"
              startIcon={<EditIcon sx={{ fontSize: 14 }} />}
              onClick={() => setIsEditing(true)}
              sx={{ fontSize: '0.75rem' }}
            >
              Edit
            </Button>
          )}
        </Box>

        {isEditing ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              multiline
              rows={4}
              size="small"
              autoFocus
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" variant="contained" onClick={handleSave}>
                Save & Search
              </Button>
              <Button
                size="small"
                variant="text"
                onClick={() => {
                  setEditValue(prompt);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Paper
            variant="outlined"
            sx={{
              p: 1.5,
              bgcolor: 'rgba(0, 0, 0, 0.02)',
              borderColor: 'divider',
            }}
          >
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              "{prompt}"
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Extracted Keywords */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
          AI-Extracted Keywords
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1.5 }}>
          Click to edit or remove keywords. Changes refresh results live.
        </Typography>
        <KeywordChips keywords={keywords} onUpdate={onUpdateKeywords} />
      </Box>

      {/* Search Summary */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          bgcolor: 'rgba(26, 77, 58, 0.04)',
          borderColor: 'rgba(26, 77, 58, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <InfoIcon sx={{ fontSize: 16, color: 'primary.main', mt: 0.25, flexShrink: 0 }} />
          <Box>
            <Typography variant="subtitle2" fontWeight={500} sx={{ mb: 0.5 }}>
              Search Coverage
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
              We're searching across active and passive candidates, even where salary or notice
              period is missing. Results are ranked by AI fit score.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SearchContextPanel;
