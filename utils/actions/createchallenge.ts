"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

interface challengedataType {
  name: string;
  type: string;
  status: string;
  difficulty: string;
  skills: string;
  level: string;
  tasks: string;
  displayImage: string;
  designImage: string;
  description: string;
  colors: string;
}

const createchallenge = async (challengedata: challengedataType) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("challenges")
    .insert(challengedata)
    .select();

  if (error) throw new Error("Something went wrong while uploading challenge");

  revalidatePath("/challenges");
  return data;
};

export default createchallenge;
