import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'sonner';
import Header from '@/components/Header';
import SearchContextPanel from '@/components/SearchContextPanel';
import CandidateCard from '@/components/CandidateCard';
import CandidateProfile from '@/components/CandidateProfile';
import { extractKeywordsFromPrompt } from '@/data/mockCandidates';
import { searchCandidates, collectCandidate } from '@/lib/coresignal';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialPrompt = location.state?.prompt || '';

  const [prompt, setPrompt] = useState(initialPrompt);
  const [keywords, setKeywords] = useState(() => extractKeywordsFromPrompt(initialPrompt));
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [fullProfile, setFullProfile] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [profileCache, setProfileCache] = useState({});
  const [shortlisted, setShortlisted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [sentInvites, setSentInvites] = useState(12);
  const [repliesReceived, setRepliesReceived] = useState(4);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch full profile when candidate is selected
  const fetchFullProfile = useCallback(
    async (candidate) => {
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
        setProfileCache((prev) => ({ ...prev, [candidate.id]: mergedProfile }));
      } catch (error) {
        console.error('Failed to fetch full profile:', error);
        // Fallback to preview data
        setFullProfile(candidate);
        toast.error("Couldn't load full profile", {
          description: 'Showing preview data instead.',
        });
      } finally {
        setIsLoadingProfile(false);
      }
    },
    [profileCache]
  );

  // Fetch candidates when keywords change
  const fetchCandidates = async (searchKeywords) => {
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
      toast.error('Search failed', {
        description: error instanceof Error ? error.message : 'Failed to search candidates. Please try again.',
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

  const handleEditPrompt = (newPrompt) => {
    setPrompt(newPrompt);
    const newKeywords = extractKeywordsFromPrompt(newPrompt);
    setKeywords(newKeywords);
    fetchCandidates(newKeywords);
  };

  const handleUpdateKeywords = (newKeywords) => {
    setKeywords(newKeywords);
    fetchCandidates(newKeywords);
  };

  const handleShortlist = (candidateId) => {
    if (shortlisted.includes(candidateId)) {
      setShortlisted(shortlisted.filter((id) => id !== candidateId));
      toast.info('Removed from shortlist', {
        description: 'Candidate moved back to results.',
      });
    } else {
      setShortlisted([...shortlisted, candidateId]);
      toast.success('Added to shortlist', {
        description: 'Candidate has been shortlisted.',
      });
    }
  };

  const handleReject = (candidateId) => {
    setRejected([...rejected, candidateId]);
    if (selectedCandidate?.id === candidateId) {
      const remaining = candidates.filter((c) => c.id !== candidateId && !rejected.includes(c.id));
      setSelectedCandidate(remaining[0] || null);
    }
    toast.info('Candidate rejected', {
      description: 'Candidate has been hidden from results.',
    });
  };

  const handleSendInvite = () => {
    setSentInvites((prev) => prev + 1);
  };

  const handleRevealContact = () => {
    // In a real app, this would reveal contact info
  };

  const visibleCandidates = candidates.filter((c) => !rejected.includes(c.id));
  const displayedCandidates =
    activeTab === 'shortlisted'
      ? visibleCandidates.filter((c) => shortlisted.includes(c.id))
      : visibleCandidates;

  return (
    <Box sx={{ height: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header sentInvites={sentInvites} repliesReceived={repliesReceived} />

      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Column - Search Context (Independent Scroll) */}
        <Box
          component="aside"
          sx={{
            width: 320,
            borderRight: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            flexShrink: 0,
            display: { xs: 'none', lg: 'block' },
            overflowY: 'auto',
          }}
        >
          <SearchContextPanel
            prompt={prompt}
            keywords={keywords}
            onEditPrompt={handleEditPrompt}
            onUpdateKeywords={handleUpdateKeywords}
          />
        </Box>

        {/* Middle Column - Candidate Listing */}
        <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Tabs */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              px: 2,
              py: 1.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                onClick={() => setActiveTab('all')}
                variant={activeTab === 'all' ? 'contained' : 'text'}
                startIcon={<GroupIcon />}
                size="small"
              >
                All Results ({visibleCandidates.length})
              </Button>
              <Button
                onClick={() => setActiveTab('shortlisted')}
                variant={activeTab === 'shortlisted' ? 'contained' : 'text'}
                startIcon={<PersonAddIcon />}
                size="small"
              >
                Shortlisted ({shortlisted.length})
              </Button>
            </Box>
          </Box>

          {/* Candidate List */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            {isLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  py: 6,
                }}
              >
                <CircularProgress sx={{ mb: 2 }} />
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  Searching candidates...
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320, textAlign: 'center' }}>
                  We're searching across active and passive talent using AI.
                </Typography>
              </Box>
            ) : displayedCandidates.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  py: 6,
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <SearchIcon sx={{ fontSize: 32, color: 'text.secondary' }} />
                </Box>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  {activeTab === 'shortlisted' ? 'No shortlisted candidates' : 'No candidates found'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320, textAlign: 'center' }}>
                  {activeTab === 'shortlisted'
                    ? 'Start shortlisting candidates from the results to see them here.'
                    : 'Try adjusting your search keywords or prompt to find more candidates.'}
                </Typography>
              </Box>
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
          </Box>
        </Box>

        {/* Right Column - Candidate Profile (Independent Scroll) */}
        <Box
          component="aside"
          sx={{
            width: 384,
            borderLeft: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            flexShrink: 0,
            display: { xs: 'none', lg: 'block' },
            overflowY: 'auto',
          }}
        >
          {isLoadingProfile ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                p: 3,
              }}
            >
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Loading profile...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fetching complete candidate details.
              </Typography>
            </Box>
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                p: 3,
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <GroupIcon sx={{ fontSize: 32, color: 'text.secondary' }} />
              </Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Select a candidate
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Click on a candidate to view their full profile and take action.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchResults;
