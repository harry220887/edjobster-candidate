import { supabase } from "@/integrations/supabase/client";
import { Candidate, ExtractedKeywords } from "@/types/candidate";

export async function searchCandidates(
  keywords: ExtractedKeywords,
  page: number = 1
): Promise<{ candidates: Candidate[]; page: number }> {
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
