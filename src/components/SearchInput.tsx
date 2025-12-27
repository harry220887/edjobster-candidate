import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchInputProps {
  onSearch: (prompt: string) => void;
  initialValue?: string;
  placeholder?: string;
  size?: 'default' | 'large';
}

const SearchInput = ({ 
  onSearch, 
  initialValue = '', 
  placeholder = "Looking for an English teacher with B.Ed, 5–8 years experience, Bangalore location, secondary school background.",
  size = 'default'
}: SearchInputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSearch(value.trim());
      }
    }
  };

  const isLarge = size === 'large';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative bg-card border border-border rounded-xl shadow-elevated transition-shadow duration-300 focus-within:shadow-glow focus-within:border-primary/30 ${isLarge ? 'p-2' : 'p-1'}`}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full bg-transparent resize-none outline-none text-foreground placeholder:text-muted-foreground ${isLarge ? 'min-h-[120px] p-4 text-lg' : 'min-h-[60px] p-3 text-base'}`}
          rows={isLarge ? 4 : 2}
        />
        <div className={`flex justify-end ${isLarge ? 'p-2' : 'p-1'}`}>
          <Button 
            type="submit" 
            variant="hero" 
            size={isLarge ? 'lg' : 'default'}
            disabled={!value.trim()}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            Search Candidates
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
