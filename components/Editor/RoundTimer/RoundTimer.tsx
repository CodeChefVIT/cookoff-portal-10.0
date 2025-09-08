"use client";

import React from "react";

type RoundTimerProps = {
  round?: string;
  timer?: string;
};

export default function RoundTimer({
  round = "round 0",
  timer = "00:00:00",
}: RoundTimerProps) {
  return (
    <div className="flex items-center h-[45px] border border-[#B7AB98] rounded-lg gap-2 font-bruno-ace w-fit select-none">
      <div className="flex-shrink-0 h-full bg-[#1BA94C] flex items-center justify-center rounded-l-lg px-3">
        <span className="text-[22px] text-black capitalize">{round}</span>
      </div>

      <div className="flex-1 h-full flex items-center justify-center w-fit rounded-r-lg px-3">
        <span className="text-[20px] text-[#1BA94C] tracking-widest text-center">
          {timer}
        </span>
      </div>
    </div>
  );
}
