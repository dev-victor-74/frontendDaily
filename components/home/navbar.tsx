"use client";

import { modalStore } from "@/lib/store/modal-store";
import { Button } from "../ui/button";
import Image from "next/image";

const Navbar = () => {
  const { onOpen } = modalStore();

  return (
    <nav className="w-full h-[60px] flex items-center justify-between py-3">
      <div className="flex items-center gap-1">
        <div className="w-[27px] h-[27px] relative ">
          <Image src="/logo.png" fill alt="logo" />
        </div>
        <div className="text-sm md:text-lg font-semibold md:font-bold">
          FrontendDaily
        </div>
      </div>

      <div className="flex items-center">
        <Button
          variant="custom"
          className="px-4 text-xs py-2 rounded-sm "
          onClick={() => onOpen("auth-modal")}
        >
          Sign in
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
