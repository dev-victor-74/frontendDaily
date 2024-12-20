"use server";
import { createClient } from "../supabase/server";
import { TakenChallengesTypes } from "../types";

export const getFavouriteChallenges = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) return;

  const { data: favourites } = await supabase
    .from("favourites")
    .select("*, challenges(*)")
    .eq("user_id", data.user?.id);
  return favourites as TakenChallengesTypes[];
};

export const getTakenChallenges = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return;

  const { data: takenChallenges } = await supabase
    .from("projects")
    .select("*, challenges(*)")
    .eq("user_id", data.user?.id);
  return takenChallenges as TakenChallengesTypes[];
};
