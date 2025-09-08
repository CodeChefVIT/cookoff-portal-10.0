"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { php } from "@codemirror/lang-php";
import { rust } from "@codemirror/lang-rust";
import { StreamLanguage } from "@codemirror/language";
import { c } from "@codemirror/legacy-modes/mode/clike";
import { csharp } from "@codemirror/legacy-modes/mode/clike";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { scheme } from "@codemirror/legacy-modes/mode/scheme";

import LanguageSelector from "./LanguageSelector/LanguageSelector";
import RoundTimer from "./RoundTimer/RoundTimer";

type EditorProps = {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  round?: string;
  timer?: string;
};

export default function Editor({
  languages,
  selectedLanguage,
  onLanguageChange,
  round,
  timer,
}: EditorProps) {
  const languageExtensions: Record<string, any> = {
    cpp: cpp(),
    c: StreamLanguage.define(c),
    "c#": StreamLanguage.define(csharp),
    java: java(),
    python3: python(),
    php: php(),
    rust: rust(),
    racket: StreamLanguage.define(scheme),
    ruby: StreamLanguage.define(ruby),
  };

  const commentSyntax: Record<string, string> = {
    cpp: "//",
    c: "//",
    "c#": "//",
    java: "//",
    python3: "#",
    php: "//",
    rust: "//",
    racket: "#",
    ruby: "#",
  };

  const commentSymbol = commentSyntax[selectedLanguage.toLowerCase()] || "//";
  const placeholder = `${commentSymbol} Write your ${selectedLanguage} solution here`;

  return (
    <div className="w-full mx-auto flex flex-col bg-[#131414] rounded-xl shadow-lg overflow-hidden">
      <div className="flex items-center justify-between px-6 py-3 bg-[#1e1f1f] border-b border-gray-700">
        <RoundTimer round={round} timer={timer} />
        <LanguageSelector
          languages={languages}
          selectedLanguage={selectedLanguage}
          onLanguageChange={onLanguageChange}
        />
      </div>

      <div className="h-[500px]">
        <CodeMirror
          value={placeholder}
          height="100%"
          theme={oneDark}
          extensions={[
            languageExtensions[selectedLanguage.toLowerCase()] ||
              languageExtensions["cpp"],
          ]}
          onChange={(value) => console.log("Code:", value)}
        />
      </div>
    </div>
  );
}
