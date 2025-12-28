import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CoresignalEducation {
  title?: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

interface CoresignalExperience {
  title?: string;
  company_name?: string;
  date_from?: string;
  date_to?: string;
  description?: string;
  location?: string;
}

interface CoresignalCertification {
  name?: string;
  authority?: string;
  date_issued?: string;
}

interface CoresignalFullProfile {
  id: number;
  full_name: string;
  professional_network_url?: string;
  headline?: string;
  location_full?: string;
  location_country?: string;
  connections_count?: number;
  follower_count?: number;
  summary?: string;
  member_education?: CoresignalEducation[];
  member_experience?: CoresignalExperience[];
  member_skills?: string[];
  member_certifications?: CoresignalCertification[];
  industry?: string;
  email?: string;
  phone?: string;
  profile_picture?: string;
}

function calculateExperienceYears(experiences: CoresignalExperience[] | undefined): number {
  if (!experiences || experiences.length === 0) return 0;
  
  let totalMonths = 0;
  const now = new Date();
  
  for (const exp of experiences) {
    if (!exp.date_from) continue;
    
    // Parse dates like "2020-01" or "2020"
    const fromParts = exp.date_from.split('-');
    const fromYear = parseInt(fromParts[0]);
    const fromMonth = parseInt(fromParts[1] || '1');
    
    let toYear: number, toMonth: number;
    if (!exp.date_to || exp.date_to.toLowerCase().includes('present')) {
      toYear = now.getFullYear();
      toMonth = now.getMonth() + 1;
    } else {
      const toParts = exp.date_to.split('-');
      toYear = parseInt(toParts[0]);
      toMonth = parseInt(toParts[1] || '12');
    }
    
    if (!isNaN(fromYear) && !isNaN(toYear)) {
      const months = (toYear - fromYear) * 12 + (toMonth - fromMonth);
      if (months > 0) totalMonths += months;
    }
  }
  
  return Math.round(totalMonths / 12);
}

function formatDuration(dateFrom: string | undefined, dateTo: string | undefined): string {
  if (!dateFrom) return 'Unknown';
  
  const fromFormatted = dateFrom.substring(0, 7); // "2020-01" format
  const toFormatted = !dateTo || dateTo.toLowerCase().includes('present') 
    ? 'Present' 
    : dateTo.substring(0, 7);
    
  return `${fromFormatted} - ${toFormatted}`;
}

function mapFullProfile(profile: CoresignalFullProfile) {
  // Map education
  const education = (profile.member_education || []).map(edu => ({
    degree: edu.title || 'Degree',
    institution: edu.subtitle || 'Institution',
    year: edu.date || '',
  }));

  // Map work history
  const workHistory = (profile.member_experience || []).map(exp => ({
    title: exp.title || 'Role',
    company: exp.company_name || 'Company',
    duration: formatDuration(exp.date_from, exp.date_to),
    description: exp.description || '',
  }));

  // Extract skills
  const skills = profile.member_skills || [];

  // Map certifications
  const certifications = (profile.member_certifications || [])
    .map(cert => cert.name)
    .filter((name): name is string => !!name);

  // Calculate experience years from work history
  const experienceYears = calculateExperienceYears(profile.member_experience);

  return {
    id: String(profile.id),
    name: profile.full_name || 'Unknown',
    photo: profile.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`,
    title: profile.headline || 'Professional',
    experience: experienceYears,
    location: profile.location_full || profile.location_country || 'Unknown',
    lastActive: 'Recently',
    fitScore: 'good' as const, // Will be updated from preview data
    fitReason: 'Full profile loaded',
    education,
    workHistory,
    skills: skills.slice(0, 20), // Limit to 20 skills
    certifications,
    lastUpdated: new Date().toISOString().split('T')[0],
    professionalNetworkUrl: profile.professional_network_url,
    connectionsCount: profile.connections_count,
    companyIndustry: profile.industry,
    contactRevealed: false,
    email: profile.email,
    phone: profile.phone,
    summary: profile.summary,
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { employeeId } = await req.json() as { employeeId: string };
    
    if (!employeeId) {
      throw new Error('employeeId is required');
    }
    
    console.log('Collecting full profile for employee:', employeeId);
    
    const apiKey = Deno.env.get('CORESIGNAL_API_KEY');
    if (!apiKey) {
      throw new Error('CORESIGNAL_API_KEY not configured');
    }

    const response = await fetch(
      `https://api.coresignal.com/cdapi/v2/employee_multi_source/collect/${employeeId}`,
      {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'apikey': apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Coresignal Collect API error:', response.status, errorText);
      throw new Error(`Coresignal API error: ${response.status} - ${errorText}`);
    }

    const profile = await response.json() as CoresignalFullProfile;
    console.log('Received full profile for:', profile.full_name);

    const candidate = mapFullProfile(profile);

    return new Response(JSON.stringify({ candidate }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in collect-candidate function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
