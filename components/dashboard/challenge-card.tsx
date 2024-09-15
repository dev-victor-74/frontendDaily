"use client";

import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Challenges } from "@/utils/types";
import Image from "next/image";
import ButtonColorMap from "./button-color-map";
import LikeButton from "./like-button";

interface ChallengeCardProps {
  challenge: Challenges;
}

const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  return (
    <div className="w-full md:max-w-[400px] rounded-[2px] ring-2 ring-[#d1c6e7] overflow-hidden">
      <Card className="rounded-sm overflow-hidden hover:scale-[1.01] transition duration-300">
        <CardContent className="flex p-0 justify-center items-center h-fit pb-2">
          <div className="w-full h-full flex flex-col">
            <Link
              href={`/challenges/${challenge?.id}`}
              className="p-0 relative"
            >
              <div className="relative w-[350px] bg-slate-300 sm:w-[100%] mx-auto h-[270px] rounded-[2px] overflow-hidden aspect-square">
                <div className=" absolute h-[270px] w-[350px] bg-transparent z-30" />
                <Image
                  fill
                  src={challenge?.displayImage}
                  alt={challenge?.name}
                />
              </div>
            </Link>
            <div className="w-full flex flex-col px-2 cursor-pointer mt-2 gap-2">
              <div className="w-full flex items-center justify-between mt-2">
                <div className="text-lg font-semibold text-zinc-900">
                  {challenge?.name}
                </div>
                <LikeButton challengeId={challenge?.id} />
              </div>
              <ButtonColorMap challenge={challenge && challenge} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengeCard;
