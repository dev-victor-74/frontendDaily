import TakenChallenges from "@/components/dashboard/TakenChallenges";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return redirect("/challenges");
  }

  return (
    <main className="w-full h-full px-2 md:px-4">
      <div className="w-full flex  flex-col gap-3 mt-5 items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#703cff] relative">
            <Image
              src={data.user?.user_metadata.avatar_url}
              fill
              alt="profile"
            />
          </div>
          <div className="flex flex-col gap-[2px] mt-2">
            <div className="text-sm font-bold text-zinc-800">
              {data.user?.user_metadata.user_name}
            </div>
            <div className="text-xs font-medium text-neutral-800">
              {data.user?.user_metadata.email}
            </div>
          </div>
        </div>
      </div>
      <TakenChallenges />
    </main>
  );
};

export default ProfilePage;
