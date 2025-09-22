"use client";

import React, { useRef, useState, useEffect } from "react";
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
import { LanguageSupport } from "@codemirror/language";
import type { EditorView } from "@codemirror/view";
import type { ViewUpdate } from "@codemirror/view";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import RoundTimer from "./RoundTimer/RoundTimer";
import Button from "../ui/Button";
import api from "@/services";

import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
type EditorProps = {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  round?: string;
  questionId?: number;
  setfullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  fullScreen: boolean;
};

export default function Editor({
  languages,
  selectedLanguage,
  onLanguageChange,
  round,
  questionId,
  fullScreen,
  setfullScreen,
}: EditorProps) {
  const languageExtensions: Record<string, LanguageSupport> = {
    cpp: cpp(),
    c: new LanguageSupport(StreamLanguage.define(c)),
    "c#": new LanguageSupport(StreamLanguage.define(csharp)),
    java: java(),
    python3: python(),
    php: php(),
    rust: rust(),
    racket: new LanguageSupport(StreamLanguage.define(scheme)),
    ruby: new LanguageSupport(StreamLanguage.define(ruby)),
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
  const editorRef = useRef<EditorView | null>(null);

  const handleChange = (value: string, viewUpdate: ViewUpdate) => {
    setCode(value);
    const view = viewUpdate.view;
    const pos = view.state.selection.main.head;
    const line = view.state.doc.lineAt(pos).number;
    const ch = pos - view.state.doc.line(line - 1).from + 1;
    setCursor({ line, ch });
  };

  useEffect(() => {
    const fetchSavedCode = async () => {
      if (!questionId) return;

      try {
        const res = await api.get(`/save-code?questionId=${questionId}`);

        if (res.status === 200) {
          const data = await res.data;
          if (data?.code) {
            setCode(data.code);
          } else {
            setCode("");
          }
        } else {
          setCode("");
        }
      } catch (err) {
        console.error("Error fetching saved code:", err);
        setCode("");
      }
    };

    fetchSavedCode();
  }, [questionId]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (code.trim() === "") return;
      const payload = {
        questionId,
        code,
        language: selectedLanguage,
        round,
      };

      try {
        await api.post("/save-code", payload);
      } catch (err) {
        console.error("Error auto-saving code:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [code, selectedLanguage, round, questionId]);

  return (
    <div
      className={`${
        fullScreen
          ? "max-h-[95vh] w-screen -top-0 left-0 fixed z-50 overflow-y-scroll "
          : "h-full   w-[50vw ]"
      }mx-auto flex flex-col bg-[#131414]  shadow-lg overflow-hidden`}
    >
      <div className="flex items-center justify-between px-6 py-3 z-20 bg-[#1e1f1f] border-b border-gray-700">
        <RoundTimer round={round} />
        <div className="flex gap-10 items-center ">
          <LanguageSelector
            languages={languages}
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
          />
          {fullScreen ? (
            <MdFullscreenExit
              className="scale-200"
              onClick={() => setfullScreen((prev) => !prev)}
            />
          ) : (
            <MdFullscreen
              className="scale-200 "
              onClick={() => setfullScreen((prev) => !prev)}
            />
          )}
        </div>
      </div>

      <div className={`${fullScreen ? "h-[90vh]" : "min-h-[50vh]"}`}>
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
          <Button
            variant="run"
            size="default"
            onClick={() => console.log("Run code:", code)}
          >
            Run Code
          </Button>
          <Button
            variant="green"
            size="default"
            onClick={async () => {
              const payload = {
                questionId,
                code,
                language: selectedLanguage,
                round,
              };
              await api.post("/api/save-code", {
                ...payload,
              });
              console.log("Manually submitted code:", payload);
            }}
          >
            Submit Code
          </Button>
        </div>
      </div>
    </div>
  );
}
