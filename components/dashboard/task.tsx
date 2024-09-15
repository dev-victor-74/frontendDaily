"use client";

import { Challenges } from "@/utils/types";
import DownloadButton from "./DownloadButton";

import { Button } from "../ui/button";
import { MdCheck } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";

interface TaskProps {
  challenge: Challenges;
}
const Task = ({ challenge }: TaskProps) => {
  const tasks = challenge?.tasks.split(",");
  const colors = challenge?.colors?.split(",");

  const { toast } = useToast();

  const onColorCopy = (color: string) => {
    try {
      navigator.clipboard && navigator.clipboard.writeText(color);
      toast({
        title: "Copied!",
      });
    } catch (error) {
      toast({
        title: "Failed to copy color",
      });
    }
  };

  return (
    <div className="w-full md:w-[95%] mx-auto gap-2 px-3 p-[5px] pt-2 ring-1 ring-[#c3b3f0] mt-5 rounded-sm flex flex-col">
      <h2 className=" text-sm font-semibold md:text-lg md:font-bold text-zinc-800">
        Tasks to Implement
      </h2>
      <div className="w-full flex flex-col gap-2 p- mt-1">
        {tasks.map((task, index) => (
          <Button
            key={index}
            variant="ghost"
            className="ring-1 font-medium ring-[#d7ccf3] flex items-center gap-2 rounded-[2px] w-full justify-start"
          >
            <MdCheck className="text-[#46279b]" />
            <span className=" truncate">{task}</span>
          </Button>
        ))}
      </div>

      <div className="w-full flex flex-col gap-1 mt-2">
        {/* <h2 className=" text-sm font-semibold md:text-lg md:font-bold text-zinc-800">
          Colors
        </h2>
        <div className="w-full flex items-center gap-2 mt-1">
          {colors?.map((color, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => onColorCopy(color)}
              style={{ backgroundColor: color }}
              className={cn(
                "ring-1 h-[60px] hover:scale-[1.01] font-medium ring-[#d7ccf3] flex items-center gap-2 rounded-[2px] w-[200px]justify-start"
              )}
            >
              {color}
            </Button>
          ))}
        </div> */}
      </div>

      <div className="w-full mt-2 text-[15px] font-medium text-zinc-900 text-justify flex flex-col gap-2 p-2">
        <p>
          While it&apos;s important to stay true to the core design, don&apos;t
          get too caught up in achieving pixel-perfect accuracy. Instead,
          prioritize creativity and innovation. Show how you can adapt the
          design to create something that is not only functional but also
          engaging and visually appealing.
        </p>
        <p>
          This challenge is about more than just coding it&apos;s about
          demonstrating your ability to bring a design to life in a way that
          reflects your skills and ingenuity as a developer. Let your work stand
          out by showing how you can take a simple design and turn it into
          something truly exceptional.
        </p>
      </div>
      <div className="w-full flex items-center justify-center md:justify-end pb-1">
        <DownloadButton
          tasks={challenge.tasks}
          challengeId={challenge.id}
          name={challenge.name}
          challengeSatus={challenge.status}
        />
      </div>
    </div>
  );
};

export default Task;
