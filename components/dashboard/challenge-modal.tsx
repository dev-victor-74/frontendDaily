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
import { ChallengeDataStore, modalStore } from "@/lib/store/modal-store";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ChallengeModal() {
  const { isOpen, onClose, type } = modalStore();
  const [slideIndex, setSlideIndex] = useState(0);

  const open = isOpen && type === "challenge-modal";
  const { challengeData } = ChallengeDataStore();

  const prev = () => {
    const isfirstSlide = slideIndex === 0;
    const newSlide = isfirstSlide ? challengeData.length - 1 : slideIndex - 1;
    setSlideIndex(newSlide);
  };

  const next = () => {
    const isLastSlide = slideIndex === challengeData.length - 1;
    const newSlide = isLastSlide ? 0 : slideIndex + 1;
    setSlideIndex(newSlide);
  };

  const handleClose = () => {
    return onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[425px] sm:max-w-[600px] md:max-w-[750px] lg:max-w-[950px] bg-white h-[85vh] rounded-none">
        <DialogHeader className=" h-8">
          <DialogTitle className="text-center font-bold mt-4 p-0">
            {challengeData[slideIndex]?.name}
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <div className=" w-full rounded-sm z-10 overflow-hidden flex items-center justify-center relative">
          {challengeData.length > 1 ? (
            <Button
              variant="ghost"
              onClick={prev}
              className=" fixed z-30 bg-white shadow-md top-1/2 ring-1 ring-[#a199c9] left-[1px] rounded-full"
            >
              <IoIosArrowRoundBack size={28} />
            </Button>
          ) : null}
          <div className="w-[850px] mx-auto relative h-[300px] md:h-[450px] overflow-auto rounded-sm ring-1 pt-12 ring-slate-50">
            <Image
              height={700}
              width={800}
              src={challengeData[slideIndex]?.address}
              alt={challengeData[slideIndex]?.name}
              className=" object-contain mx-auto ring-1 ring-[#d6d3e0]"
            />
            <div className="top-0 right-0 bottom-0 h-full w-full bg-transparent z-20 sticky" />
          </div>
          {challengeData.length > 1 ? (
            <Button
              variant="ghost"
              onClick={next}
              className=" fixed z-30 bg-white top-1/2 ring-1 shadow-md ring-[#a199c9] right-[1px] rounded-full"
            >
              <IoIosArrowRoundForward size={28} />
            </Button>
          ) : null}
        </div>
        <DialogFooter className="w-full flex items-center justify-center">
          {challengeData.length > 1 ? (
            <div className="w-full h-3 flex items-center justify-center gap-2">
              {challengeData.map((data, index) => (
                <div
                  role="button"
                  key={index}
                  onClick={() => setSlideIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full",
                    slideIndex === index ? " bg-[#160a35]" : "bg-slate-600"
                  )}
                />
              ))}
            </div>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
