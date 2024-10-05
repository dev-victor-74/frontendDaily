"use client";

import React, { useEffect } from "react";
import ButtonColorMap from "./button-color-map";
import Image from "next/image";
import { ChallengeDataStore, modalStore } from "@/lib/store/modal-store";
import { Challenges, PageProps } from "@/utils/types";
import { Expand } from "lucide-react";
import { Button } from "../ui/button";
import ToolTipProvider from "./ToolTip-Provider";
import { cn } from "@/lib/utils";
import LikeButton from "./like-button";

interface ChallengeCardHeaderProps {
  challenge: Challenges;
  challengeId: string;
}

const ChallengeCardHeader = ({
  challenge,
  challengeId,
}: ChallengeCardHeaderProps) => {
  const { onAdd, onClear } = ChallengeDataStore();
  const { onOpen } = modalStore();

  const handleOpenChallengeModal = () => {
    onClear();

    onAdd({ name: challenge?.name, address: challenge?.designImage });

    if (challenge?.challenge_pages?.length) {
      const pages: PageProps[] = challenge.challenge_pages;
      for (let i = 0; i < pages.length; i++) {
        onAdd({
          name: pages[i].name,
          address: pages[i].design_path,
          mobile: pages[i].mobile_path,
        });
      }
    }

    onOpen("challenge-modal");
  };

  useEffect(() => {
    onClear();
    onAdd({ name: challenge?.name, address: challenge?.designImage });

    if (challenge?.challenge_pages?.length) {
      const pages: PageProps[] = challenge.challenge_pages;
      for (let i = 0; i < pages.length; i++) {
        onAdd({
          name: pages[i].name,
          address: pages[i].design_path,
          mobile: pages[i].mobile_path,
        });
      }
    }
  }, [challengeId]);

  return (
    <div className="w-full md:w-[100%] mx-auto flex pb-5 flex-col md:flex-row items-center gap-2 p-[2px] ring-1 ring-[#c3b3f0] mt-5 rounded-sm">
      <div className="w-full md:w-[55%] flex items-center justify-center p-[5px]">
        <div className="w-full relative h-[300px] sm:h-[400px] md:h-[400px] rounded-sm overflow-hidden ring-1 ring-slate-300">
          <div className=" absolute h-[300px] sm:h-[400px] md:h-[425px] w-full top-0 right-0 z-30 bg-transparent"></div>
          <Image
            fill
            src={challenge?.displayImage}
            alt={challenge?.name}
            className=""
          />
          <ToolTipProvider label="Expand">
            <Button
              aria-label="Expand"
              variant="ghost"
              onClick={handleOpenChallengeModal}
              className=" w-max absolute bottom-1 z-40 cursor-pointer bg-slate-100 right-1 rounded-sm"
            >
              <Expand className="" size={20} />
            </Button>
          </ToolTipProvider>
        </div>
      </div>
      <div className="flex w-full px-2 m:px-0 md:w-[45%] h-full flex-col gap-2 p-[1px]">
        <div className="w-full h-full flex flex-col gap-2 relative">
          <div className="w-full flex items-center justify-between">
            <Button
              variant="custom"
              className={cn(
                "text-xs h-max font-semibold rounded-sm capitalize",
                challenge?.status.toLocaleLowerCase() === "premium"
                  ? " bg-orange-500"
                  : "bg-[#675eec]"
              )}
            >
              {challenge?.status}
            </Button>
            <LikeButton challengeId={challengeId} />
          </div>
          <h2 className="text-sm font-extrabold text-zinc-900 truncate">
            {challenge?.name}
          </h2>
          <div className="w-full text-start text-[14px] font-medium text-zinc-800">
            {challenge?.description}
          </div>
          <div className="w-full text-start text-[14px] font-medium flex flex-col gap-1 text-zinc-800">
            <p>
              Begin by transforming this design into a fully functional project
              using HTML, CSS, and JavaScript, or any framework of your choice.
              Focus on building a solid foundation where the design translates
              seamlessly into a working interface.
            </p>
          </div>
          <div className="w-full mt-2">
            <ButtonColorMap challenge={challenge} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCardHeader;
