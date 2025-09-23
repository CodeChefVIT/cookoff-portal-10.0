"use client";

import React, { useRef, useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { oneDark } from "@codemirror/theme-one-dark";
import type { EditorView } from "@codemirror/view";
import type { ViewUpdate } from "@codemirror/view";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import RoundTimer from "./RoundTimer/RoundTimer";
import Button from "../ui/Button";
import useEditorState, { editorState } from "store/zustant";
import { Language } from "@/lib/languages";
import axios from "axios";
import { getUserFromToken } from "@/lib/auth";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
type EditorProps = {
  languages: Language[];
  round?: string;
  setfullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  fullScreen: boolean;
};

export default function Editor({
  languages,
  round,
  fullScreen,
  setfullScreen,
}: EditorProps) {
  const {
    selectedLanguage,
    setSelectedLanguage,
    selectedQuestionId,
    editorsState,
    setEditorsState,
  } = useEditorState();

  const placeholder = `${selectedLanguage.commentSymbol} Write your ${selectedLanguage.name} solution here`;

  const [code, setCode] = useState("");
  const [cursor, setCursor] = useState({ line: 1, ch: 1 });
  const [customInput, setCustomInput] = useState(false);
  const editorRef = useRef<EditorView | null>(null);

  const handleChange = (value: string, viewUpdate: ViewUpdate) => {
    setCode(value);

    if (selectedQuestionId) {
      const newEditorState: editorState = {
        questionId: selectedQuestionId,
        code: value,
      };

      const existingStateIndex = editorsState.findIndex(
        (state) => state.questionId === selectedQuestionId
      );

      if (existingStateIndex >= 0) {
        const updatedStates = [...editorsState];
        updatedStates[existingStateIndex] = newEditorState;
        setEditorsState(updatedStates);
      } else {
        setEditorsState([...editorsState, newEditorState]);
      }
    }

    const view = viewUpdate.view;
    const pos = view.state.selection.main.head;
    const line = view.state.doc.lineAt(pos).number;
    const ch = pos - view.state.doc.line(line - 1).from + 1;
    setCursor({ line, ch });
  };

  useEffect(() => {
    const fetchSavedCode = async () => {
      if (!selectedQuestionId) return;

      const cachedState = editorsState.find(
        (state) => state.questionId === selectedQuestionId
      );
      if (cachedState) {
        setCode(cachedState.code);
        return;
      } else {
        setCode(placeholder);
      }

      try {
        const userInfo = getUserFromToken();
        if (!userInfo) {
          console.log("User not authenticated - skipping code fetch");
          return;
        }

        const res = await axios.get(
          `/api/save-code?questionId=${selectedQuestionId}&userId=${userInfo.userId}&secretKey=${userInfo.secretKey}`
        );

        if (res.status === 200) {
          const data = await res.data;
          if (data?.code) {
            setCode(data.code);
            setEditorsState([
              ...editorsState,
              { questionId: selectedQuestionId, code: data.code },
            ]);
          } else {
            setCode("");
          }
        } else {
          setCode("");
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          console.log("User not authenticated - skipping code fetch");
          setCode("");
        } else {
          console.error("Error fetching saved code:", err);
        }
      }
    };

    fetchSavedCode();
  }, [selectedQuestionId, editorsState, setEditorsState]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (code.trim() === "") return;

      const userInfo = getUserFromToken();
      if (!userInfo) {
        console.log("User not authenticated - skipping auto-save");
        return;
      }

      const payload = {
        secretKey: userInfo.secretKey,
        userId: userInfo.userId,
        questionId: selectedQuestionId,
        code,
        language: selectedLanguage.name,
        round,
      };

      try {
        await axios.post("/api/save-code", payload);
      } catch (err: any) {
        if (err.response?.status === 401) {
          console.log("User not authenticated - skipping auto-save");
        } else {
          console.error("Error auto-saving code:", err);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [code, selectedLanguage, round, selectedQuestionId]);

  return (
    <div
      className={`${
        fullScreen
          ? "h-[95vh] w-screen -top-0 left-0 fixed z-50 "
          : "h-full w-[50vw]"
      }mx-auto flex flex-col bg-[#131414] shadow-lg overflow-hidden`}
    >
      <div className="flex items-center justify-between px-6 py-3 z-20 bg-[#1e1f1f] border-b border-gray-700">
        <RoundTimer round={round} />
        <div className="flex gap-10 items-center ">
          <LanguageSelector
            languages={languages}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
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

      <div className={`flex-1 overflow-hidden ${fullScreen ? "h-[95vh]" : "min-h-[200px]"}`}>
        <CodeMirror
          ref={editorRef}
          value={code || placeholder}
          height="100%"
          theme={oneDark}
          extensions={[selectedLanguage.extension]}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center justify-end px-6 py-2 bg-[#181919] text-gray-400 text-sm border-b border-gray-700">
        Line: {cursor.line} &nbsp;|&nbsp; Col: {cursor.ch}
      </div>

      <div className="flex items-center justify-between px-6 py-3 bg-[#181919] z-100">
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
              const userInfo = getUserFromToken();
              if (!userInfo) {
                console.log("User not authenticated - cannot submit code");
                return;
              }

              const payload = {
                secretKey: userInfo.secretKey,
                userId: userInfo.userId,
                questionId: selectedQuestionId,
                code,
                language: selectedLanguage.name,
                languageId: selectedLanguage.id,
                round,
              };
              await axios.post("/api/save-code", payload);
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
