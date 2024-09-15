"use client";

import { Challenges } from "@/utils/types";
import ChallengeCard from "./challenge-card";

interface PageContentProps {
  challenges: Challenges[] | null;
}
const PageContent = ({ challenges }: PageContentProps) => {
  return (
    <div className="w-full py-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-5">
      {challenges?.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
};

export default PageContent;
