"use client";

import { Challenges } from "@/utils/types";
import { twMerge } from "tailwind-merge";

interface ColorMapProps {
  challenge: Challenges;
}

const ButtonColorMap = ({ challenge }: ColorMapProps) => {
  if (!challenge) return;
  return (
    <div className="w-full flex items-center justify-between mt-2 ">
      <div className="flex items-center flex-wrap gap-2">
        <div
          className={twMerge(
            "w-max py-[2px] px-1  font-semibold rounded-[2px] text-center text-xs ring-1 ring-[#a789f8] text-zinc-200",
            challenge?.level === "beginner"
              ? "text-green-700"
              : challenge?.level === "intermediate"
              ? "text-rose-800"
              : "text-rose-950"
          )}
        >
          {challenge?.level?.toUpperCase()}
        </div>
        <div
          className={twMerge(
            "w-max px-[6px] py-[2px] font-semibold rounded-[2px] text-center text-xs ring-1 ring-[#a789f8] text-zinc-200",
            challenge?.difficulty === "easy"
              ? "text-lime-800"
              : challenge?.difficulty === "medium"
              ? "text-orange-600"
              : "text-rose-600"
          )}
        >
          {challenge?.difficulty?.toUpperCase()}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {challenge?.skills?.split(",").map((skill, i) => (
          <div
            key={i}
            className={twMerge(
              "text-xs font-semibold rounded-[2px] uppercase p-[2px] px-1 ring-1 ring-[#a789f8]",
              skill === "js"
                ? "text-yellow-600"
                : skill === "css"
                ? "text-blue-800"
                : "text-rose-700"
            )}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonColorMap;
