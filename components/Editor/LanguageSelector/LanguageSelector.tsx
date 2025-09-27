"use client";

import * as React from "react";
import { FaChevronDown } from "react-icons/fa";
import { Language } from "@/lib/languages";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type LanguageSelectorProps = {
  languages: Language[];
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
};

export default function LanguageSelector({
  languages,
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  const mid = Math.ceil(languages.length / 2);
  const leftColumn = languages.slice(0, mid);
  const rightColumn = languages.slice(mid);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full h-10 !bg-white rounded-lg flex items-center justify-between px-4 shadow-md !text-black text-lg transition-colors duration-200 hover:bg-gray-100">
          {selectedLanguage.name}
          <FaChevronDown className="w-4 h-4 ml-2 text-black" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full min-w-[300px] p-4 flex flex-col sm:flex-row sm:gap-4">
        <div className="flex-1 flex flex-col gap-2 sm:border-r sm:border-gray-300 pr-0 sm:pr-4">
          {leftColumn.map((lang) => {
            const isSelected = lang.id === selectedLanguage.id;
            return (
              <DropdownMenuItem
                key={lang.id}
                onClick={() => onLanguageChange(lang)}
                className={`text-[16px] sm:text-[18px] ${
                  isSelected ? "bg-[rgba(27,169,76,0.42)]" : ""
                }`}
              >
                {lang.name}
              </DropdownMenuItem>
            );
          })}
        </div>

        <div className="flex-1 flex flex-col gap-2 mt-2 sm:mt-0">
          {rightColumn.map((lang) => {
            const isSelected = lang.id === selectedLanguage.id;
            return (
              <DropdownMenuItem
                key={lang.id}
                onClick={() => onLanguageChange(lang)}
                className={`text-[16px] sm:text-[18px] ${
                  isSelected ? "bg-[rgba(27,169,76,0.42)]" : ""
                }`}
              >
                {lang.name}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
