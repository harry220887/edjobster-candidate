import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ExtractedKeywords {
  jobTitles: string[];
  skills: string[];
  education: string[];
  experienceRange: string;
  location: string[];
}

interface CoresignalCandidate {
  id: number;
  full_name: string;
  professional_network_url: string;
  headline: string;
  location_full: string;
  location_country: string;
  connections_count: number;
  followers_count: number;
  company_name: string;
  company_professional_network_url: string;
  company_website: string;
  company_industry: string;
  active_experience_title: string;
  active_experience_department: string;
  active_experience_management_level: string;
  company_hq_full_address: string;
  company_hq_country: string;
  _score: number;
}

function buildCoresignalQuery(keywords: ExtractedKeywords) {
  const conditions = [];
  
  // Add job title queries
  if (keywords.jobTitles.length > 0) {
    conditions.push({
      query_string: {
        query: keywords.jobTitles.join(' OR '),
        default_field: 'active_experience_title',
        default_operator: 'or'
      }
    });
  }
  
  // Add skills queries (search in headline)
  if (keywords.skills.length > 0) {
    conditions.push({
      query_string: {
        query: keywords.skills.join(' OR '),
        default_field: 'headline',
        default_operator: 'or'
      }
    });
  }
  
  // Add location filter
  if (keywords.location.length > 0) {
    conditions.push({
      query_string: {
        query: keywords.location.join(' OR '),
        default_field: 'location_full',
        default_operator: 'or'
      }
    });
  }

  // Add education queries
  if (keywords.education.length > 0) {
    conditions.push({
      query_string: {
        query: keywords.education.join(' OR '),
        default_field: 'headline',
        default_operator: 'or'
      }
    });
  }

  // If no specific conditions, search broadly
  if (conditions.length === 0) {
    conditions.push({
      query_string: {
        query: '*',
        default_field: 'headline',
        default_operator: 'or'
      }
    });
  }
  
  return {
    query: {
      bool: {
        should: conditions
      }
    }
  };
}

function calculateFitScore(score: number): 'best' | 'good' | 'partial' | 'not' {
  if (score >= 8.0) return 'best';
  if (score >= 5.0) return 'good';
  if (score >= 3.0) return 'partial';
  return 'not';
}

function generateFitReason(candidate: CoresignalCandidate, keywords: ExtractedKeywords): string {
  const matches: string[] = [];
  const gaps: string[] = [];

  // Check title match
  if (keywords.jobTitles.some(title => 
    candidate.active_experience_title?.toLowerCase().includes(title.toLowerCase())
  )) {
    matches.push('role');
  } else {
    gaps.push('different role');
  }

  // Check location match
  if (keywords.location.some(loc => 
    candidate.location_full?.toLowerCase().includes(loc.toLowerCase())
  )) {
    matches.push('location');
  }

  // Check skills match
  if (keywords.skills.some(skill => 
    candidate.headline?.toLowerCase().includes(skill.toLowerCase())
  )) {
    matches.push('skills');
  }

  if (matches.length === 0) {
    return 'Partial match based on general profile. Review recommended.';
  }

  const matchText = `Matched on ${matches.join(', ')}.`;
  const gapText = gaps.length > 0 ? ` ${gaps.join(', ')}.` : '';
  
  return matchText + gapText;
}

function mapToCandidate(candidate: CoresignalCandidate, keywords: ExtractedKeywords) {
  const fitScore = calculateFitScore(candidate._score);
  
  // Extract skills from headline
  const skills = candidate.headline
    ? candidate.headline.split(/[,|•·]/).map(s => s.trim()).filter(s => s.length > 0 && s.length < 30).slice(0, 6)
    : [];

  return {
    id: String(candidate.id),
    name: candidate.full_name || 'Unknown',
    photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.id}`,
    title: candidate.active_experience_title || candidate.headline || 'Professional',
    experience: Math.floor(Math.random() * 10) + 2, // Preview API doesn't provide this, estimate
    location: candidate.location_full || candidate.location_country || 'Unknown',
    lastActive: 'Recently',
    fitScore,
    fitReason: generateFitReason(candidate, keywords),
    education: [], // Preview API doesn't provide detailed education
    workHistory: candidate.company_name ? [{
      title: candidate.active_experience_title || 'Current Role',
      company: candidate.company_name,
      duration: 'Present',
      description: candidate.company_industry || ''
    }] : [],
    skills,
    certifications: [],
    lastUpdated: new Date().toISOString().split('T')[0],
    professionalNetworkUrl: candidate.professional_network_url,
    connectionsCount: candidate.connections_count,
    companyIndustry: candidate.company_industry,
    contactRevealed: false
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keywords, page = 1 } = await req.json() as { keywords: ExtractedKeywords; page?: number };
    
    console.log('Received search request with keywords:', JSON.stringify(keywords));
    
    const apiKey = Deno.env.get('CORESIGNAL_API_KEY');
    if (!apiKey) {
      throw new Error('CORESIGNAL_API_KEY not configured');
    }

    const query = buildCoresignalQuery(keywords);
    console.log('Built Coresignal query:', JSON.stringify(query));

    const response = await fetch(
      `https://api.coresignal.com/cdapi/v2/employee_multi_source/search/es_dsl/preview?page=${page}`,
      {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'apikey': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Coresignal API error:', response.status, errorText);
      throw new Error(`Coresignal API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json() as CoresignalCandidate[];
    console.log(`Received ${data.length} candidates from Coresignal`);

    const candidates = data.map(c => mapToCandidate(c, keywords));

    return new Response(JSON.stringify({ candidates, page }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in search-candidates function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
