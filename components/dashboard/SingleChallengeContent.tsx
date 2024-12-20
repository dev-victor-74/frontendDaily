"use client";

import { Challenges } from "@/utils/types";
import ChallengeCardHeader from "./challenge-card-header";
import Task from "./task";

interface SingleChallengeContentProps {
  data: Challenges;
  id: string;
  next_payment_date: Date | null;
  status: string;
  createdAt: Date;
}

const SingleChallengeContent = ({
  data,
  id,
  next_payment_date,
  status,
  createdAt,
}: SingleChallengeContentProps) => {
  return (
    <div className="w-full h-full">
      <ChallengeCardHeader challenge={data} challengeId={id} />

      <Task
        challengeId={data?.id}
        name={data?.name}
        challengeStatus={data?.status}
        tasks={data?.tasks}
        createdAt={createdAt}
        next_payment_date={next_payment_date}
        status={status}
      />
    </div>
  );
};

export default SingleChallengeContent;
