"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export const favouriteChallenge = async (
  challengeId: string,
  userId: string | undefined
) => {
  const supabase = await createClient();

  const { error } = await supabase.from("favourites").insert({
    user_id: userId,
    challenge_id: challengeId,
  });

  if (error) {
    throw new Error("Failed to favourite");
  }
  revalidatePath("/challenges");
};

export const deleteChallenge = async (
  challengeId: string,
  userId: string | undefined
) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("favourites")
    .delete()
    .eq("challenge_id", challengeId)
    .eq("user_id", userId);
  if (error) {
    throw new Error("Failed to unfavourite");
  }
  revalidatePath("/challenges");
};

export const addTakenChallenge = async (challengeId: string) => {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user?.id) return;

  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.user.id)
    .eq("challenge_id", challengeId)
    .single();

  if (data) return;

  const { error } = await supabase.from("projects").insert({
    user_id: user.user.id,
    challenge_id: challengeId,
  });
  if (error) {
    console.log(error);
  }
};
