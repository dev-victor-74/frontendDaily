"use client";
import { FaCrown } from "react-icons/fa";

const PremiumBadge = () => {
  return (
    <div className=" w-max px-2 py-1 rounded-full flex items-center gap-1 bg-orange-500 text-center">
      <FaCrown size={14} className=" text-slate-100" />{" "}
      <span className=" text-[10px] text-zinc-50 tracking-wide font-medium">
        Premium
      </span>
    </div>
  );
};

export default PremiumBadge;
