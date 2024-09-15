"use client";

import Image from "next/image";

const ChallengeContent = ({ data }: any) => {
  return (
    <div className="w-full md:w-[95%] mx-auto h-full mb-4 rounded-sm flex flex-col items-center p-[2px] ring-1 ring-[#c3b3f0] mt-5">
      <div className="w-full px-3">
        <h2 className=" text-sm font-semibold md:text-lg md:font-bold text-zinc-800 mt-1">
          {}
        </h2>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 px-2 pb-3">
        {data?.map((page: any) => (
          <div
            key={page?.id}
            className="w-full cursor-pointer p-[1px] rounded-sm ring-1 ring-[#beb2df] flex flex-col gap-2 hover:scale-[1.01] transition"
          >
            <div className="w-full h-[250px] relative rounded-sm overflow-hidden">
              <Image fill src={page?.display_path} alt={page.name} />
            </div>
            <div className="text-sm font-semibold text-zinc-800 px-2 truncate">
              {page?.name}
            </div>
          </div>
        ))}
      </div>
      <div className=""></div>
    </div>
  );
};

export default ChallengeContent;
