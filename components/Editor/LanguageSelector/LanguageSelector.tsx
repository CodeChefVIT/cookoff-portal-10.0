"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaChevronDown } from "react-icons/fa";
import { Language } from "@/lib/languages";

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
  const [open, setOpen] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);

  const mid = Math.ceil(languages.length / 2);
  const leftColumn = languages.slice(0, mid);
  const rightColumn = languages.slice(mid);

  const handleToggle = () => {
    if (!open) {
      const button = document.querySelector('#language-selector-button') as HTMLElement;
      if (button) {
        setButtonRect(button.getBoundingClientRect());
      }
    }
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (open && !target.closest('#language-selector-button') && !target.closest('[data-language-dropdown]')) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative w-full max-w-[340px] font-roboto">
      <button
        id="language-selector-button"
        onClick={handleToggle}
        className="w-full h-10 !bg-white rounded-lg flex items-center justify-between px-4 shadow-md !text-black text-lg transition-colors duration-200 hover:bg-gray-100"
      >
        {selectedLanguage.name}
        <FaChevronDown
          className={`w-4 h-4 text-black transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && buttonRect && createPortal(
        <div 
          data-language-dropdown
          className="fixed min-w-[300px] z-[9999] bg-white rounded-xl shadow-lg p-4 flex flex-col sm:flex-row sm:gap-4 flex-wrap sm:flex-nowrap"
          style={{
            top: buttonRect.bottom + 8,
            left: buttonRect.right - 300,
            width: Math.max(300, buttonRect.width)
          }}
        >
          <div className="flex-1 flex flex-col gap-2 sm:border-r sm:border-gray-300 pr-0 sm:pr-4">
            {leftColumn.map((lang) => {
              const isSelected = lang.id === selectedLanguage.id;
              return (
                <div
                  key={lang.id}
                  onClick={() => {
                    onLanguageChange(lang);
                    setOpen(false);
                  }}
                  className={`cursor-pointer px-3 py-2 rounded-md text-[16px] sm:text-[18px] text-black transition-colors duration-150
                    ${
                      isSelected
                        ? "bg-[rgba(27,169,76,0.42)]"
                        : "hover:bg-gray-100"
                    }`}
                >
                  {lang.name}
                </div>
              );
            })}
          </div>

          <div className="flex-1 flex flex-col gap-2 mt-2 sm:mt-0">
            {rightColumn.map((lang) => {
              const isSelected = lang.id === selectedLanguage.id;
              return (
                <div
                  key={lang.id}
                  onClick={() => {
                    onLanguageChange(lang);
                    setOpen(false);
                  }}
                  className={`cursor-pointer px-3 py-2 rounded-md text-[16px] sm:text-[18px] text-black transition-colors duration-150
                    ${
                      isSelected
                        ? "bg-[rgba(27,169,76,0.42)]"
                        : "hover:bg-gray-100"
                    }`}
                >
                  {lang.name}
                </div>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
