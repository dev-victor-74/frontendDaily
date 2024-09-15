"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="w-full md:w-[90%] lg:w-[70%] mx-auto flex flex-col gap-3 md:gap-5 mt-8 md:mt-16 items-center justify-center px-2 md:px-8">
      <div className="w-max px-4 py-3 flex items-center gap-3 rounded-full shadow-xl text-sm font-semibold mt-5">
        FrontendDaily is now live!
        <div className="w-[25px] h-[25px] relative ">
          <Image src="/logo.png" fill alt="logo" className="animate-bounce" />
        </div>
      </div>
      <h1 className="text-2xl font-bold md:text-5xl md:font-extrabold text-center text-zinc-900 mt-5">
        The Best Place to <strong className="text-[#542cc2]">Practice</strong> &{" "}
        <strong className="text-[#542cc2]">Build</strong> Frontend{" "}
        <strong className="text-[#542cc2]">Projects</strong>
      </h1>
      <p className="text-sm font-medium text-neutral-900 text-center">
        Improve your coding skills by building challenge based projects
      </p>
      <div className="text-lg font-semibold md:font-bold mt-4 text-center text-zinc-900">
        Join over 2000+ Developers supercharging their coding skill with our
        carefully crafted challenges tailored to make you grow
      </div>
      <div className="flex items-center  rounded-sm justify-center p-[2px] mt-5">
        <Link
          href="/challenges"
          className="px-6 flex items-center text-zinc-200 justify-center gap-2 py-3 bg-[#151120] hover:opacity-75 rounded-sm text-sm font-semibold"
        >
          Get Started <FaArrowRightLong />
        </Link>
      </div>

      {/* <div className="w-full md:w-[80%] lg:w-[70%] opacity-40 mx-auto h-[70vh] rounded-sm ring-1 ring-purple-300 relative bg-blue-400">
        <Image src="/screenshot3.PNG" fill alt="landing page" />
      </div> */}
    </div>
  );
};

export default Hero;
