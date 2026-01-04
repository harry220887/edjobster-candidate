import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const EditableChip = ({ label, onRemove, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(label);

  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(editValue.trim());
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          bgcolor: 'rgba(26, 77, 58, 0.04)',
          border: '1px solid rgba(26, 77, 58, 0.2)',
          borderRadius: 5,
          px: 1,
          py: 0.5,
        }}
      >
        <TextField
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          size="small"
          variant="standard"
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          onBlur={handleSave}
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: '0.75rem', width: 80, p: 0 },
          }}
        />
        <IconButton size="small" onClick={handleSave} sx={{ p: 0.25 }}>
          <CheckIcon sx={{ fontSize: 14, color: 'primary.main' }} />
        </IconButton>
      </Box>
    );
  }

  return (
    <Chip
      label={label}
      size="small"
      onDelete={onRemove}
      deleteIcon={<CloseIcon sx={{ fontSize: 14 }} />}
      sx={{
        bgcolor: 'rgba(26, 77, 58, 0.04)',
        border: '1px solid rgba(26, 77, 58, 0.2)',
        '& .MuiChip-deleteIcon': {
          opacity: 0,
          transition: 'opacity 0.2s',
          color: 'error.main',
        },
        '&:hover .MuiChip-deleteIcon': {
          opacity: 1,
        },
        '& .MuiChip-label': {
          pr: 0.5,
        },
      }}
      icon={
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          sx={{
            p: 0.25,
            ml: 0.5,
            opacity: 0,
            transition: 'opacity 0.2s',
            '.MuiChip-root:hover &': {
              opacity: 1,
            },
          }}
        >
          <EditIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
        </IconButton>
      }
    />
  );
};

const KeywordChips = ({ keywords, onUpdate }) => {
  const handleRemove = (category, index) => {
    const updated = { ...keywords };
    if (Array.isArray(updated[category])) {
      updated[category] = [...updated[category]];
      updated[category].splice(index, 1);
    } else {
      updated[category] = '';
    }
    onUpdate(updated);
  };

  const handleEdit = (category, index, newValue) => {
    const updated = { ...keywords };
    if (Array.isArray(updated[category])) {
      updated[category] = [...updated[category]];
      updated[category][index] = newValue;
    } else {
      updated[category] = newValue;
    }
    onUpdate(updated);
  };

  const renderCategory = (label, items, category) => {
    if (!items || items.length === 0) return null;
    return (
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mb: 1,
            fontWeight: 500,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {label}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {items.map((item, index) => (
            <EditableChip
              key={`${category}-${index}`}
              label={item}
              onRemove={() => handleRemove(category, index)}
              onEdit={(newValue) => handleEdit(category, index, newValue)}
            />
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      {renderCategory('Job Titles', keywords.jobTitles, 'jobTitles')}
      {renderCategory('Skills', keywords.skills, 'skills')}
      {renderCategory('Education', keywords.education, 'education')}
      {keywords.experienceRange && (
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mb: 1,
              fontWeight: 500,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Experience
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <EditableChip
              label={keywords.experienceRange}
              onRemove={() => onUpdate({ ...keywords, experienceRange: '' })}
              onEdit={(newValue) => onUpdate({ ...keywords, experienceRange: newValue })}
            />
          </Box>
        </Box>
      )}
      {renderCategory('Location', keywords.location, 'location')}
    </Box>
  );
};

export default KeywordChips;
