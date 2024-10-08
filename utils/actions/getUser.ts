"use server";

import { createClient } from "../supabase/server";

const supabase = createClient();

export const getUser = async (id: string | undefined) => {
  const { data: dbUser } = await supabase
    .from("user")
    .select()
    .eq("id", id)
    .single();
  if (!dbUser) return;

  return dbUser;
};
