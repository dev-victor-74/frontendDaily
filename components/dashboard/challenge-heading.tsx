"use client";

import { Button } from "../ui/button";

import Link from "next/link";
import { Plus } from "lucide-react";
import ToolTipProvider from "./ToolTip-Provider";
import { useUser, UseSubscription } from "@/lib/store/modal-store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const ChallengeHeading = () => {
  const user = useUser((state) => state.user);
  const { subscription } = UseSubscription();

  // console.log(subscription);

  return (
    <div className="flex items-center justify-between py-1 border-b border-[#e3e0eb] h-[55px]">
      <div className="flex items-center gap-4">
        <h2 className="text-xl md:text-3xl font-bold text-neutral-900 md:font-extrabold">
          Challenges
        </h2>
        {user?.role === "ADMIN" ? (
          <ToolTipProvider label="Add Challenge">
            <Button variant="ghost" className="ring-2 ring-[#5d5c5f] h-7 w-10">
              <Link href="/add">
                <Plus className="w-4 h-4" />
              </Link>
            </Button>
          </ToolTipProvider>
        ) : null}
      </div>
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-transparent px-3 h-8 w-max overflow-hidden relative rounded-sm "
            >
              Filter By
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] bg-slate-50">
            <div className="flex flex-col gap-1">
              <Button
                variant="outline"
                className="justify-start w-full px-1 font-semibold"
              >
                Easy
              </Button>
              <Button
                variant="outline"
                className="justify-start w-full px-1 font-semibold"
              >
                Medium
              </Button>
              <Button
                variant="outline"
                className="justify-start w-full px-1 font-semibold"
              >
                Hard
              </Button>
              <Button
                variant="outline"
                className="justify-start w-full px-1 font-semibold"
              >
                Beginner
              </Button>
              <Button
                variant="outline"
                className="justify-start w-full px-1 font-semibold"
              >
                Intermediate
              </Button>
              <Button
                variant="outline"
                className="justify-start w-full px-1 font-semibold"
              >
                Advanced
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ChallengeHeading;
