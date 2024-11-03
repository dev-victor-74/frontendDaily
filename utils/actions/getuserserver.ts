import { createClient } from "../supabase/server";

export const getUserServer = async () => {
  const supabase = await createClient();
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
