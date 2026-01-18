import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../components/Header';
import CandidateCard from '../components/CandidateCard';
import CandidateProfile from '../components/CandidateProfile';

// Mock viewed candidates data
const mockViewedCandidates = [
  {
    id: 'v1',
    name: 'Priya Sharma',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    title: 'Senior English Teacher',
    experience: 7,
    location: 'Bangalore, Karnataka',
    lastActive: '2 days ago',
    fitScore: 'best',
    fitReason: 'Matched on role, experience, education (B.Ed), and location.',
    education: [
      { degree: 'B.Ed in English', institution: 'Bangalore University', year: '2016' },
      { degree: 'MA English Literature', institution: 'Christ University', year: '2014' }
    ],
    workHistory: [
      { title: 'Senior English Teacher', company: 'Delhi Public School, Bangalore', duration: '2019 - Present', description: 'Teaching English to grades 6-10.' },
      { title: 'English Teacher', company: 'Kendriya Vidyalaya', duration: '2016 - 2019', description: 'Taught English to secondary students.' }
    ],
    skills: ['CBSE Curriculum', 'Classroom Management', 'Literature Analysis'],
    certifications: ['CELTA Certified', 'Google Educator Level 1'],
    lastUpdated: 'December 2024',
    contactRevealed: false,
    isViewed: true,
    linkedinUrl: 'https://linkedin.com/in/priya-sharma',
    matchingAttributes: ['Primary Role', 'CBSE', 'Location Match'],
    highestEducation: 'B.Ed in English',
  },
  {
    id: 'v2',
    name: 'Rahul Menon',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    title: 'English & Communications Teacher',
    experience: 5,
    location: 'Bangalore, Karnataka',
    lastActive: '1 week ago',
    fitScore: 'good',
    fitReason: 'Strong experience match. B.Ed qualified.',
    education: [
      { degree: 'B.Ed', institution: 'RV Teachers College', year: '2018' },
      { degree: 'BA English', institution: "St. Joseph's College", year: '2016' }
    ],
    workHistory: [
      { title: 'English Teacher', company: 'National Public School', duration: '2020 - Present', description: 'Teaching English to middle school.' },
    ],
    skills: ['English Grammar', 'Public Speaking', 'Debate Coaching'],
    certifications: ['TESOL Certified'],
    lastUpdated: 'November 2024',
    contactRevealed: false,
    isViewed: true,
    linkedinUrl: 'https://linkedin.com/in/rahul-menon',
    matchingAttributes: ['B.Ed Qualified', 'Location Match'],
    highestEducation: 'B.Ed',
  },
  {
    id: 'v3',
    name: 'Arjun Patel',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    title: 'English & Literature Teacher',
    experience: 6,
    location: 'Bangalore, Karnataka',
    lastActive: '4 hours ago',
    fitScore: 'best',
    fitReason: 'Perfect match on all criteria.',
    education: [
      { degree: 'B.Ed', institution: 'Christ University', year: '2018' },
      { degree: 'MA English Literature', institution: 'Bangalore University', year: '2016' }
    ],
    workHistory: [
      { title: 'English Teacher', company: 'Bishop Cotton Boys School', duration: '2020 - Present', description: 'Teaching English to grades 9-12.' },
    ],
    skills: ['Literature Analysis', 'Essay Writing', 'Public Speaking'],
    certifications: ['Cambridge CELTA', 'IELTS Trainer Certified'],
    lastUpdated: 'December 2024',
    contactRevealed: false,
    isViewed: true,
    linkedinUrl: 'https://linkedin.com/in/arjun-patel',
    resumeUrl: 'https://example.com/resume.pdf',
    matchingAttributes: ['Primary Role', 'CBSE', 'B.Ed Qualified', 'Location Match'],
    highestEducation: 'B.Ed',
    noticePeriod: '30 days',
  },
  {
    id: 'v4',
    name: 'Ananya Krishnan',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    title: 'English Language Educator',
    experience: 8,
    location: 'Mysore, Karnataka',
    lastActive: '3 days ago',
    fitScore: 'partial',
    fitReason: 'Excellent experience. Location is Mysore, not Bangalore.',
    education: [
      { degree: 'B.Ed English', institution: 'University of Mysore', year: '2015' },
    ],
    workHistory: [
      { title: 'Head of English Department', company: 'JSS Public School', duration: '2020 - Present', description: 'Leading English department.' },
    ],
    skills: ['Curriculum Design', 'Department Leadership', 'ICSE Curriculum'],
    certifications: ['Cambridge TKT'],
    lastUpdated: 'December 2024',
    contactRevealed: false,
    isViewed: true,
    linkedinUrl: 'https://linkedin.com/in/ananya-krishnan',
    matchingAttributes: ['B.Ed Qualified', 'Experience Match'],
    highestEducation: 'B.Ed English',
  },
];

const ITEMS_PER_PAGE = 6;

const ViewedProfiles = () => {
  const [page, setPage] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [shortlisted, setShortlisted] = useState([]);

  const totalPages = Math.ceil(mockViewedCandidates.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const displayedCandidates = mockViewedCandidates.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleShortlist = (candidateId) => {
    setShortlisted((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Header sentInvites={12} repliesReceived={4} />

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 4 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3, color: 'text.primary' }}>
          Viewed Profiles
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          These are the candidate profiles you have previously viewed and are saved in the system.
        </Typography>

        {/* Candidate Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {displayedCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedCandidate?.id === candidate.id}
              onSelect={() => setSelectedCandidate(candidate)}
              onShortlist={() => handleShortlist(candidate.id)}
              onReject={() => {}}
              isShortlisted={shortlisted.includes(candidate.id)}
            />
          ))}
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Box>
        )}
      </Box>

      {/* Profile Side-Sheet Drawer */}
      <Drawer
        anchor="right"
        open={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 480, md: 520 } },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setSelectedCandidate(null)}>
            <CloseIcon />
          </IconButton>
        </Box>
        {selectedCandidate && (
          <Box sx={{ px: 2, pb: 3 }}>
            <CandidateProfile
              candidate={selectedCandidate}
              onRevealContact={() => {}}
              isContactRevealed={selectedCandidate.contactRevealed}
            />
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default ViewedProfiles;
