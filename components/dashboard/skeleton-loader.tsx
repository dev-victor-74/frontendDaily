"use client";

import { Skeleton } from "../ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col gap-2 p-2 w-full">
      <Skeleton className="h-[200px] w-[100%] rounded-xl bg-slate-200" />
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-6 w-[70%] bg-slate-200" />
          <Skeleton className="h-10 w-[20%] bg-slate-200" />
        </div>
        <div className="flex justify-between items-center gap-6">
          <div className="flex items-center gap-1 w-[40%]">
            <Skeleton className="h-8 w-full bg-slate-200" />
            <Skeleton className="h-8 w-full bg-slate-200" />
          </div>
          <div className="flex items-center gap-1 w-[50%]">
            <Skeleton className="h-8 w-full bg-slate-200" />
            <Skeleton className="h-8 w-full bg-slate-200" />
            <Skeleton className="h-8 w-full bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
