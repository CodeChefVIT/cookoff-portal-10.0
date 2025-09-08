"use client";

import React, { useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
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

  const [code, setCode] = useState("");
  const [cursor, setCursor] = useState({ line: 1, ch: 1 });
  const [customInput, setCustomInput] = useState(false);
  const editorRef = useRef<any>(null);

  const handleChange = (value: string, view: any) => {
    setCode(value);
    const pos = view.state.selection.main.head;
    const line = view.state.doc.lineAt(pos).number;
    const ch = pos - view.state.doc.line(line - 1).from + 1;
    setCursor({ line, ch });
  };

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
          ref={editorRef}
          value={code || placeholder}
          height="100%"
          theme={oneDark}
          extensions={[
            languageExtensions[selectedLanguage.toLowerCase()] ||
              languageExtensions["cpp"],
          ]}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center justify-end px-6 py-2 bg-[#181919] text-gray-400 text-sm border-b border-gray-700">
        Line: {cursor.line} &nbsp;|&nbsp; Col: {cursor.ch}
      </div>

      <div className="flex items-center justify-between px-6 py-3 bg-[#181919]">
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle Custom Input"
            onClick={() => setCustomInput((prev) => !prev)}
            className="focus:outline-none !bg-transparent !shadow-none border-0 p-0 m-0"
          >
            {" "}
            <span className="text-gray-300 text-xl flex items-center gap-3">
              {customInput ? (
                <FaToggleOn size={39} color="#22c55e" />
              ) : (
                <FaToggleOff size={39} color="#64748b" />
              )}{" "}
              Custom Input
            </span>
          </button>
        </div>
        <div className="flex gap-4">
          <button className="text-white px-4 py-2 rounded transition">
            Run Code
          </button>
          <button className="btn-green text-white px-4 py-2 rounded transition">
            Submit Code
          </button>
        </div>
      </div>
    </div>
  );
}
