import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SearchContextPanel from '@/components/SearchContextPanel';
import CandidateCard from '@/components/CandidateCard';
import CandidateProfile from '@/components/CandidateProfile';
import { extractKeywordsFromPrompt } from '@/data/mockCandidates';
import { Candidate, ExtractedKeywords } from '@/types/candidate';
import { Users, UserCheck, Search, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { searchCandidates, collectCandidate } from '@/lib/coresignal';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const initialPrompt = (location.state as { prompt?: string })?.prompt || '';
  
  const [prompt, setPrompt] = useState(initialPrompt);
  const [keywords, setKeywords] = useState<ExtractedKeywords>(() => extractKeywordsFromPrompt(initialPrompt));
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [fullProfile, setFullProfile] = useState<Candidate | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [profileCache, setProfileCache] = useState<Record<string, Candidate>>({});
  const [shortlisted, setShortlisted] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  const [sentInvites, setSentInvites] = useState(12);
  const [repliesReceived, setRepliesReceived] = useState(4);
  const [activeTab, setActiveTab] = useState<'all' | 'shortlisted'>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch full profile when candidate is selected
  const fetchFullProfile = useCallback(async (candidate: Candidate) => {
    // Check cache first
    if (profileCache[candidate.id]) {
      setFullProfile(profileCache[candidate.id]);
      return;
    }

    setIsLoadingProfile(true);
    setFullProfile(null);
    
    try {
      const profile = await collectCandidate(candidate.id);
      // Preserve fitScore and fitReason from preview
      const mergedProfile = {
        ...profile,
        fitScore: candidate.fitScore,
        fitReason: candidate.fitReason,
      };
      setFullProfile(mergedProfile);
      setProfileCache(prev => ({ ...prev, [candidate.id]: mergedProfile }));
    } catch (error) {
      console.error('Failed to fetch full profile:', error);
      // Fallback to preview data
      setFullProfile(candidate);
      toast({
        title: "Couldn't load full profile",
        description: "Showing preview data instead.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingProfile(false);
    }
  }, [profileCache, toast]);

  // Fetch candidates when keywords change
  const fetchCandidates = async (searchKeywords: ExtractedKeywords) => {
    setIsLoading(true);
    try {
      const result = await searchCandidates(searchKeywords);
      setCandidates(result.candidates);
      if (result.candidates.length > 0) {
        setSelectedCandidate(result.candidates[0]);
      } else {
        setSelectedCandidate(null);
        setFullProfile(null);
      }
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
      toast({
        title: "Search failed",
        description: error instanceof Error ? error.message : "Failed to search candidates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch full profile when selected candidate changes
  useEffect(() => {
    if (selectedCandidate) {
      fetchFullProfile(selectedCandidate);
    }
  }, [selectedCandidate, fetchFullProfile]);

  useEffect(() => {
    if (!initialPrompt) {
      navigate('/');
      return;
    }
    // Initial search
    fetchCandidates(keywords);
  }, []);

  const handleEditPrompt = (newPrompt: string) => {
    setPrompt(newPrompt);
    const newKeywords = extractKeywordsFromPrompt(newPrompt);
    setKeywords(newKeywords);
    fetchCandidates(newKeywords);
  };

  const handleUpdateKeywords = (newKeywords: ExtractedKeywords) => {
    setKeywords(newKeywords);
    fetchCandidates(newKeywords);
  };

  const handleShortlist = (candidateId: string) => {
    if (shortlisted.includes(candidateId)) {
      setShortlisted(shortlisted.filter(id => id !== candidateId));
      toast({
        title: "Removed from shortlist",
        description: "Candidate moved back to results.",
      });
    } else {
      setShortlisted([...shortlisted, candidateId]);
      toast({
        title: "Added to shortlist",
        description: "Candidate has been shortlisted.",
      });
    }
  };

  const handleReject = (candidateId: string) => {
    setRejected([...rejected, candidateId]);
    if (selectedCandidate?.id === candidateId) {
      const remaining = candidates.filter(c => c.id !== candidateId && !rejected.includes(c.id));
      setSelectedCandidate(remaining[0] || null);
    }
    toast({
      title: "Candidate rejected",
      description: "Candidate has been hidden from results.",
    });
  };

  const handleSendInvite = () => {
    setSentInvites(prev => prev + 1);
  };

  const handleRevealContact = () => {
    // In a real app, this would reveal contact info
  };

  const visibleCandidates = candidates.filter(c => !rejected.includes(c.id));
  const displayedCandidates = activeTab === 'shortlisted' 
    ? visibleCandidates.filter(c => shortlisted.includes(c.id))
    : visibleCandidates;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header sentInvites={sentInvites} repliesReceived={repliesReceived} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Search Context */}
        <aside className="w-80 border-r border-border bg-card flex-shrink-0 hidden lg:block">
          <SearchContextPanel
            prompt={prompt}
            keywords={keywords}
            onEditPrompt={handleEditPrompt}
            onUpdateKeywords={handleUpdateKeywords}
          />
        </aside>

        {/* Middle Column - Candidate Listing */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Tabs */}
          <div className="border-b border-border bg-card px-4 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'all' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <Users className="w-4 h-4" />
                All Results ({visibleCandidates.length})
              </button>
              <button
                onClick={() => setActiveTab('shortlisted')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'shortlisted' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Shortlisted ({shortlisted.length})
              </button>
            </div>
          </div>

          {/* Candidate List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Searching candidates...
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  We're searching across active and passive talent using AI.
                </p>
              </div>
            ) : displayedCandidates.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {activeTab === 'shortlisted' ? 'No shortlisted candidates' : 'No candidates found'}
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  {activeTab === 'shortlisted' 
                    ? 'Start shortlisting candidates from the results to see them here.'
                    : 'Try adjusting your search keywords or prompt to find more candidates.'}
                </p>
              </div>
            ) : (
              displayedCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isSelected={selectedCandidate?.id === candidate.id}
                  onSelect={() => setSelectedCandidate(candidate)}
                  onShortlist={() => handleShortlist(candidate.id)}
                  onReject={() => handleReject(candidate.id)}
                  isShortlisted={shortlisted.includes(candidate.id)}
                />
              ))
            )}
          </div>
        </main>

        {/* Right Column - Candidate Profile */}
        <aside className="w-96 border-l border-border bg-card flex-shrink-0 hidden xl:block">
          {isLoadingProfile ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Loading profile...
              </h3>
              <p className="text-muted-foreground">
                Fetching complete candidate details.
              </p>
            </div>
          ) : fullProfile ? (
            <CandidateProfile
              candidate={fullProfile}
              onSendInvite={handleSendInvite}
              onRevealContact={handleRevealContact}
            />
          ) : selectedCandidate ? (
            <CandidateProfile
              candidate={selectedCandidate}
              onSendInvite={handleSendInvite}
              onRevealContact={handleRevealContact}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Select a candidate
              </h3>
              <p className="text-muted-foreground">
                Click on a candidate to view their full profile and take action.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default SearchResults;
