import TakenChallenges from "@/components/dashboard/TakenChallenges";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

const ProfilePage = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return (
      <div className=" w-full items-center justify-center mt-20">
        <div className=" text-xl md:text-2xl font-semibold md:font-bold text-center text-neutral-800">
          Looks like you are not logged in
        </div>
        <div className=" text-sm font-semibold text-neutral-700 text-center">
          Sign to view your profile
        </div>
      </div>
    );
  }

  return (
    <main className="w-full h-full px-1 md:px-2">
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
