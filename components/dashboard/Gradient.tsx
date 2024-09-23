"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const Gradient = () => {
  const [colors1, setColors1] = useState([""]);
  const [colors2, setColors2] = useState([""]);
  const [isCopied, setisCopied] = useState(false);

  const arr = new Array(24).fill(1);

  const onGenerateColors = () => {
    const randomHex1 = arr.map((ar) => {
      const c = `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")}`;
      return c;
    });
    setColors1(randomHex1);

    const randomHex2 = arr.map((_) => {
      const c = `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")}`;
      return c;
    });
    setColors2(randomHex2);
  };

  useEffect(() => {
    onGenerateColors();

    return () => onGenerateColors();
  }, []);

  const onCopy = (c1: string, c2: string) => {
    const lgr = `linear-gradient(to right, ${c1}, ${c2})`;
    navigator?.clipboard?.writeText(lgr);
    setisCopied(true);

    setTimeout(() => {
      setisCopied(false);
    }, 500);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-12 rounded-sm shadow-md bg-slate-200 px-1 py-4 mt-2 flex items-center justify-between">
        <Button
          onClick={onGenerateColors}
          variant="custom"
          className="px-4 py-2 rounded-sm text-zinc-200 text-xs font-semibold"
        >
          Refresh
        </Button>
        {isCopied && (
          <div
            className="flex items-center justify-center text-xs font-semibold
            text-zinc-100 bg-green-500 rounded-full px-3 py-2 gap-2 animate-bounce"
          >
            <span>Copied</span>
          </div>
        )}
        <span className="select-none py-1 px-3 rounded-full bg-black text-xs text-white">
          Click on gradient to copy
        </span>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 mt-2">
        {arr?.map((ar, i) => (
          <div
            key={i}
            className="flex flex-col bg-slate-800 rounded-sm px-[1px] py-[1px] group h-[85px] hover:scale-[1.05] cursor-pointer transition duration-200"
          >
            <div
              onClick={() => onCopy(colors1[i], colors2[i])}
              className="w-full h-[100%] bg-yellow-500 active:border-[2px] active:border-green-500"
              style={{
                background: `linear-gradient(to right,${
                  colors1 && colors1[i]
                },${colors2 && colors2[i]})`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gradient;
