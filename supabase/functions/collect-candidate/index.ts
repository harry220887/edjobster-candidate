import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Updated interfaces to match actual Coresignal API response structure
interface CoresignalEducation {
  degree?: string;
  institution_name?: string;
  date_from_year?: number;
  date_to_year?: number;
  description?: string;
}

interface CoresignalExperience {
  position_title?: string;  // Correct field name (not "title")
  company_name?: string;
  date_from?: string;       // "July 2019" format
  date_to?: string | null;  // null means current
  description?: string | null;
  location?: string;
  duration_months?: number;
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
  // Correct field names from actual API
  education?: CoresignalEducation[];
  experience?: CoresignalExperience[];
  inferred_skills?: string[];
  certifications?: CoresignalCertification[];
  industry?: string;
  primary_professional_email?: string | null;
  phone?: string | null;
  picture_url?: string;
  total_experience_duration_months?: number;
}

function formatDuration(dateFrom: string | undefined | null, dateTo: string | undefined | null): string {
  if (!dateFrom) return 'Unknown';
  
  const toFormatted = !dateTo ? 'Present' : dateTo;
  return `${dateFrom} - ${toFormatted}`;
}

function mapFullProfile(profile: CoresignalFullProfile) {
  // Log raw data for debugging
  console.log('Raw profile data:', {
    education_count: profile.education?.length ?? 0,
    experience_count: profile.experience?.length ?? 0,
    skills_count: profile.inferred_skills?.length ?? 0,
    certifications_count: profile.certifications?.length ?? 0,
    has_email: !!profile.primary_professional_email,
    has_phone: !!profile.phone,
  });

  // Map education - use correct field names
  const education = (profile.education || []).map(edu => ({
    degree: edu.degree || 'Degree',
    institution: edu.institution_name || 'Institution',
    year: edu.date_to_year 
      ? `${edu.date_from_year || ''} - ${edu.date_to_year}` 
      : String(edu.date_from_year || ''),
  }));

  // Map work history - use position_title (not title)
  const workHistory = (profile.experience || []).map(exp => ({
    title: exp.position_title || 'Role',
    company: exp.company_name || 'Company',
    duration: formatDuration(exp.date_from, exp.date_to),
    description: exp.description || '',
  }));

  // Extract skills - use inferred_skills (not member_skills)
  const skills = profile.inferred_skills || [];

  // Map certifications
  const certifications = (profile.certifications || [])
    .map(cert => cert.name)
    .filter((name): name is string => !!name);

  // Calculate experience years from total_experience_duration_months
  const experienceYears = profile.total_experience_duration_months 
    ? Math.round(profile.total_experience_duration_months / 12) 
    : 0;

  return {
    id: String(profile.id),
    name: profile.full_name || 'Unknown',
    photo: profile.picture_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`,
    title: profile.headline || 'Professional',
    experience: experienceYears,
    location: profile.location_full || profile.location_country || 'Unknown',
    lastActive: 'Recently',
    fitScore: 'good' as const,
    fitReason: 'Full profile loaded',
    education,
    workHistory,
    skills: skills.slice(0, 20),
    certifications,
    lastUpdated: new Date().toISOString().split('T')[0],
    professionalNetworkUrl: profile.professional_network_url,
    connectionsCount: profile.connections_count,
    companyIndustry: profile.industry,
    contactRevealed: false,
    // Only include real email/phone if available
    email: profile.primary_professional_email || undefined,
    phone: profile.phone || undefined,
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
