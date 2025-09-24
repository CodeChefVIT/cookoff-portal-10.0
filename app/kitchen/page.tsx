"use client";

import Editor from "@/components/Editor/Editor";
import React, { useState, useMemo, useEffect } from "react";
import QuestionWindow from "@/components/ui/QuestionWindow";
import TestCases from "@/components/TestCases/TestCases";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useKitchenStore from "store/zustant";
import { LANGUAGES } from "@/lib/languages";

export default function UIPage() {
  const {
    selectedQuestionId,
    fullScreenEditor,
    fullScreenTestCases,
    fullScreenQuestion,
    setFullScreenEditor,
    setFullScreenTestCases,
    testCases,
  } = useKitchenStore();

  const [testCasesPanelSize, setTestCasesPanelSize] = useState(20);

  const selectedTestcases = useMemo(
    () =>
      testCases.filter((tc) => tc && tc.question_id === selectedQuestionId),
    [testCases, selectedQuestionId]
  );

  const defaultCompilerDetails = {
    isCompileSuccess: false,
    message: "Compilation Successful !!",
  };

  const languages = Object.values(LANGUAGES);

  const handleSetFullScreenEditor: React.Dispatch<
    React.SetStateAction<boolean>
  > = (fullScreen) =>
    setFullScreenEditor(
      typeof fullScreen === "function"
        ? fullScreen(fullScreenEditor)
        : fullScreen
    );
  const handleSetFullScreenTestCases: React.Dispatch<
    React.SetStateAction<boolean>
  > = (fullScreen) =>
    setFullScreenTestCases(
      typeof fullScreen === "function"
        ? fullScreen(fullScreenTestCases)
        : fullScreen
    );

  if (fullScreenQuestion) {
    return <QuestionWindow />;
  }

  if (fullScreenEditor) {
    return (
      <Editor
        languages={languages}
        round="round 0"
        setfullScreen={handleSetFullScreenEditor}
        fullScreen={fullScreenEditor}
      />
    );
  }

  if (fullScreenTestCases) {
    return (
      <TestCases
        results={selectedTestcases}
        compilerDetails={defaultCompilerDetails}
        panelSize={100}
      />
    );
  }

  return (
    <div className="relative bg-[#070E0A] max-h-screen text-gray-200 overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="">
        <ResizablePanel defaultSize={50}>
          <div className="grid grid-cols-1 gap-6 lg:gap-10">
            <div className="-mt-2 py-4 pr-2 min-h-[90vh] -translate-y-5 [&::-webkit-scrollbar]:w-0">
              <QuestionWindow />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup
            direction="vertical"
            className="translate-y-12"
            defaultValue={80}
          >
            <ResizablePanel defaultSize={75} className="pb-4 pl-4">
              <div className="h-full flex flex-col gap-2 mt-0">
                <Editor
                  languages={languages}
                  round="round 0"
                  setfullScreen={handleSetFullScreenEditor}
                  fullScreen={fullScreenEditor}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel
              defaultSize={20}
              className="pt-4 pl-4"
              onResize={(size) => setTestCasesPanelSize(size)}
            >
              <div className="bg-[#131414]">
                <TestCases
                  results={selectedTestcases}
                  compilerDetails={defaultCompilerDetails}
                  panelSize={testCasesPanelSize}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
