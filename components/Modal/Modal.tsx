"use client";

import React from "react";
import { ImCross } from "react-icons/im";

type ModalProps = {
  title: string;
  message: string;
  variant?: "red" | "green" | "yellow" | "default";
  onClose: () => void;
  children?: React.ReactNode;
};

const variantColors = {
  red: { border: "border-red-600", text: "text-red-600" },
  green: { border: "border-green-600", text: "text-green-600" },
  yellow: { border: "border-yellow-500", text: "text-yellow-500" },
  default: { border: "border-gray-500", text: "text-white" },
};

export default function Modal({
  title,
  message,
  variant = "default",
  onClose,
  children,
}: ModalProps) {
  const colors = variantColors[variant];

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm pointer-events-none"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className={`bg-[#131414] rounded-lg border ${colors.border} w-full max-w-lg`}
        >
          <div
            className={`bg-black border-b ${colors.border} rounded-t-lg flex justify-between items-center px-4 py-3`}
          >
            <h2 className={`font-nulshock font-bold text-2xl ${colors.text}`}>
              {title}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded flex items-center justify-center brightness-90 hover:brightness-100 transition hover:cursor-pointer"
            >
              <ImCross className="w-6 h-6" />
            </button>
          </div>
          <div className="px-6 py-4 text-white font-inter text-base leading-7">
            {message}
            {children && <div className="mt-4">{children}</div>}
          </div>
        </div>
      </div>
    </>
  );
}
