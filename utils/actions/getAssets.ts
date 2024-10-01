import { createClient } from "../supabase/client";

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
