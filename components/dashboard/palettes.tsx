"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const Palettes = () => {
  const [colors, setColors] = useState([""]);
  const [isCopied, setisCopied] = useState(false);

  const arr = new Array(24).fill(1);

  const onGeneratePalettes = () => {
    const randomHex = arr.map((ar) => {
      const c = `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")}`;
      return c;
    });
    setColors(randomHex);
  };

  useEffect(() => {
    onGeneratePalettes();

    return () => onGeneratePalettes();
  }, []);

  const onCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setisCopied(true);

    setTimeout(() => {
      setisCopied(false);
    }, 500);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-12 px-1 bg-slate-200 py-3 rounded-sm shadow-md mt-2 flex items-center justify-between">
        <Button
          onClick={onGeneratePalettes}
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
          Click on color to copy
        </span>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 mt-2">
        {colors.map((color, i) => (
          <div
            key={i}
            className="flex flex-col bg-slate-800 rounded-sm px-[1px] py-[1px] group h-[85px] hover:scale-[1.05] cursor-pointer transition duration-200"
          >
            <div
              onClick={() => onCopy(color)}
              className="w-full h-[100%] bg-yellow-500 active:border-[2px] active:border-green-500"
              style={{ background: color }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Palettes;
