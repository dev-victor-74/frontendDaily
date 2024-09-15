"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PRO_MAX_API_LIMIT_COUNT } from "@/lib/constants";

import { modalStore } from "@/lib/store/modal-store";
import Image from "next/image";
import UpgradeBtn from "../home/upgrade-btn";
import { CircleCheck } from "lucide-react";

const ProModal = () => {
  const { isOpen, onClose, type } = modalStore();

  const open = isOpen && type === "pro-modal";

  const handleClose = () => {
    return onClose();
  };

  const premiumList = [
    {
      label: "Access to premium challenges",
    },
    {
      label: "Practice up to 7 challenges in a month",
    },
    {
      label: "Premium badge",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[425px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[500px] bg-white p-3 rounded-none">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold"></DialogTitle>
          <DialogDescription className=" flex items-center justify-center flex-col">
            <div className=" w-[100px] h-[100px] relative mx-auto">
              <Image src="/upgrade.svg" alt="upgrade" fill />
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className=" text-[15px] font-semibold text-zinc-800 text-center">
                Upgrade to{" "}
                <span className="text-[12px] px-2 py-[2px] rounded-sm bg-orange-200 text-neutral-800">
                  Premium
                </span>{" "}
              </div>
              <div className=" text-sm font-medium text-neutral-900 text-center">
                Get access to {PRO_MAX_API_LIMIT_COUNT} {""}
                <span
                  className="
             bg-orange-200 rounded-sm text-[10px] text-neutral-800 px-2 py-[2px]
            "
                >
                  Premium
                </span>{" "}
                {""}
                challenges every month
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className=" w-full rounded-sm flex items-center justify-center flex-col gap-2 px-2">
          <div className="w-full flex  flex-col gap-2">
            {premiumList.map((list, index) => (
              <div className="flex items-center gap-2" key={index}>
                <CircleCheck size={18} className=" text-green-600" />
                <span className="text-[12px] md:text-sm font-medium text-neutral-600">
                  {list.label}
                </span>
              </div>
            ))}
            <div className="w-full flex flex-col gap-1 mt-3">
              <div className="ring-1 ring-[#703cff] bg-slate-100 rounded-sm flex px-2 py-3 justify-between">
                <div className=" text-sm font-semibold">Monthly</div>
                <div className=" flex items-center gap-2">
                  <span className="text-[13px] font-medium text-neutral-600 line-through">
                    NGN3500
                  </span>
                  <span className="text-sm font-medium text-neutral-900">
                    NGN1500
                  </span>
                </div>
              </div>
              <div className="ring-1 ring-[#d6d0e6] bg-blue-50 rounded-sm mt-2 p-2 text-[12px] font-semibold">
                <span className="text-[14px] font-medium text-neutral-900">
                  NGN1500
                </span>{" "}
                is equivalent to{" "}
                <span className="text-[14px] mr-[2px] font-medium text-neutral-900">
                  $1
                </span>
                {"  "}
                you can check it&apos;s equivalent in your local currency.
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="w-full flex items-center justify-center">
          <UpgradeBtn />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
