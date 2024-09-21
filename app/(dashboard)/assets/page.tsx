"use client";

import AddAssetButton from "@/components/dashboard/add-asset-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/lib/store/modal-store";
import { getAllAssets } from "@/utils/actions/getAllChallenges";
import { useQuery } from "@tanstack/react-query";
import { Download, Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

const AssetsPage = () => {
  const [filter, setFilter] = useState<string>("");
  const { user } = useUser();
  const { toast } = useToast();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["challenges"],
    queryFn: getAllAssets,
  });

  const filteredAssets = useMemo(() => {
    if (filter === "" || filter === "all") return data;
    if (data && filter.length) {
      const filteredChallenges = data.filter((asset) =>
        asset.name.toLowerCase().includes(filter.toLowerCase())
      );
      return filteredChallenges;
    }
  }, [filter, data]);

  const onDownload = async (url: string, name: string) => {
    const a = document.createElement("a");
    const res = await fetch(url);
    const data = await res.blob();

    const blobUrl = URL.createObjectURL(data);

    a.href = blobUrl;
    a.download = name;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast({ description: "Download Successful" });
  };

  return (
    <main className=" px-1 md:px-2 py-1 md:py-3">
      <div className=" w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-4">
          <h2 className="text-xl md:text-3xl font-bold text-neutral-900 md:font-extrabold">
            Assets
          </h2>
          {user?.role === "ADMIN" ? <AddAssetButton /> : null}
        </div>
        <div className=" flex items-center h-8 ring-1 ring-[#d8d4e2] rounded-sm overflow-hidden">
          <Input
            className=" rounded-none w-full h-full focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 font-semibold"
            placeholder="search"
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button
            variant="ghost"
            className=" h-full hidden md:flex rounded-none bg-slate-300 hover:bg-slate-200 transition"
          >
            <Search size={14} />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="w-full py-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="flex flex-col gap-1 p-2 w-full" key={index}>
              <Skeleton className="h-[200px] w-[100%] rounded-sm bg-slate-300" />
              <Skeleton className="h-[30px] w-[100%] rounded-sm bg-slate-300" />
            </div>
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
      ) : data && filteredAssets ? (
        <div
          className="w-full py-2  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4
         mt-5"
        >
          {filteredAssets.map((asset) => (
            <div
              className="w-full flex flex-col gap-1 ring-1 ring-[#dcd6eb] p-[1px] rounded-sm shadow-md"
              key={asset.id}
            >
              <div className="w-full h-[200px] relative hover:scale-[1.01] transition-all cursor-pointer">
                <Image
                  src={asset.url}
                  alt={asset.name}
                  fill
                  className=" object-contain"
                />
              </div>
              <Button
                onClick={() => onDownload(asset.url, asset.name)}
                variant="ghost"
                className=" bg-slate-300 hover:bg-slate-400 rounded-none flex items-center gap-[6px]"
              >
                Download <Download size={14} className=" text-slate-700" />
              </Button>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  );
};

export default AssetsPage;
