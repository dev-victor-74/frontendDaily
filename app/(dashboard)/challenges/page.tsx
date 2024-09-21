"use client";

import ChallengeHeading from "@/components/dashboard/challenge-heading";
import PageContent from "@/components/dashboard/page-content";
import SkeletonLoader from "@/components/dashboard/skeleton-loader";
import { Button } from "@/components/ui/button";
import { getAllChallenges } from "@/utils/actions/getAllChallenges";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const ChallegePage = () => {
  const params = useSearchParams();
  const filter = params.get("filter");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["challenges"],
    queryFn: getAllChallenges,
  });

  const filteredChallengeData = useMemo(() => {
    if (!filter || filter === "all") return data;
    if (data && filter) {
      const filteredChallenges = data.filter(
        (challenge) =>
          challenge.difficulty.toLowerCase().includes(filter.toLowerCase()) ||
          challenge.level.toLowerCase().includes(filter.toLowerCase())
      );
      return filteredChallenges;
    }
  }, [filter, data]);

  return (
    <main className="w-full h-full pl-0 md:pl-3">
      <ChallengeHeading />
      {isLoading ? (
        <div className="w-full py-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="w-full flex flex-col items-center justify-center gap-2 h-[500px] mt-5">
          <div className=" relative w-[200px] h-[230px]">
            <Image src="/errorstate1.svg" alt="Error" fill sizes="200px" />
          </div>
          <div className=" text-sm font-normal text-zinc-800 text-center">
            Something went wrong
          </div>
          <Button
            variant="ghost"
            onClick={() => refetch()}
            className=" text-xs font-medium rounded-sm ring-1 ring-[#212122]"
          >
            Retry
          </Button>
        </div>
      ) : data && filteredChallengeData ? (
        <PageContent challenges={filteredChallengeData} />
      ) : null}
    </main>
  );
};

export default ChallegePage;
