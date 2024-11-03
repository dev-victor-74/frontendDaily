"use client";

import DownloadButton from "./DownloadButton";

import { FaTasks } from "react-icons/fa";
import { MdOutlineNotificationImportant } from "react-icons/md";

interface TaskProps {
  tasks: string;
  challengeId: string;
  challengeStatus: string;
  name: string;
  status: string;
  createdAt: Date;
  next_payment_date: Date | null;
}
const Task = ({
  tasks,
  challengeId,
  challengeStatus,
  name,
  status,
  createdAt,
  next_payment_date,
}: TaskProps) => {
  if (!tasks) return null;

  return (
    <div className="w-full md:w-[100%] mx-auto gap-2 pb-2 px-3 pt-2 ring-1 ring-[#c3b3f0] mt-5 rounded-sm flex flex-col">
      <div className="flex items-center gap-2 mt-3">
        <FaTasks size={20} />
        <h2 className=" text-sm font-semibold md:text-lg md:font-bold text-zinc-800">
          Tasks to implement
        </h2>
      </div>
      <div className="w-full mt-2 text-[14px] font-medium text-zinc-900">
        {tasks}
      </div>

      <div className="w-full mt-2 md:mt-5 text-[14px] font-medium text-zinc-900 flex flex-col gap-2">
        <MdOutlineNotificationImportant size={25} />
        <p>
          While it&apos;s important to stay true to the core design, don&apos;t
          get too caught up in achieving pixel-perfect accuracy. Instead,
          prioritize creativity and innovation. Show how you can adapt the
          design to create something that is not only functional but also
          engaging and visually appealing.
        </p>
        <p className=" mt-2">
          This challenge is about more than just coding it&apos;s about
          demonstrating your ability to bring a design to life in a way that
          reflects your skills and ingenuity as a developer. Let your work stand
          out by showing how you can take a simple design and turn it into
          something truly exceptional.
        </p>
      </div>
      <div className="w-full flex items-center mt-2 justify-center md:justify-end pb-1">
        <DownloadButton
          tasks={tasks}
          challengeId={challengeId}
          name={name}
          challengeSatus={challengeStatus}
          status={status}
          next_payment_date={next_payment_date}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
};

export default Task;
