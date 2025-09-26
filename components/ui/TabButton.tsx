"use client";

import React from "react";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });

interface TabButtonProps {
  id: string;
  active: boolean;
  onClick: () => void;
  newId: number;
}

const TabButton: React.FC<TabButtonProps> = ({
  id,
  active,
  onClick,
  newId,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-[100px] h-[35px] flex items-center justify-center p-0 group
        transition-transform duration-200 ease-out
        bg-transparent hover:bg-transparent active:bg-transparent
        border-none shadow-none outline-none
        ${active ? "scale-110 z-10" : ""}
      `}
      style={{ background: "none" }}
    >
      <div
        className={`
          absolute inset-0 w-full h-full
          transform transition duration-200 ease-out
          ${active ? "scale-110" : "group-hover:scale-105"}
        `}
        style={{
          backgroundColor: active ? "#B7AB98" : "#B7AB9880",
          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          borderRadius: "8px",
          border: active ? "2px solid #B7AB98" : "1px solid transparent",
        }}
      />
      <span
        className={`relative z-10 font-bold text-xl ${quicksand.className}`}
        style={{ color: "#000000ff", userSelect: "none" }}
      >
        {newId + 1}
      </span>
    </button>
  );
};

export default TabButton;
