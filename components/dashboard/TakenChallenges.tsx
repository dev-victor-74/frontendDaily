import ChallengeCard from "./challenge-card";
import { getTakenChallenges } from "@/utils/actions/getFavourites";

const TakenChallenges = async () => {
  const challenges = await getTakenChallenges();

  return (
    <div className="w-full flex flex-col mt-5">
      <div className="w-full bg-slate-100 px-2 py-2 rounded-sm shadow-sm">
        <h2 className="text-xl md:text-3xl font-bold text-neutral-900 md:font-extrabold">
          Challenges Taken
        </h2>
      </div>
      {challenges?.length === 0 ? (
        <div className="w-full flex h-[200px] mt-8 items-center justify-center">
          <h3 className="text-center text-sm font-bold text-zinc-800">
            You have not taken any challenge
          </h3>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
          {challenges?.map((challenge: any) => (
            <ChallengeCard
              challenge={challenge.challenges}
              key={challenge.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TakenChallenges;
