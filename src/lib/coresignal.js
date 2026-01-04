import { supabase } from "@/integrations/supabase/client";

export async function searchCandidates(keywords, page = 1) {
  const { data, error } = await supabase.functions.invoke('search-candidates', {
    body: { keywords, page },
  });

  if (error) {
    console.error('Error searching candidates:', error);
    throw new Error(error.message || 'Failed to search candidates');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return {
    candidates: data.candidates || [],
    page: data.page || 1,
  };
}

export async function collectCandidate(employeeId) {
  const { data, error } = await supabase.functions.invoke('collect-candidate', {
    body: { employeeId },
  });

  if (error) {
    console.error('Error collecting candidate:', error);
    throw new Error(error.message || 'Failed to collect candidate profile');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data.candidate;
}
