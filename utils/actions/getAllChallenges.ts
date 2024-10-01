import { createClient } from "../supabase/server";
import { Challenges } from "../types";

export const getAllChallenges = async (filter: string | undefined) => {
  const supabase = createClient();

  if (!filter) {
    const { data, error } = await supabase
      .from("challenges")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return null;
    }
    return data as Challenges[];
  } else {
    const { data, error } = await supabase
      .from("challenges")
      .select("*")
      .eq("level", filter)
      .order("created_at", { ascending: false });

    if (error) {
      return null;
    }
    return data as Challenges[];
  }
};
