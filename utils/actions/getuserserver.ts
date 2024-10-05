import { createClient } from "../supabase/server";

const supabase = createClient();

export const getUserServer = async () => {
  const { data: user } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: dbUser } = await supabase
    .from("user")
    .select("*, customer(*)")
    .eq("id", user.user?.id)
    .single();
  if (!dbUser) return;

  return dbUser;
};
