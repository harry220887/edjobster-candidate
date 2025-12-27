import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import SearchInput from '@/components/SearchInput';
import SuggestedPrompts from '@/components/SuggestedPrompts';

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (prompt: string) => {
    navigate('/search', { state: { prompt } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center">
          <Logo />
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-16 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in">
          {/* Headline */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Hire proactively.{' '}
              <span className="text-primary">Don't just wait</span> for people to apply.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Describe who you are looking for. We'll search across active and passive talent using AI.
            </p>
          </div>

          {/* Search Input */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <SearchInput onSearch={handleSearch} size="large" />
          </div>

          {/* Suggested Prompts */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <SuggestedPrompts onSelect={handleSearch} />
          </div>
        </div>
      </main>

      {/* Subtle background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-accent/30 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Index;
