import { Candidate, ExtractedKeywords } from '@/types/candidate';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    title: 'Senior English Teacher',
    experience: 7,
    location: 'Bangalore, Karnataka',
    lastActive: '2 days ago',
    fitScore: 'best',
    fitReason: 'Matched on role, experience, education (B.Ed), and location. Strong CBSE curriculum experience.',
    education: [
      { degree: 'B.Ed in English', institution: 'Bangalore University', year: '2016' },
      { degree: 'MA English Literature', institution: 'Christ University', year: '2014' }
    ],
    workHistory: [
      { title: 'Senior English Teacher', company: 'Delhi Public School, Bangalore', duration: '2019 - Present', description: 'Teaching English to grades 6-10, curriculum development, and mentoring junior teachers.' },
      { title: 'English Teacher', company: 'Kendriya Vidyalaya', duration: '2016 - 2019', description: 'Taught English language and literature to secondary students.' }
    ],
    skills: ['CBSE Curriculum', 'Classroom Management', 'Literature Analysis', 'Creative Writing', 'Student Assessment'],
    certifications: ['CELTA Certified', 'Google Educator Level 1'],
    lastUpdated: 'December 2024',
    contactRevealed: false
  },
  {
    id: '2',
    name: 'Rahul Menon',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    title: 'English & Communications Teacher',
    experience: 5,
    location: 'Bangalore, Karnataka',
    lastActive: '1 week ago',
    fitScore: 'good',
    fitReason: 'Strong experience match. B.Ed qualified. Minor gap in secondary school specific experience.',
    education: [
      { degree: 'B.Ed', institution: 'RV Teachers College', year: '2018' },
      { degree: 'BA English', institution: 'St. Joseph\'s College', year: '2016' }
    ],
    workHistory: [
      { title: 'English Teacher', company: 'National Public School', duration: '2020 - Present', description: 'Teaching English and Communications to middle school students.' },
      { title: 'Junior English Teacher', company: 'Vidya Niketan School', duration: '2018 - 2020', description: 'Primary and middle school English instruction.' }
    ],
    skills: ['English Grammar', 'Public Speaking', 'Debate Coaching', 'ESL Teaching', 'Digital Literacy'],
    certifications: ['TESOL Certified'],
    lastUpdated: 'November 2024',
    contactRevealed: false
  },
  {
    id: '3',
    name: 'Ananya Krishnan',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    title: 'English Language Educator',
    experience: 8,
    location: 'Mysore, Karnataka',
    lastActive: '3 days ago',
    fitScore: 'partial',
    fitReason: 'Excellent experience and qualifications. Location is Mysore, not Bangalore. Willing to relocate.',
    education: [
      { degree: 'B.Ed English', institution: 'University of Mysore', year: '2015' },
      { degree: 'MA English', institution: 'University of Mysore', year: '2013' }
    ],
    workHistory: [
      { title: 'Head of English Department', company: 'JSS Public School', duration: '2020 - Present', description: 'Leading English department, curriculum design, and teacher training.' },
      { title: 'Senior English Teacher', company: 'Mahajana High School', duration: '2015 - 2020', description: 'ICSE curriculum English teaching for grades 8-10.' }
    ],
    skills: ['Curriculum Design', 'Department Leadership', 'ICSE Curriculum', 'Teacher Training', 'Assessment Design'],
    certifications: ['Cambridge TKT', 'Microsoft Innovative Educator'],
    lastUpdated: 'December 2024',
    contactRevealed: false
  },
  {
    id: '4',
    name: 'Vikram Reddy',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    title: 'English Teacher',
    experience: 3,
    location: 'Bangalore, Karnataka',
    lastActive: '5 days ago',
    fitScore: 'partial',
    fitReason: 'Good location and education match. Experience is below the 5-year requirement.',
    education: [
      { degree: 'B.Ed', institution: 'Jain University', year: '2021' },
      { degree: 'BA English', institution: 'Mount Carmel College', year: '2019' }
    ],
    workHistory: [
      { title: 'English Teacher', company: 'Presidency School', duration: '2021 - Present', description: 'Teaching English to grades 5-8 in CBSE curriculum.' }
    ],
    skills: ['Creative Teaching', 'Technology Integration', 'Student Engagement', 'Drama in Education'],
    certifications: ['Google Educator Level 1'],
    lastUpdated: 'December 2024',
    contactRevealed: false
  },
  {
    id: '5',
    name: 'Meera Nair',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    title: 'Senior English Faculty',
    experience: 10,
    location: 'Chennai, Tamil Nadu',
    lastActive: '1 day ago',
    fitScore: 'not',
    fitReason: 'Excellent qualifications and experience, but located in Chennai. Not open to relocation.',
    education: [
      { degree: 'M.Ed', institution: 'University of Madras', year: '2014' },
      { degree: 'B.Ed English', institution: 'Loyola College', year: '2012' }
    ],
    workHistory: [
      { title: 'Senior English Faculty', company: 'Padma Seshadri School', duration: '2017 - Present', description: 'Teaching advanced English and preparing students for board exams.' },
      { title: 'English Teacher', company: 'DAV School Chennai', duration: '2014 - 2017', description: 'CBSE English instruction for secondary students.' }
    ],
    skills: ['Board Exam Preparation', 'Advanced Grammar', 'Literature Studies', 'Writing Workshops'],
    certifications: ['CELTA', 'IB Educator Certificate'],
    lastUpdated: 'December 2024',
    contactRevealed: false
  },
  {
    id: '6',
    name: 'Arjun Patel',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    title: 'English & Literature Teacher',
    experience: 6,
    location: 'Bangalore, Karnataka',
    lastActive: '4 hours ago',
    fitScore: 'best',
    fitReason: 'Perfect match on all criteria. B.Ed qualified, 6 years experience, Bangalore location, CBSE background.',
    education: [
      { degree: 'B.Ed', institution: 'Christ University', year: '2018' },
      { degree: 'MA English Literature', institution: 'Bangalore University', year: '2016' }
    ],
    workHistory: [
      { title: 'English Teacher', company: 'Bishop Cotton Boys School', duration: '2020 - Present', description: 'Teaching English literature and language to grades 9-12.' },
      { title: 'English Teacher', company: 'St. John\'s High School', duration: '2018 - 2020', description: 'ICSE English instruction for middle school.' }
    ],
    skills: ['Literature Analysis', 'Essay Writing', 'Public Speaking', 'Debate', 'Poetry'],
    certifications: ['Cambridge CELTA', 'IELTS Trainer Certified'],
    lastUpdated: 'December 2024',
    contactRevealed: false
  }
];

export const extractKeywordsFromPrompt = (prompt: string): ExtractedKeywords => {
  // Simulated AI keyword extraction
  const lowercasePrompt = prompt.toLowerCase();
  
  const keywords: ExtractedKeywords = {
    jobTitles: [],
    skills: [],
    education: [],
    experienceRange: '',
    location: []
  };

  // Extract job titles
  if (lowercasePrompt.includes('english teacher') || lowercasePrompt.includes('english')) {
    keywords.jobTitles.push('English Teacher');
  }
  if (lowercasePrompt.includes('senior')) {
    keywords.jobTitles.push('Senior Teacher');
  }
  if (lowercasePrompt.includes('montessori')) {
    keywords.jobTitles.push('Montessori Teacher');
  }
  if (lowercasePrompt.includes('sales')) {
    keywords.jobTitles.push('Sales Professional');
  }

  // Extract education
  if (lowercasePrompt.includes('b.ed') || lowercasePrompt.includes('bed')) {
    keywords.education.push('B.Ed');
  }
  if (lowercasePrompt.includes('m.ed')) {
    keywords.education.push('M.Ed');
  }

  // Extract skills - use clean terms for API
  if (lowercasePrompt.includes('cbse')) {
    keywords.skills.push('CBSE');
  }
  if (lowercasePrompt.includes('icse')) {
    keywords.skills.push('ICSE');
  }
  if (lowercasePrompt.includes('secondary') || lowercasePrompt.includes('middle school')) {
    keywords.skills.push('Secondary Education');
  }
  if (lowercasePrompt.includes('saas')) {
    keywords.skills.push('SaaS Experience');
  }

  // Extract experience
  const expMatch = prompt.match(/(\d+)[-–](\d+)\s*years?/i) || prompt.match(/(\d+)\+?\s*years?/i);
  if (expMatch) {
    keywords.experienceRange = expMatch[0];
  }

  // Extract location - expanded Indian cities
  const indianCities = [
    'lucknow', 'bangalore', 'bengaluru', 'mumbai', 'delhi', 'new delhi',
    'chennai', 'hyderabad', 'kolkata', 'pune', 'ahmedabad', 'jaipur',
    'chandigarh', 'noida', 'gurugram', 'gurgaon', 'mysore', 'mysuru',
    'kochi', 'thiruvananthapuram', 'indore', 'bhopal', 'nagpur', 'patna',
    'varanasi', 'agra', 'surat', 'vadodara', 'coimbatore', 'visakhapatnam'
  ];
  
  indianCities.forEach(city => {
    if (lowercasePrompt.includes(city)) {
      // Capitalize first letter
      const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
      // Handle special cases
      if (city === 'bengaluru') {
        keywords.location.push('Bangalore');
      } else if (city === 'mysuru') {
        keywords.location.push('Mysore');
      } else if (city === 'new delhi') {
        keywords.location.push('New Delhi');
      } else {
        keywords.location.push(capitalizedCity);
      }
    }
  });
  
  // Also try to extract city from "in X, India" pattern
  const locationMatch = prompt.match(/in\s+([A-Z][a-z]+),?\s*India/i);
  if (locationMatch && !keywords.location.some(l => l.toLowerCase() === locationMatch[1].toLowerCase())) {
    keywords.location.push(locationMatch[1]);
  }
  
  if (lowercasePrompt.includes('india')) {
    keywords.location.push('India');
  }

  return keywords;
};
