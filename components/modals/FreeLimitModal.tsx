"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { modalStore } from "@/lib/store/modal-store";
import { Zap } from "lucide-react";
import Image from "next/image";

const FreeLimitModal = () => {
  const { isOpen, onClose, type, onOpen } = modalStore();

  const open = isOpen && type === "free-limit-modal";

  const handleClose = () => {
    return onClose();
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[425px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[500px] bg-white p-5 rounded-none">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold mt-4"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <div className=" w-full flex items-center justify-center flex-col gap-2">
          <div className=" w-[90px] h-[90px] relative mx-auto">
            <Image src="/apilimit.svg" alt="upgrade" fill />
          </div>
          <div className=" text-[15px] font-semibold text-zinc-800 text-center">
            This is a{" "}
            <span className="text-[12px] px-2 py-[2px] rounded-sm bg-orange-200 text-neutral-800">
              Premium
            </span>{" "}
            challenge!
          </div>
          <div className=" text-sm font-medium text-neutral-900 text-center">
            To access this challenge upgrade to{" "}
            <span
              className="
             bg-orange-200 rounded-sm text-[10px] text-neutral-800 px-2 py-[2px]
            "
            >
              Premium
            </span>
          </div>
        </div>
        <DialogFooter className="w-full flex items-center justify-center">
          <Button
            onClick={() => onOpen("pro-modal")}
            className="text-xs font-semibold text-neutral-200 flex items-center gap-1 bg-gradient-to-r from-orange-700 to-blue-700 px-2 py-2 rounded-sm "
          >
            <Zap size={12} className=" animate-bounce text-zinc-200" />
            Go Premium
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FreeLimitModal;
