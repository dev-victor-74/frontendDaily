"use client";

import { Button } from "../ui/button";

import Link from "next/link";
import { Plus } from "lucide-react";
import ToolTipProvider from "./ToolTip-Provider";
import { useUser } from "@/lib/store/modal-store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const ChallengeHeading = () => {
  const user = useUser((state) => state.user);

  const params = useSearchParams();
  const filter = params.get("filter");

  const router = useRouter();

  const setFilter = (filter: string) => {
    if (filter) {
      router.push("?filter=" + filter);
      return;
    }

    if (!filter) {
      router.push("/challenge");
      return;
    }
  };

  return (
    <div className="flex items-center justify-between py-1 border-b border-[#e3e0eb] h-[55px]">
      <div className="flex items-center gap-4">
        <h2 className="text-xl md:text-3xl font-bold text-neutral-900 md:font-extrabold">
          Challenges
        </h2>
        {user?.role === "ADMIN" ? (
          <ToolTipProvider label="Add Challenge">
            <Button variant="ghost" className="ring-2 ring-[#542cc2] h-7 w-10">
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
              className="bg-transparent px-3 h-8 w-max overflow-hidden relative rounded-sm ring-1 ring-[#b6a4e7]"
            >
              Filter By
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] bg-slate-50 shadow-md">
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className={cn(
                  "justify-start w-full px-1 rounded-sm h-8",
                  filter === "all"
                    ? "ring-2 ring-[#542cc2] text-[#542cc2]"
                    : "ring-1 ring-[#7a738a]"
                )}
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <div className="w-full text-sm font-bold text-zinc-900 rounded-sm bg-slate-100 py-2">
                Difficulty
              </div>
              <Button
                variant="outline"
                className={cn(
                  "justify-start w-full px-1 ring-1 rounded-sm bg-white shadow-sm  h-8 ",
                  filter === "easy"
                    ? "ring-2 ring-[#542cc2] text-[#542cc2]"
                    : " ring-[#7a738a]"
                )}
                onClick={() => setFilter("easy")}
              >
                Easy
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "justify-start w-full px-1 ring-1 rounded-sm bg-white shadow-sm  h-8",
                  filter === "medium"
                    ? "ring-2 ring-[#542cc2] text-[#542cc2]"
                    : " ring-[#7a738a]"
                )}
                onClick={() => setFilter("medium")}
              >
                Medium
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "justify-start w-full px-1 ring-1 rounded-sm bg-white shadow-sm  h-8",
                  filter === "hard"
                    ? "ring-2 ring-[#542cc2] text-[#542cc2]"
                    : " ring-[#7a738a]"
                )}
                onClick={() => setFilter("hard")}
              >
                Hard
              </Button>
              <div className="w-full text-sm font-bold text-zinc-900 rounded-sm bg-slate-100 py-2">
                Level
              </div>
              <Button
                variant="outline"
                className={cn(
                  "justify-start w-full px-1 ring-1 rounded-sm bg-white shadow-sm  h-8",
                  filter === "beginner"
                    ? "ring-2 ring-[#542cc2] text-[#542cc2]"
                    : " ring-[#7a738a]"
                )}
                onClick={() => setFilter("beginner")}
              >
                Beginner
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "justify-start w-full px-1 ring-1 rounded-sm bg-white shadow-sm  h-8",
                  filter === "intermediate"
                    ? " ring-2 ring-[#542cc2] text-[#542cc2]"
                    : " ring-[#7a738a]"
                )}
                onClick={() => setFilter("intermediate")}
              >
                Intermediate
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "justify-start w-full px-1 ring-1 rounded-sm bg-white shadow-sm  h-8",
                  filter === "advanced"
                    ? " ring-2 ring-[#542cc2] text-[#542cc2]"
                    : " ring-[#7a738a]"
                )}
                onClick={() => setFilter("advanced")}
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
