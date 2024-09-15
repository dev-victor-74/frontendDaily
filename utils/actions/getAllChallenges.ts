import { createClient } from "../supabase/server";

export const getAllChallenges = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return null;
  }

  return data;
};
