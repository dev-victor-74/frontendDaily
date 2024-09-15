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
import {
  _30_DAYS_IN_MILLISECONDS,
  FREE_MAX_API_LIMIT_COUNT,
  PRO_MAX_API_LIMIT_COUNT,
} from "@/lib/constants";

import { modalStore, UseSubscription } from "@/lib/store/modal-store";
import { TriangleAlert } from "lucide-react";
import Image from "next/image";

const ApiLimitModal = () => {
  const { isOpen, onClose, type } = modalStore();
  const { subscription } = UseSubscription();

  const open = isOpen && type === "api-limit-count";

  const handleClose = () => {
    return onClose();
  };

  const isPro =
    (subscription &&
      subscription.status === "active" &&
      new Date(subscription.next_payment_date as string).getTime() >
        Date.now()) ||
    ((subscription?.status === "cancelled" ||
      subscription?.status === "non-renewing") &&
      new Date().getTime() - new Date(subscription.createdAt).getTime() <=
        _30_DAYS_IN_MILLISECONDS);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[425px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[500px] bg-white p-5 rounded-none">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold mt-4"></DialogTitle>
          <DialogDescription className=" flex items-center justify-center">
            <div className=" hidden">
              <TriangleAlert size={30} className=" text-purple-700" />
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className=" w-full rounded-sm overflow-auto flex items-center justify-center flex-col gap-2">
          <div className="w-full flex items-center justify-center">
            <div className=" w-[70px] h-[80px] mx-auto relative">
              <Image src="/apilimit2.svg" alt="alert" fill />
            </div>
          </div>
          <div className=" text-[16px] font-semibold text-zinc-800 text-center">
            You have reached your monthly challenge limit!
          </div>
          {isPro ? (
            <div className=" text-xs font-semibold text-zinc-700 text-center">
              {PRO_MAX_API_LIMIT_COUNT} challenges is the maximum you can access
              for a month.
            </div>
          ) : !isPro ? (
            <div className=" text-xs font-semibold text-zinc-700 text-center">
              {FREE_MAX_API_LIMIT_COUNT} challenges is the maximum you can
              access for a month.
            </div>
          ) : (
            ""
          )}
        </div>
        <DialogFooter className="w-full flex items-center justify-center"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiLimitModal;
