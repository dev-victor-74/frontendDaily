"use client";

import { ChallengePages } from "@/utils/types";
// import Image from "next/image";

interface ChallengeContentProps {
  data: ChallengePages[];
  challengeType: string;
  challengeName: string;
}

const ChallengeContent = ({
  data,
  challengeType,
  challengeName,
}: ChallengeContentProps) => {
  return (
    <div className="w-full md:w-[100%] mx-auto h-full mb-4 rounded-sm flex flex-col items-center p-[2px] ring-1 ring-[#c3b3f0] mt-5">
      <div className="w-full px-3">
        <h2 className=" text-sm font-semibold md:text-lg md:font-bold text-zinc-800 mt-1">
          {challengeType.toLowerCase() === "multicard"
            ? `${challengeName} Variants`
            : "Other Pages"}
        </h2>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 px-2 pb-3">
        {data?.map((page) => (
          <div
            key={page?.id}
            className="w-full cursor-pointer z-10 p-[1px] overflow-hidden relative rounded-sm ring-1 ring-[#beb2df] flex flex-col gap-2 hover:scale-[1.01] transition"
          >
            <div className=" absolute w-full z-20 h-full top-0 right-0 bg-transparent" />
            <div className="w-full h-[250px] relative rounded-sm overflow-hidden">
              {/* <Image fill src={page?.display_path} alt={page.name} /> */}
              <img
                src={page?.display_path}
                alt={page.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-sm font-semibold text-zinc-800 px-2 truncate">
              {challengeType.toLowerCase() === "multipage" ? page?.name : ""}
            </div>
          </div>
        ))}
      </div>
      <div className=""></div>
    </div>
  );
};

export default ChallengeContent;
