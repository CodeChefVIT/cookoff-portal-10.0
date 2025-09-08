"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type LanguageSelectorProps = {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
};

export default function LanguageSelector({
  languages,
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);

  const mid = Math.ceil(languages.length / 2);
  const leftColumn = languages.slice(0, mid);
  const rightColumn = languages.slice(mid);

  return (
    <div className="relative w-full max-w-[340px] select-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-10 bg-white rounded-lg flex items-center justify-between px-4 shadow font-['Roboto'] text-black text-lg"
      >
        {selectedLanguage}
        <FaChevronDown className="w-4 h-4 text-black" />
      </button>

      {open && (
        <div className="absolute mt-2 w-full max-w-[340px] bg-white rounded-xl shadow-lg z-50 p-4 flex flex-col sm:flex-row sm:gap-4">
          <div className="flex-1 flex flex-col gap-2 sm:relative sm:border-r sm:border-black pr-0 sm:pr-4">
            {leftColumn.map((lang) => {
              const isSelected =
                lang.toLowerCase() === selectedLanguage.toLowerCase();
              return (
                <div
                  key={lang}
                  onClick={() => {
                    onLanguageChange(lang);
                    setOpen(false);
                  }}
                  className={`cursor-pointer px-3 py-1 rounded-md font-['Roboto'] text-[18px] sm:text-[20px] text-black
                    ${
                      isSelected
                        ? "bg-[rgba(27,169,76,0.42)]"
                        : "hover:bg-gray-100"
                    }`}
                >
                  {lang}
                </div>
              );
            })}
          </div>

          <div className="flex-1 flex flex-col gap-2 mt-2 sm:mt-0">
            {rightColumn.map((lang) => {
              const isSelected =
                lang.toLowerCase() === selectedLanguage.toLowerCase();
              return (
                <div
                  key={lang}
                  onClick={() => {
                    onLanguageChange(lang);
                    setOpen(false);
                  }}
                  className={`cursor-pointer px-3 py-1 rounded-md font-['Roboto'] text-[18px] sm:text-[20px] text-black
                    ${
                      isSelected
                        ? "bg-[rgba(27,169,76,0.42)]"
                        : "hover:bg-gray-100"
                    }`}
                >
                  {lang}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
