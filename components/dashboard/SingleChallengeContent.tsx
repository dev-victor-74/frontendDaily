"use client";

import ChallengeCardHeader from "./challenge-card-header";
import ChallengeContent from "./challenge-content";
import Task from "./task";

interface SingleChallengeContentProps {
  data: any;
  id: string;
}

const SingleChallengeContent = ({ data, id }: SingleChallengeContentProps) => {
  return (
    <div className="w-full h-full">
      <ChallengeCardHeader challenge={data} challengeId={id} />

      {data?.challenge_pages && data?.challenge_pages.length ? (
        <ChallengeContent
          data={data?.challenge_pages}
          challengeType={data.type}
          challengeName={data.name}
        />
      ) : null}
      <Task challenge={data} />
    </div>
  );
};

export default SingleChallengeContent;
