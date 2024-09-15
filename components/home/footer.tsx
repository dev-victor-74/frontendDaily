"use client";

import Image from "next/image";
import Link from "next/link";
import { BsDot } from "react-icons/bs";

const Footer = () => {
  const thisYear = new Date().getFullYear();

  return (
    <footer className="w-full px-2 flex items-center flex-col gap-4 mt-12 pb-5">
      <div className="w-full flex  items-center justify-center border-b-[1px] pb-2">
        <div className=" flex items-center gap-4">
          <Link href={"/terms"} className="text-sm font-semibold text-zinc-800">
            Terms
          </Link>
          <Link
            href={"/policy"}
            className="text-sm font-semibold text-zinc-800"
          >
            Privacy
          </Link>

          <a
            href="mailto:victornnamdi835@gmail.com"
            className="text-sm font-semibold text-zinc-800"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center gap-1">
          <div className="w-[25px] h-[25px] relative ">
            <Image src="/logo.png" fill alt="logo" />
          </div>
          <div className="text-sm font-semibold">FrontendDaily</div>
          <div className="text-sm font-semibold">{thisYear}</div>
          <BsDot size={18} />
          <div className="text-sm font-semibold">All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
