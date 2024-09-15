import Gradient from "@/components/dashboard/Gradient";
import Palettes from "@/components/dashboard/palettes";
import React from "react";

const ColorPage = () => {
  return (
    <main className="w-full px-2 md:px-4 pb-5">
      <div className="w-full flex-col gap-2">
        <h2 className="text-xl text-center md:text-3xl font-bold text-neutral-900 md:font-extrabold">
          Hex Color Palettes
        </h2>
        <Palettes />
      </div>
      <div className="w-full flex-col gap-2 mt-5 md:mt-10">
        <h2 className="text-xl text-center md:text-3xl font-bold text-neutral-900 md:font-extrabold">
          Gradient
        </h2>
        <Gradient />
      </div>
    </main>
  );
};

export default ColorPage;
