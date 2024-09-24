import { createClient } from "../supabase/client";
import { Challenges } from "../types";

export const getAllChallenges = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return null;
  }

  return data as Challenges[];
};

export const getAllAssets = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("asset")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return null;
  }

  return data;
};
