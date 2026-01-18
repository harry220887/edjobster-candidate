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
  const mustConditions: unknown[] = [];
  
  // Job title match using match query (e.g., "English Teacher")
  if (keywords.jobTitles.length > 0) {
    mustConditions.push({
      match: {
        active_experience_title: keywords.jobTitles.join(' ')
      }
    });
  }
  
  // Education - NESTED query for degree (e.g., "B.Ed")
  if (keywords.education.length > 0) {
    mustConditions.push({
      nested: {
        path: "education",
        query: {
          match: {
            "education.degree": keywords.education.join(' ')
          }
        }
      }
    });
  }
  
  // Experience years - RANGE query on total_experience_duration_months
  if (keywords.experienceRange) {
    const yearsMatch = keywords.experienceRange.match(/(\d+)/);
    const years = yearsMatch ? parseInt(yearsMatch[1], 10) : 0;
    if (years > 0) {
      mustConditions.push({
        range: {
          total_experience_duration_months: {
            gte: years * 12  // Convert years to months
          }
        }
      });
    }
  }
  
  // Build nested experience query for skills (CBSE in company_name) and location
  const experienceNestedMust: unknown[] = [];
  
  // Search skills in company_name (e.g., "CBSE" in school names)
  if (keywords.skills.length > 0) {
    experienceNestedMust.push({
      query_string: {
        query: keywords.skills.join(' '),
        default_field: "experience.company_name",
        default_operator: "AND"
      }
    });
  }
  
  // Add location filtering within experience.location
  if (keywords.location.length > 0) {
    keywords.location.forEach(loc => {
      experienceNestedMust.push({
        match: {
          "experience.location": loc
        }
      });
    });
  }
  
  // Only add the nested query if we have conditions
  if (experienceNestedMust.length > 0) {
    mustConditions.push({
      nested: {
        path: "experience",
        query: {
          bool: {
            must: experienceNestedMust
          }
        }
      }
    });
  }
  
  // Location - search in main location fields
  if (keywords.location.length > 0) {
    // Match location_full for city/state
    const cityLocation = keywords.location.find(l => 
      !['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'China', 'Japan'].some(c => 
        l.toLowerCase() === c.toLowerCase()
      )
    );
    
    if (cityLocation) {
      mustConditions.push({
        match: { location_full: cityLocation }
      });
    }
    
    // Match location_country for country
    const country = keywords.location.find(l => 
      ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'China', 'Japan'].some(c => 
        l.toLowerCase() === c.toLowerCase()
      )
    );
    
    if (country) {
      mustConditions.push({
        match: { location_country: country }
      });
    }
  }
  
  // If no specific conditions, do a broad search
  if (mustConditions.length === 0) {
    mustConditions.push({
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
        must: mustConditions  // AND logic - all conditions must match
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

function generateMatchingAttributes(candidate: CoresignalCandidate, keywords: ExtractedKeywords): string[] {
  const attributes: string[] = [];

  // Check title/role match
  if (keywords.jobTitles.some(title => 
    candidate.active_experience_title?.toLowerCase().includes(title.toLowerCase())
  )) {
    attributes.push('Primary Role');
  }

  // Check location match
  if (keywords.location.some(loc => 
    candidate.location_full?.toLowerCase().includes(loc.toLowerCase())
  )) {
    attributes.push('Location Match');
  }

  // Check specific skills
  keywords.skills.forEach(skill => {
    if (candidate.headline?.toLowerCase().includes(skill.toLowerCase()) ||
        candidate.company_name?.toLowerCase().includes(skill.toLowerCase())) {
      attributes.push(skill);
    }
  });

  // Check education
  keywords.education.forEach(edu => {
    if (candidate.headline?.toLowerCase().includes(edu.toLowerCase())) {
      attributes.push(`${edu} Qualified`);
    }
  });

  return attributes.slice(0, 4); // Limit to 4 attributes
}

function mapToCandidate(candidate: CoresignalCandidate, keywords: ExtractedKeywords) {
  const fitScore = calculateFitScore(candidate._score);
  
  // Extract skills from headline
  const skills = candidate.headline
    ? candidate.headline.split(/[,|•·]/).map(s => s.trim()).filter(s => s.length > 0 && s.length < 30).slice(0, 6)
    : [];

  // Extract highest education from headline if available
  const educationKeywords = ['B.Ed', 'M.Ed', 'MA', 'BA', 'PhD', 'M.Phil', 'BBA', 'MBA'];
  let highestEducation = '';
  for (const edu of educationKeywords) {
    if (candidate.headline?.includes(edu)) {
      highestEducation = edu;
      break;
    }
  }

  // Generate matching attributes
  const matchingAttributes = generateMatchingAttributes(candidate, keywords);

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
    linkedinUrl: candidate.professional_network_url,
    connectionsCount: candidate.connections_count,
    companyIndustry: candidate.company_industry,
    contactRevealed: false,
    isViewed: false,
    highestEducation,
    resumeUrl: null, // Not available from API
    noticePeriod: null, // Not available from API
    matchingAttributes
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

    // Use the full search endpoint (returns IDs), then we can use preview for display
    // For now, keeping preview endpoint but with proper query structure
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

    const responseText = await response.text();
    console.log('Raw Coresignal API response:', responseText.substring(0, 2000));
    
    if (!response.ok) {
      console.error('Coresignal API error:', response.status, responseText);
      throw new Error(`Coresignal API error: ${response.status} - ${responseText}`);
    }

    const data = JSON.parse(responseText) as CoresignalCandidate[];
    console.log(`Received ${data.length} candidates from Coresignal`);
    console.log('First candidate sample:', JSON.stringify(data[0] || {}).substring(0, 1000));

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
