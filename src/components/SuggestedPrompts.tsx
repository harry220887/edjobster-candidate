import { Sparkles } from 'lucide-react';

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

const prompts = [
  "Find English teachers with B.Ed and 5+ years experience in CBSE schools",
  "Help me hire a Montessori-trained English teacher for middle school",
  "Find sales professionals with SaaS experience in India"
];

const SuggestedPrompts = ({ onSelect }: SuggestedPromptsProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium">Try these examples</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelect(prompt)}
            className="px-4 py-2 text-sm bg-accent text-accent-foreground rounded-full border border-primary/10 hover:border-primary/30 hover:bg-accent/80 transition-all duration-200 text-left"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
