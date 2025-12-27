import { useState } from 'react';
import { Pencil, Search, Info } from 'lucide-react';
import { ExtractedKeywords } from '@/types/candidate';
import KeywordChips from './KeywordChips';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface SearchContextPanelProps {
  prompt: string;
  keywords: ExtractedKeywords;
  onEditPrompt: (newPrompt: string) => void;
  onUpdateKeywords: (keywords: ExtractedKeywords) => void;
}

const SearchContextPanel = ({ 
  prompt, 
  keywords, 
  onEditPrompt, 
  onUpdateKeywords 
}: SearchContextPanelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(prompt);

  const handleSave = () => {
    if (editValue.trim()) {
      onEditPrompt(editValue.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      {/* Original Prompt */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Search className="w-4 h-4 text-primary" />
            Your Search
          </h3>
          {!isEditing && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditing(true)}
              className="text-xs"
            >
              <Pencil className="w-3 h-3 mr-1" />
              Edit
            </Button>
          )}
        </div>
        
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="min-h-[100px] text-sm"
              autoFocus
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>Save & Search</Button>
              <Button size="sm" variant="ghost" onClick={() => {
                setEditValue(prompt);
                setIsEditing(false);
              }}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-sm text-foreground leading-relaxed">"{prompt}"</p>
          </div>
        )}
      </div>

      {/* Extracted Keywords */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">AI-Extracted Keywords</h3>
        <p className="text-xs text-muted-foreground">
          Click to edit or remove keywords. Changes refresh results live.
        </p>
        <KeywordChips keywords={keywords} onUpdate={onUpdateKeywords} />
      </div>

      {/* Search Summary */}
      <div className="bg-accent/50 rounded-lg p-4 border border-primary/10">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Search Coverage</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We're searching across active and passive candidates, even where salary or notice period is missing. Results are ranked by AI fit score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContextPanel;
