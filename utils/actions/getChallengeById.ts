import { createClient } from "../supabase/server";

export const getChallengeById = async (challengId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("challenges")
    .select("*, challenge_pages(*)")
    .eq("id", challengId)
    .single();

  if (error) {
    return null;
  }

  return data;
};
