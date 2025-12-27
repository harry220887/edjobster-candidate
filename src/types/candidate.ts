export interface Candidate {
  id: string;
  name: string;
  photo: string;
  title: string;
  experience: number;
  location: string;
  lastActive: string;
  fitScore: 'best' | 'good' | 'partial' | 'not';
  fitReason: string;
  education: Education[];
  workHistory: WorkExperience[];
  skills: string[];
  certifications: string[];
  lastUpdated: string;
  email?: string;
  phone?: string;
  contactRevealed: boolean;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface ExtractedKeywords {
  jobTitles: string[];
  skills: string[];
  education: string[];
  experienceRange: string;
  location: string[];
}

export interface SearchState {
  prompt: string;
  keywords: ExtractedKeywords;
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  shortlisted: string[];
  rejected: string[];
  sentInvites: number;
  repliesReceived: number;
}
