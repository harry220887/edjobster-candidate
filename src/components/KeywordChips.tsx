import { useState } from 'react';
import { X, Pencil, Check } from 'lucide-react';
import { ExtractedKeywords } from '@/types/candidate';
import { Input } from '@/components/ui/input';

interface KeywordChipsProps {
  keywords: ExtractedKeywords;
  onUpdate: (keywords: ExtractedKeywords) => void;
}

interface ChipProps {
  label: string;
  onRemove: () => void;
  onEdit: (newValue: string) => void;
}

const Chip = ({ label, onRemove, onEdit }: ChipProps) => {
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
      <div className="inline-flex items-center gap-1 bg-accent border border-primary/20 rounded-full px-2 py-1">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="h-5 w-24 text-xs border-0 bg-transparent p-0 focus-visible:ring-0"
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          onBlur={handleSave}
        />
        <button onClick={handleSave} className="text-primary hover:text-primary/80">
          <Check className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground border border-primary/20 rounded-full px-3 py-1 text-sm group">
      {label}
      <button 
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity"
      >
        <Pencil className="w-3 h-3" />
      </button>
      <button 
        onClick={onRemove}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
};

const KeywordChips = ({ keywords, onUpdate }: KeywordChipsProps) => {
  const handleRemove = (category: keyof ExtractedKeywords, index: number) => {
    const updated = { ...keywords };
    if (Array.isArray(updated[category])) {
      (updated[category] as string[]).splice(index, 1);
    } else {
      updated[category] = '' as any;
    }
    onUpdate(updated);
  };

  const handleEdit = (category: keyof ExtractedKeywords, index: number, newValue: string) => {
    const updated = { ...keywords };
    if (Array.isArray(updated[category])) {
      (updated[category] as string[])[index] = newValue;
    } else {
      updated[category] = newValue as any;
    }
    onUpdate(updated);
  };

  const renderCategory = (label: string, items: string[], category: keyof ExtractedKeywords) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <Chip
              key={`${category}-${index}`}
              label={item}
              onRemove={() => handleRemove(category, index)}
              onEdit={(newValue) => handleEdit(category, index, newValue)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {renderCategory('Job Titles', keywords.jobTitles, 'jobTitles')}
      {renderCategory('Skills', keywords.skills, 'skills')}
      {renderCategory('Education', keywords.education, 'education')}
      {keywords.experienceRange && (
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Experience</span>
          <div className="flex flex-wrap gap-2">
            <Chip
              label={keywords.experienceRange}
              onRemove={() => onUpdate({ ...keywords, experienceRange: '' })}
              onEdit={(newValue) => onUpdate({ ...keywords, experienceRange: newValue })}
            />
          </div>
        </div>
      )}
      {renderCategory('Location', keywords.location, 'location')}
    </div>
  );
};

export default KeywordChips;
