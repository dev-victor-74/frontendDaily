"use server";

import { createClient } from "../supabase/server";

export const getUser = async (id: string | undefined) => {
  const supabase = await createClient();
  const { data: dbUser } = await supabase
    .from("user")
    .select()
    .eq("id", id)
    .single();
  if (!dbUser) return;

  return dbUser;
};
