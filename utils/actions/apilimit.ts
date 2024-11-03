"use server";

import { createClient } from "../supabase/server";

export const createApiLimit = async (userId: string, email: string) => {
  const supabase = await createClient();
  const { data: userApiLimit } = await supabase
    .from("user_api_limit")
    .select("*")
    .eq("user_id", userId);

  if (!userApiLimit?.length) {
    await supabase.from("user_api_limit").insert({
      user_id: userId,
      email,
      count: 1,
      last_reset_date: new Date(),
    });
  }
};

export const increaseApilimit = async (userId: string, email: string) => {
  const supabase = await createClient();

  const { data: userApiLimit, error } = await supabase
    .from("user_api_limit")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error("Erroorr");
  }

  const count = userApiLimit[0].count;

  const { data, error: updateError } = await supabase
    .from("user_api_limit")
    .update({ count: count + 1 })
    .eq("email", email)
    .select();

  return data;
};

export const ResetApiLimit = async (email: string) => {
  const supabase = await createClient();

  await supabase
    .from("user_api_limit")
    .update({
      count: 0,
      last_reset_date: new Date(),
    })
    .eq("email", email);
};
