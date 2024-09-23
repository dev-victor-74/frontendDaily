import ChallengeCard from "@/components/dashboard/challenge-card";
import { getFavouriteChallenges } from "@/utils/actions/getFavourites";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const FavourPage = async () => {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  if (data.user === null) {
    return redirect("/challenges");
  }

  const challenges = await getFavouriteChallenges();

  if (!challenges?.length)
    return (
      <div className="w-full h-[calc(100vh-55px)] flex flex-col items-center justify-center">
        <h2 className="text-xl md:text-3xl font-bold text-neutral-900 md:font-extrabold">
          Favourites
        </h2>
        <h2 className="text-sm font-semibold text-zinc-600 text-center">
          No Favourite challenge
        </h2>
      </div>
    );

  return (
    <main className=" px-1 md:px-2 py-1 md:py-3 ">
      <h2 className="text-xl md:text-3xl font-bold text-neutral-900 md:font-extrabold">
        Favourites
      </h2>
      <div
        className="w-full py-2  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4
         mt-5"
      >
        {challenges?.map((challenge: any) => (
          <ChallengeCard
            key={challenge.challenges.id}
            challenge={challenge.challenges}
          />
        ))}
      </div>
    </main>
  );
};

export default FavourPage;
